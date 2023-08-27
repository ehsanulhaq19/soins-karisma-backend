const httpStatus = require('http-status');
const { User, Role, UserRole, Salon, Subscription, SubscriptionDuration, Order, Address, UserType } = require('../../models');
const statuses = require('../../constants/statuses.json')
const uuidService = require('../../services/uuidService')
const UserSerializer = require('../../serializers/v1/UserSerializer')
const AddressSerializer = require('../../serializers/v1/AddressSerializer')
const authService = require('../../services/authService')
const { Op } = require("sequelize");
const emailService = require("../../services/emailService")
const userStatusValues = require("../../models/values/UserStatus")
const userRepository = require("../../repository/userRepository")
const userUtiltiy = require("../../utils/user")
const {createOrUpdateSalonCustomer} = require("../../repository/salonCustomerRepository")

/**
 * get user item
 * @param {*} req 
 * @param {*} res 
 */

const getUserItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    const group = req.query.group
    
    await User.findOne({ 
        include: [
            {
                model: Subscription,
                include: [
                    {
                        model: SubscriptionDuration
                    }
                ]
            },
            {
                model: UserType
            },
            {
                model: Address
            }
        ],
        where: { uuid }
    }).then(async(user) => {
        const groups = ["read", group]
        const userSerializer = new UserSerializer(groups)
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, user: await userSerializer.serialize(user)} });
    })
    .catch(error => {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "User not found"} });
    });
};

/**
 * patch user item
 * @param {*} req
 * @param {*} res 
 */

 const patchUserItem = async (req, res) => {
    const data = req.body
    const patchUser = req.patchUser
    const currentUserStatus = patchUser.statusId
    const salon = req.salon
    const address = data.address

    await patchUser.update({ 
        ...(data.firstName && {firstName: data.firstName}),
        ...(data.lastName && {lastName: data.lastName}),
        ...(data.statusId && {statusId: data.statusId}),
        ...(data.gender && {gender: data.gender}),
        ...(data.profileImage && {profileImage: data.profileImage}),
        ...(data.locale && {locale: data.locale})
    })
    
    if (salon) {
        await createOrUpdateSalonCustomer(salon, patchUser)
    }

    if (address) {
        await userRepository.createOrUpdateUserAddress(patchUser, address)
    }
    
    const updatedUser = await User.findOne({ 
                            where: { id: patchUser.id },
                            include: [
                                {
                                    model: Role
                                },
                                {
                                    model: Address
                                },
                                (
                                    salon && {
                                        model: Salon
                                    }
                                )
                            ].filter(data => data)
                        })

    const isSalon = userRepository.isSalon(updatedUser)
    
    if (
        isSalon && 
        userStatusValues['PENDING'].id == currentUserStatus &&
        userStatusValues['ACTIVE'].id == data.statusId
    ) {
        await emailService.sendSalonRegisterEmail(patchUser, userUtiltiy.getPasswordFromUuid(updatedUser.uuid))
    }

    const userSerializer = new UserSerializer()
    res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, user: await userSerializer.serialize(updatedUser)} });
};

/**
 * create user item
 * @param {*} req 
 * @param {*} res 
 */

 const createUserItem = async (req, res) => {
    const data = req.body
    const salon = req.salon

    //create new user password
    let hashPassword = null
    await authService.cryptPassword(data.password)
    .then(hashResponse => {
        hashPassword = hashResponse
    })

    //create user
    const user = await User.build({
        email: data.email,
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashPassword,
        gender: data.gender,
        locale: data.locale,
        statusId: data.statusId
    });

    //send response
    let message = ''
    let statusCode = null
    await user.save()
    .then(async(res) => {
        if (data.roleId) {
            //create role
            const role = await Role.findOne({where: {
                id: data.roleId
            }});

            if (role) {
                //create user role
                const userRole = UserRole.build({
                    userId: user.id,
                    roleId: role.id
                });

                await userRole.save()
            }
        }

        statusCode = httpStatus.CREATED
        message = "User is created successfully"
        await emailService.sendRegisterEmail(user)

        if (salon) {
            //create salon customer
            try {
                await createOrUpdateSalonCustomer(salon, user)
            } catch (e) {
                statusCode = httpStatus.INTERNAL_SERVER_ERROR
                message = e?.errors?.[0]?.message ? e.errors[0].message : "SalonCustomer is not created"
                return res.status(statusCode).json({
                    statusCode,
                    message
                }); 
            }
        }
    })
    .catch(e => {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = e?.errors?.[0]?.message ? e.errors[0].message : "User is not created"
    });


    let createdUser = user
    if (salon) {
        createdUser = await User.findOne({ 
            where: { id: user.id },
            include: [
                {
                    model: Role
                },
                {
                    model: Salon
                }
            ]
        })
    }

    const userSerializer = new UserSerializer()
    res.status(statusCode).json({ ...{
        statusCode, 
        message,
        user: await userSerializer.serialize(createdUser)
    } });
};

/**
 * get user addresses
 * @param {*} req 
 * @param {*} res 
 */

 const getUserAddressCollection = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    
    let user;
    try {
        user = await User.findOne({ 
            include: [
                {
                    model: Subscription,
                    include: [
                        {
                            model: SubscriptionDuration
                        }
                    ]
                }
            ],
            where: { uuid }
        })
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "User not found"} });
    }
    user = await User.findOne({ 
        include: [
            {
                model: Order,
                include: [
                    {
                        model: Address,
                        as: 'ShippingAddress',
                    },
                    {
                        model: Address,
                        as: 'BillingAddress',
                    },
                ]
            }
        ],
        where: { uuid }
    })

    const orders = user.Orders
    const shippingAddresses = []
    const billingAddresses = []
    if (orders) {
        const addressSerializer = new AddressSerializer()
        for(let i = 0; i < orders.length; i++) {
            const orderObj = orders[i]
            const shippingAddress = orderObj.ShippingAddress
            if (shippingAddress) {
                const shippingAddressObj = await addressSerializer.serialize(shippingAddress)
                shippingAddresses.push(shippingAddressObj)
            }

            const billingAddress = orderObj.BillingAddress
            if (billingAddress) {
                const billingAddressObj = await addressSerializer.serialize(billingAddress)
                billingAddresses.push(billingAddressObj)
            }
        }
    }
    const addresses = {
        shippingAddresses,
        billingAddresses
    }
    return res.status(httpStatus.OK).json({statusCode: httpStatus.OK, addresses});

    // .then(async(user) => {
    //     const groups = ["read", group]
    //     const userSerializer = new UserSerializer(groups)
    //     return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, user: await userSerializer.serialize(user)} });
    // })
    // .catch(error => {
    //     return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "User not found"} });
    // });
};

module.exports = {
    getUserItem,
    patchUserItem,
    createUserItem,
    getUserAddressCollection
}