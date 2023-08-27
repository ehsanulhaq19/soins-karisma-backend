const httpStatus = require('http-status');
const { Op } = require("sequelize");
const { DateTime, Duration } = require("luxon");
const { User, UserRole, Role, SalonCustomer, UserType } = require('../../../models');
const authService = require('../../../services/authService')
const statuses = require('../../../constants/statuses.json')
const emailService = require("../../../services/emailService")
const smsService = require("../../../services/smsService")
const utility = require("../../../utils/utility")
const durationValues = require('../../../constants/durations.json')
const otpCodeTypes = require("../../../models/values/OtpCodeType")
const otpCodeStatuses = require("../../../models/values/OtpCodeStatus")
const UserStatusValues = require("../../../models/values/UserStatus")
const UserTypeValues = require("../../../models/values/UserType")
const RoleValues = require("../../../models/values/Role")
const {
    getUserOtpcode,
    createOtpCode
} = require("../../../repository/otpCodeRepository");
const SalonCustomerStatusValues = require("../../../models/values/SalonCustomerStatus")
const SalonCustomerTypeValues = require("../../../models/values/SalonCustomerType")

/**
 * Register user
 * @param {*} req 
 * @param {*} res 
 */

const register = async (req, res) => {
    const data = req.body
    const salon = req.salon

    //create new user password
    let hashPassword = null
    await authService.cryptPassword(data.password)
    .then(hashResponse => {
        hashPassword = hashResponse
    })

    const timestamp = parseInt((DateTime.now()).toSeconds())
    const userName = `${data.firstName}_${timestamp}`
    //create user
    const user = User.build({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashPassword,
        phone: data.phone,
        userName,
        locale: data.locale,
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
                [Op.iLike]: RoleValues['CUSTOMER'].name
            }
        }});
        //create user role
        const userRole = UserRole.build({
            userId: user.id,
            roleId: role.id
        });

        await userRole.save()

        statusCode = httpStatus.CREATED
        message = "User is created successfully"

        try {
            await emailService.sendRegisterEmail(user)
        } catch (error) {
            message = "User is created successfully, email is not sent"
        }
    })
    .catch(e => {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = e?.errors?.[0]?.message ? e.errors[0].message : "User is not created"
        return res.status(statusCode).json({
            statusCode,
            message
        }); 
    });

    if (salon) {
        try {
            const salonCustomer = await SalonCustomer.create({
                userId: user.id,
                salonId: salon.id,
                statusId: SalonCustomerStatusValues.ACTIVE.id,
                typeId: SalonCustomerTypeValues.DEFAULT.id
            })
        } catch (e) {
            statusCode = httpStatus.INTERNAL_SERVER_ERROR
            message = e?.errors?.[0]?.message ? e.errors[0].message : "SalonCustomer is not created"
            return res.status(statusCode).json({
                statusCode,
                message
            }); 
        }
    }

    return res.status(statusCode).json({ ...{statusCode, message} });
};

/**
 * Basic register user
 * @param {*} req 
 * @param {*} res 
 */

 const basicRegister = async (req, res) => {
    const data = req.body

    //create new user password
    let hashPassword = null
    await authService.cryptPassword(data.password)
    .then(hashResponse => {
        hashPassword = hashResponse
    })

    const timestamp = parseInt((DateTime.now()).toSeconds())
    const userName = `${data.firstName ?? "user"}_${timestamp}`
    
    //create user
    const user = User.build({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashPassword,
        phone: data.phone,
        userName,
        locale: data.locale,
        statusId: UserStatusValues['ACTIVE'].id,
        typeId: UserTypeValues.DEFAULT_URGENT.id
    });

    //send response
    let message = ''
    let statusCode = null
    await user.save()
    .then(async(res) => {
        //create role
        const role = await Role.findOne({where: {
            name: {
                [Op.iLike]: RoleValues['CUSTOMER'].name
            }
        }});
        //create user role
        const userRole = UserRole.build({
            userId: user.id,
            roleId: role.id
        });

        await userRole.save()

        statusCode = httpStatus.CREATED
        message = "User is created successfully"
    })
    .catch(e => {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = e?.errors?.[0]?.message ? e.errors[0].message : "User is not created"
        return res.status(statusCode).json({
            statusCode,
            message
        }); 
    });

    return res.status(statusCode).json({ ...{statusCode, message} });
};

/**
 * Login user
 * @param {*} req 
 * @param {*} res 
 */

const login = async (req, res) => {
    const data = req.body
    const email = data.email || null
    const userName = data.userName || null
    const user = await User.findOne({
        include: [
            {
                model: UserType
            }
        ],
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        {email}, 
                        {
                            email: {
                                [Op.ne]: null
                            }
                        }
                    ]
                },
                {
                    [Op.and]: [
                        {userName}, 
                        {
                            userName: {
                                [Op.ne]: null
                            }
                        }
                    ]
                }
            ],
            statusId: UserStatusValues.ACTIVE.id
        } 
    });
    
    if (!user) {
        return res.status(httpStatus.FORBIDDEN).json({
            statusCode: httpStatus.FORBIDDEN,
            message: "User is not in active status"
        }); 
    }

    let response = {
        statusCode: httpStatus.OK,
    }
    response["registerationType"] = user.UserType.name
    if (!user.enableTwoFactorAuthentication) {
        response["token"] = await authService.getUserJWT(user.id)
    } else {
        response["token"] = null
        response["twoFactorAuthenticationEnabled"] = true
    }

    res.status(response.statusCode).json(response); 
};

/**
 * Send Two factor authentication code to provided user medium
 * @param {*} req 
 * @param {*} res 
 */

const loginWithTwoFactorAuthentication = async (req, res) => {
    const data = req.body
    const email = data.email
    const user = await User.findOne({ where: { email } });

    const medium = data.medium
    const otpExpireDuration = durationValues.otpVerification
    const otpCode = utility.getOtpCode();
    let otpCodeType = null
    if (medium === 'email') {
        const emailResponse = await emailService.sendTwoFactorAuthEmail(user, otpCode)
        if (emailResponse.type === statuses.ERROR) {
            return res.status(httpStatus.FAILED_DEPENDENCY).json({
                statusCode: httpStatus.FAILED_DEPENDENCY,
                message: 'Email is not send'
            } );
        }
        otpCodeType = otpCodeTypes.TWO_FACTOR_AUTHENTICATION_EMAIL.id
    } else if (medium === 'phone') {
        const messageText = `Your Two Factor Authentication code is ${otpCode}. 
                            It will expire in ${parseInt(otpExpireDuration/60)} minutes.`
        const smsResponse = await smsService.sendMessage(
                                user.phone, 
                                messageText
                            )
                            
        if (smsResponse.type === statuses.ERROR) {
            return res.status(httpStatus.FAILED_DEPENDENCY).json({
                statusCode: httpStatus.FAILED_DEPENDENCY,
                message: 'OTP code is not send'
            } );
        }
        otpCodeType = otpCodeTypes.TWO_FACTOR_AUTHENTICATION_MOBILE.id     
    }
    
    const currentDateTime = DateTime.now()
    const expiryWait = Duration.fromObject({ seconds: otpExpireDuration });
    const expireAt = currentDateTime.plus(expiryWait)
    const otpCodeResponse = await createOtpCode(
                                otpCode,
                                user.id,
                                otpCodeType,
                                expireAt
                            )

    if (otpCodeResponse.type === statuses.ERROR) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Otp code is not generated'
        } );
    } 
    //send response
    let response = {
        statusCode: httpStatus.OK,
        message: 'OTP code is send successfully'
    }
    res.status(response.statusCode).json({ ...response });
}

/**
 * Verify user's two factor authentication code
 * @param {*} req 
 * @param {*} res 
 */

 const loginWithTwoFactorAuthOtpVerify = async (req, res) => {
    const data = req.body
    const email = data.email
    const user = await User.findOne({ where: { email } });
    
    //send otp code
    const medium = data.medium
    let otpCodeType = null
    if (medium === 'email') {
        otpCodeType = otpCodeTypes.TWO_FACTOR_AUTHENTICATION_EMAIL.id
    } else if (medium === 'phone') {
        otpCodeType = otpCodeTypes.TWO_FACTOR_AUTHENTICATION_MOBILE.id
    }

    const userOtpCode = await getUserOtpcode(user.email, otpCodeType)
    if (!userOtpCode || userOtpCode.otpCode != data.otpCode) {
        return res.status(httpStatus.FORBIDDEN).json({
            statusCode: httpStatus.FORBIDDEN,
            message: 'Invalid OTP code'
        } );
    }

    userOtpCode.status = otpCodeStatuses.DISABLE.id
    await userOtpCode.save()

    res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        token: await authService.getUserJWT(user.id)
    });
 }

/**
 * Change user password
 * @param {*} req 
 * @param {*} res 
 */

const changePassword = async (req, res) => {
    const data = req.body
    const user = req.user

    //create new user password
    let hashPassword = null
    await authService.cryptPassword(data.newPassword)
    .then(hashResponse => {
        hashPassword = hashResponse
    })

    //update user password
    await user.update({ password: hashPassword })

    const response = {
        statusCode: httpStatus.OK,
        message: "Password is changed successfully"
    }
    return res.status(response.statusCode).json(response);
};

/**
 * Send otp code to user for changing password
 * @param {*} req 
 * @param {*} res 
 */

const forgotPasswod = async (req, res) => {
    const data = req.body
    const user = req.user

    //send otp code
    const medium = data.medium
    const otpExpireDuration = durationValues.otpVerification
    const otpCode = utility.getOtpCode();
    let otpCodeType = null
    if (medium === 'email') {
        const emailResponse = await emailService.sendForgotPasswordEmail(user, otpCode)
        if (emailResponse.type === statuses.ERROR) {
            return res.status(httpStatus.FAILED_DEPENDENCY).json({
                statusCode: httpStatus.FAILED_DEPENDENCY,
                message: 'Email is not send'
            } );
        }
        otpCodeType = otpCodeTypes.FORGOT_PASSSWORD_EMAIL.id
    } else if (medium === 'phone') {
        const messageText = `Your OTP verification code is ${otpCode}. 
                            It will expire in ${parseInt(otpExpireDuration/60)} minutes.`
        const smsResponse = await smsService.sendMessage(
                                user.phone, 
                                messageText
                            )
                            
        if (smsResponse.type === statuses.ERROR) {
            return res.status(httpStatus.FAILED_DEPENDENCY).json({
                statusCode: httpStatus.FAILED_DEPENDENCY,
                message: 'OTP code is not send'
            } );
        }
        otpCodeType = otpCodeTypes.FORGOT_PASSSWORD_MOBILE.id     

    }
    
    const currentDateTime = DateTime.now()
    const expiryWait = Duration.fromObject({ seconds: otpExpireDuration });
    const expireAt = currentDateTime.plus(expiryWait)
    const otpCodeResponse = await createOtpCode(
                                otpCode,
                                user.id,
                                otpCodeType,
                                expireAt
                            )

    if (otpCodeResponse.type === statuses.ERROR) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Otp code is not generated'
        } );
    } 
    //send response
    let response = {
        statusCode: httpStatus.OK,
        message: 'OTP code is send successfully'
    }
    res.status(response.statusCode).json({ ...response });
};

/**
 * Verify user otp code for changing password
 * @param {*} req 
 * @param {*} res 
 */

const forgotPasswodOtpVerify = async (req, res) => {
    const data = req.body
    const user = req.user;
    
    //send otp code
    const medium = data.medium
    let otpCodeType = null
    if (medium === 'email') {
        otpCodeType = otpCodeTypes.FORGOT_PASSSWORD_EMAIL.id
    } else if (medium === 'phone') {
        otpCodeType = otpCodeTypes.FORGOT_PASSSWORD_MOBILE.id
    }

    const userOtpCode = await getUserOtpcode(user.email, otpCodeType)
    if (!userOtpCode || userOtpCode.otpCode != data.otpCode) {
        return res.status(httpStatus.FORBIDDEN).json({
            statusCode: httpStatus.FORBIDDEN,
            message: 'Invalid OTP code'
        } );
    }

    res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        message: 'Valid OTP code'
    });
};

/**
 * Verify otp code and change user password
 * @param {*} req 
 * @param {*} res 
 */

const changePasswordWithOtp = async (req, res) => {
    const data = req.body
    const user = req.user;
    
    //send otp code
    const medium = data.medium
    let otpCodeType = null
    if (medium === 'email') {
        otpCodeType = otpCodeTypes.FORGOT_PASSSWORD_EMAIL.id
    } else if (medium === 'phone') {
        otpCodeType = otpCodeTypes.FORGOT_PASSSWORD_MOBILE.id
    }

    const userOtpCode = await getUserOtpcode(user.email, otpCodeType)
    if (!userOtpCode || userOtpCode.otpCode != data.otpCode) {
        return res.status(httpStatus.FORBIDDEN).json({
            statusCode: httpStatus.FORBIDDEN,
            message: 'Invalid OTP code'
        } );
    }

    //create new user password
    let hashPassword = null
    await authService.cryptPassword(data.password)
    .then(hashResponse => {
        hashPassword = hashResponse
    })

    //create user
    await user.update({ password: hashPassword })

    userOtpCode.status = otpCodeStatuses.DISABLE.id
    await userOtpCode.save()

    res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        message: 'Password is updated successfully'
    });
};

/**
 * Return guest user auth token
 * @param {*} req 
 * @param {*} res 
 */

const getGuestUserToken = (req, res) => {
    const guestJwtToken = authService.getGuestUserToken()

    res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        token: guestJwtToken
    });
}

module.exports = {
  register,
  basicRegister,
  login,
  changePassword,
  forgotPasswod,
  forgotPasswodOtpVerify,
  changePasswordWithOtp,
  loginWithTwoFactorAuthentication,
  loginWithTwoFactorAuthOtpVerify,
  getGuestUserToken
};