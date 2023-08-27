const httpStatus = require('http-status');
const { Op } = require("sequelize");
const { DateTime, Duration } = require("luxon");
const { User, Salon, Role, Employee, UserRole, EmployeeRoleRelation } = require('../../../models');
const authService = require('../../../services/authService')
const UserStatusValues = require("../../../models/values/UserStatus")
const RoleValues = require("../../../models/values/Role")
const uuidService = require("../../../services/uuidService")

/**
 * Employee register user
 * @param {*} req 
 * @param {*} res 
 */

 const employeeRegister = async (req, res) => {
    const data = req.body
    const employeeRole = req.employeeRole

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
        gender: data.gender,
        phone: data.phone || null,
        mobile: data.mobilePhone || null,
        statusId: UserStatusValues['ACTIVE'].id
    });

    //send response
    let message = ''
    let statusCode = null
    await user.save()
    .then(async(res) => {
        //create role
        const role = await Role.findOne({where: {
            name: {
                [Op.iLike]: RoleValues['EMPLOYEE'].name
            }
        }});

        //create user role
        const userRole = UserRole.build({
            userId: user.id,
            roleId: role.id
        });

        await userRole.save()

        const salon = req.salon

        //create employee entry
        const employee = Employee.build({
            userId: user.id,
            salonId: salon.id,
            ...(data.calendarColor && {calendarColor: data.calendarColor})
        })

        await employee.save()

        await EmployeeRoleRelation.create({
            employeeId: employee.id,
            roleId: employeeRole.id
        })

        statusCode = httpStatus.CREATED
        message = "Employee user is created successfully"
    })
    .catch(e => {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = e?.errors?.[0]?.message ? e.errors[0].message : "Employee user is not created"
    });

    res.status(statusCode).json({ ...{statusCode, message} });
};

module.exports = {
  employeeRegister
};