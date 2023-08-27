const { Op } = require("sequelize");
const httpStatus = require('http-status');
const { User, Salon, EmployeeRole } = require('../../../models');
const authRequest = require("../requestValidators/authRequest")
const statuses = require('../../../constants/statuses.json')
const authService = require('../../../services/authService')
const uuidService = require("../../../services/uuidService")
const salonRepository = require("../../../repository/salonRepository")

const authLoginValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = authRequest.validateAuthLoginRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    //validate credentials
    const email = data.email || null
    const userName = data.userName || null
    const user = await User.findOne({ 
        where: {
            [Op.or]: [{email}, {userName}]
        }
    });
    if (!user) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.UNAUTHORIZED,
            message: "Invalid credentials"
        }
    }

    let isPasswordMatch = false
    await authService.comparePassword(data.password, user.password)
    .then(response => {
        isPasswordMatch = response
    })

    if (!isPasswordMatch) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Invalid credentials"
      }
    }

    return {
        type: statuses.SUCCESS
    }
}

const twoFactorAuthValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = authRequest.validateAuthLoginTwoFARequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    const medium = data.medium
    if (medium !== 'email' && medium !== 'phone') {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Medium is not supported'
        }
    }

    //validate credentials
    const email = data.email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.UNAUTHORIZED,
            message: "Invalid credentials"
        }
    }

    let isPasswordMatch = false
    await authService.comparePassword(data.password, user.password)
    .then(response => {
        isPasswordMatch = response
    })

    if (!isPasswordMatch) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Invalid credentials"
      }
    }

    if (!user.enableTwoFactorAuthentication) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.UNPROCESSABLE_ENTITY,
        message: "User has not enabled two factor authentication"
      }
    }

    return {
        type: statuses.SUCCESS
    }
}

const twoFactorAuthOtpVerifyValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = authRequest.validateAuthLoginTwoFAOtpVerifyRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    const medium = data.medium
    if (medium !== 'email' && medium !== 'phone') {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Medium is not supported'
        }
    }

    //validate credentials
    const email = data.email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.UNAUTHORIZED,
            message: "Invalid credentials"
        }
    }

    let isPasswordMatch = false
    await authService.comparePassword(data.password, user.password)
    .then(response => {
        isPasswordMatch = response
    })

    if (!isPasswordMatch) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Invalid credentials"
      }
    }

    if (!user.enableTwoFactorAuthentication) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.UNPROCESSABLE_ENTITY,
        message: "User has not enabled two factor authentication"
      }
    }
    
    return {
        type: statuses.SUCCESS
    }
}

const registerValidator = async(req) => {
    const data = req.body

    //data validation
    const validationResponse = authRequest.validateAuthRegisterRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    //check if user already exists
    let user = await User.findOne({ where: { 
        [Op.or]: [
            { email: data.email }
        ]
      } });

    if (user) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.FORBIDDEN,
            message: "User already exists"
        }
    }

    //check if provided salon is valid
    const salonUuid = data.salonUuid
    let salon;

    try {
        salon = await Salon.findOne({
                    where: {
                        uuid: uuidService.decodeUuid(salonUuid)
                    }
                })
    } catch (error) {}

    if (!salon) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.NOT_FOUND,
            message: "Salon not found"
        }
    }

    req.salon = salon

    return {
        type: statuses.SUCCESS
    }
}

const basicRegisterValidator = async(req) => {
    const data = req.body

    //data validation
    const validationResponse = authRequest.validateAuthBasicRegisterRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    //check if user already exists
    let user = await User.findOne({ where: { 
        [Op.or]: [
            { email: data.email }
        ]
      } });

    if (user) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.FORBIDDEN,
            message: "User already exists"
        }
    }

    return {
        type: statuses.SUCCESS
    }
}

const salonRegisterValidator = async(req) => {
    const data = req.body

    //data validation
    const validationResponse = authRequest.validateAuthSalonRegisterRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    //check if user already exists
    let user = await User.findOne({ where: { 
        [Op.or]: [
            { email: data.email }
        ]
      } });

    if (user) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.FORBIDDEN,
            message: "User already exists"
        }
    }

    return {
        type: statuses.SUCCESS
    }
}

const employeeRegisterValidator = async(req) => {
    const data = req.body

    //data validation
    const validationResponse = authRequest.validateAuthEmployeeRegisterRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    //check if user already exists
    const user = await User.findOne({ where: { 
        [Op.or]: [
            { email: data.email }
        ]
      } });

    if (user) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.FORBIDDEN,
            message: "Employee user already exists"
        }
    }

    const decodedUuid = uuidService.decodeUuid(data.salonUuid)
    let salon;
    if (decodedUuid) {
      salon = await salonRepository.getActiveSalonByUuid(decodedUuid)
    }
    
    if (!salon) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.FORBIDDEN,
            message: "Salon not exists"
        }
    }

    req.salon = salon

    if (data.employeeRoleId) {
        let employeeRole = await EmployeeRole.findOne({
            where: {
                id: data.employeeRoleId
            }
        })    
        
        req.employeeRole = employeeRole
    }

    return {
        type: statuses.SUCCESS
    }
}

const changePasswordValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = authRequest.validateChangePasswordRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    //validate credentials
    const email = data.email

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.UNAUTHORIZED,
            message: "Invalid credentials"
        }
    }

    let isPasswordMatch = false

    await authService.comparePassword(data.password, user.password)
    .then(response => {
        isPasswordMatch = response
    })

    //send response
    if (!isPasswordMatch) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Invalid credentials"
      }
    }

    if (data.password == data.newPassword) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Password is already in use"
      }
    }

    req.user = user

    return {
        type: statuses.SUCCESS
    }
}

const forgotPasswordValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = authRequest.validateForgotPasswordRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    //validate credentials
    const email = data.email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.NOT_FOUND,
            message: "User not found"
        }
    }

    const medium = data.medium
    if (medium !== 'email' && medium !== 'phone') {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Medium is not supported'
        }
    }
    else if (medium === 'phone' && !user.phone) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Phone number is not provided'
        }
    }

    req.user = user

    return {
        type: statuses.SUCCESS
    }
}

const forgotPasswordOtpVerifyValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = authRequest.validateForgotPasswordOtpVerifyRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    //validate credentials
    const email = data.email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.NOT_FOUND,
            message: "User not found"
        }
    }

    const medium = data.medium
    if (medium !== 'email' && medium !== 'phone') {
      return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Medium is not supported'
        }
    }
    else if (medium === 'phone' && !user.phone) {
      return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Phone number is not provided'
        }
    }

    req.user = user

    return {
        type: statuses.SUCCESS
    }
}

const forgotPasswordOtpVerifyUpdatePasswordValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = authRequest.validateForgotPasswordWithOtpRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    //validate credentials
    const email = data.email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.NOT_FOUND,
            message: "User not found"
        }
    }

    const medium = data.medium
    if (medium !== 'email' && medium !== 'phone') {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Medium is not supported'
        }
    }
    else if (medium === 'phone' && !user.phone) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Phone number is not provided'
        }
    }

    //check if same password is provided again
    let isPasswordMatch = false

    await authService.comparePassword(data.password, user.password)
    .then(response => {
        isPasswordMatch = response
    })

    if (isPasswordMatch) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Password is already in use"
      }
    }

    req.user = user

    return {
        type: statuses.SUCCESS
    }
}

module.exports = {
    authLoginValidator,
    twoFactorAuthValidator,
    twoFactorAuthOtpVerifyValidator,
    registerValidator,
    basicRegisterValidator,
    salonRegisterValidator,
    employeeRegisterValidator,
    changePasswordValidator,
    forgotPasswordValidator,
    forgotPasswordOtpVerifyValidator,
    forgotPasswordOtpVerifyUpdatePasswordValidator
}