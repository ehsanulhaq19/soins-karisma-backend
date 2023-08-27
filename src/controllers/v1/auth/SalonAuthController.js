const httpStatus = require('http-status');
const { Op } = require("sequelize");
const { DateTime, Duration } = require("luxon");
const { User, Salon, Role, UserRole } = require('../../../models');
const authService = require('../../../services/authService')
const uuidService = require('../../../services/uuidService')
const UserStatusValues = require("../../../models/values/UserStatus")
const RoleValues = require("../../../models/values/Role")
const userUtiltiy = require("../../../utils/user")
const addressRepository = require("../../../repository/addressRepository")
const SalonStatusValues = require("../../../models/values/SalonStatus")
const SalonTypeValues = require("../../../models/values/SalonType")

/**
 * Salon register user
 * @param {*} req 
 * @param {*} res 
 */

 const salonRegister = async (req, res) => {
    const data = req.body

    //create new user password
    let hashPassword = null
    await authService.cryptPassword(data.email)
    .then(hashResponse => {
        hashPassword = hashResponse
    })

    const timestamp = parseInt((DateTime.now()).toSeconds())
    const userName = `${data.firstName}_${timestamp}`
    //create user
    const user = User.build({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        userName,
        phone: data.phone || null,
        mobile: data.mobilePhone || null,
        statusId: UserStatusValues.ACTIVE.id
    });

    //send response
    let message = ''
    let statusCode = null
    await user.save()
    .then(async(res) => {
        //create role
        const role = await Role.findOne({where: {
            name: {
                [Op.iLike]: RoleValues['SALON'].name
            }
        }});
        
        //create user role
        const userRole = UserRole.build({
            userId: user.id,
            roleId: role.id
        });

        await userRole.save()

        const subdomain = `${data.email.split('@')[0]}${Math.floor(Math.random() * 100) + 1}`;
        const salon = Salon.build({
            email: data.email,
            name: data.name || null,
            lastName: data.lastName || null,
            phone: data.phone || null,
            mobilePhone: data.mobilePhone || null,
            otherEmail: data.otherEmail || null,
            noOfSalons: data.noOfSalons || null,
            describeSalon: data.describeSalon || null,
            noOfChairs: data.noOfChairs || null,
            noOfEmployees: data.noOfEmployees || null,
            servicesProvide: data.servicesProvide || null,
            location: data.location || null,
            approxMonthlyRevenue: data.approxMonthlyRevenue || null,
            subdomain: subdomain,
            fromTime: data.fromTime,
            toTime: data.toTime,
            fromDay: data.fromDay,
            toDay: data.toDay,
            statusId: SalonStatusValues.ACTIVE.id,
            typeId: SalonTypeValues.DEFAULT.id
        })

        await salon.save()

        let address = null;
        //create salon address if provided
        if (data.address) {
            address = await addressRepository.addOrUpdateAddress(data.address)
            salon.update({
                addressId: address?.id
            })
        }

        //change password to uuid
        let uuidPassword = userUtiltiy.getPasswordFromUuid(user.uuid)
        if (uuidPassword) {
            await authService.cryptPassword(uuidPassword)
                .then(async(hashResponse) => {
                    await user.update({ 
                        password: hashResponse
                    })
                })
        }

        statusCode = httpStatus.CREATED
        message = "Salon user is created successfully"
    })
    .catch(e => {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = e?.errors?.[0]?.message ? e.errors[0].message : "Salon user is not created"
    });

    res.status(statusCode).json({ 
        statusCode, 
        message,
        ...(user && user.uuid && {userUuid: uuidService.encodeUuid(user.uuid)})
     });
};

module.exports = {
  salonRegister
};