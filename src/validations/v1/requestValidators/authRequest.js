const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')
const {getDayList} = require("../../../utils/utility")

const daysList = getDayList()

const validateAuthRegisterRequest = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .max(255)
            .required(),

        firstName: Joi.string()
            .max(64)
            .required(),

        lastName: Joi.string()
            .max(64),

        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
            .required(),

        phone: Joi.string().regex(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/).messages({'string.pattern.base': `Invalid phone number.`}),
        locale: Joi.string().valid('en', 'es', 'fr').max(50),
        salonUuid: Joi.string().max(128).required(),
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }
    return {
        type: statuses.SUCCESS
    }
}

const validateAuthBasicRegisterRequest = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .max(255)
            .required(),

        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
            .required(),
        
        firstName: Joi.string()
            .max(64),

        lastName: Joi.string()
            .max(64),

        phone: Joi.string().regex(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/).messages({'string.pattern.base': `Invalid phone number.`}),
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }
    return {
        type: statuses.SUCCESS
    }
}

const validateAuthSalonRegisterRequest = (data) => {
    const schema = Joi.object({
        email: Joi.string()
                .email({ minDomainSegments: 2 })
                .max(255)
                .required(),

        firstName: Joi.string()
                .max(64)
                .required(),

        lastName: Joi.string()
                .max(64)
                .required(),
        
        name: Joi.string().max(255),
        phone: Joi.string().max(255),
        mobilePhone: Joi.string().max(255),
        otherEmail: Joi.string()
                    .email({ minDomainSegments: 2 })
                    .max(255)
                    .required(),
        noOfSalons: Joi.number().integer(),
        describeSalon: Joi.string().max(64),
        noOfChairs: Joi.number().integer(),
        noOfEmployees: Joi.number().integer(),
        servicesProvide: Joi.string(),
        approxMonthlyRevenue: Joi.string(),
        fromTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5][0-9])$/),
        toTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5][0-9])$/),
        fromDay: Joi.string().max(20).valid(...daysList),
        toDay: Joi.string().max(20).valid(...daysList),
        address: Joi.object({
            firstName: Joi.string().max(255),
            lastName: Joi.string().max(255),
            address: Joi.string().max(255),
            country: Joi.string().max(255),
            state: Joi.string().max(255),
            city: Joi.string().max(255),
            postCode: Joi.string().max(255),
            phoneNumber: Joi.string().max(255),
            latitude: Joi.number(),
            longitude: Joi.number(),
        })
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }
    return {
        type: statuses.SUCCESS
    }
}

const validateAuthEmployeeRegisterRequest = (data) => {
    const schema = Joi.object({
        email: Joi.string()
                .email({ minDomainSegments: 2 })
                .max(255)
                .required(),

        password: Joi.string()
                .min(8)
                .max(30)
                .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
                .required(),

        firstName: Joi.string()
                .max(64)
                .required(),

        lastName: Joi.string()
                .max(64)
                .required(),

        salonUuid: Joi.string()
                .max(128)
                .required(),

        calendarColor: Joi.string().max(50),
        gender: Joi.string().valid('M', 'F', 'O').max(1),
        phone: Joi.string().max(255),
        mobilePhone: Joi.string().max(255),
        employeeRoleId: Joi.number().required(),
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }
    return {
        type: statuses.SUCCESS
    }
}

const validateAuthLoginRequest = (data) => {
    const schema = Joi.object({
        email: Joi.alternatives().conditional('userName', { 
            not: Joi.exist(), 
            then: Joi.string()
                .email({ minDomainSegments: 2 })
                .max(255)
                .required(), 
            otherwise: Joi.string()
                .email({ minDomainSegments: 2 })
                .max(255)
        }),
        
        userName: Joi.alternatives().conditional('email', { 
            not: Joi.exist(), 
            then: Joi.string()
                .max(191)
                .required(), 
            otherwise: Joi.string()
                .max(191)
        }),

        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
            .required()
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }
    return {
        type: statuses.SUCCESS
    }
}

const validateAuthLoginTwoFARequest = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .max(255)
            .required(),
        
        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
            .required(),

        medium: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }
    return {
        type: statuses.SUCCESS
    }
}

const validateAuthLoginTwoFAOtpVerifyRequest = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .max(255)
            .required(),
        
        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
            .required(),

        medium: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        otpCode: Joi.string()
            .alphanum()
            .min(4)
            .max(4)
            .required(),
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }
    return {
        type: statuses.SUCCESS
    }
}

const validateChangePasswordRequest = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .max(255)
            .required(),
        
        newPassword: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
            .required(),

        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
            .required()
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }
    return {
        type: statuses.SUCCESS
    }
}

const validateForgotPasswordRequest = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .max(255)
            .required(),
        medium: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }
    return {
        type: statuses.SUCCESS
    }
}

const validateForgotPasswordOtpVerifyRequest = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .max(255)
            .required(),
        medium: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        otpCode: Joi.string()
            .alphanum()
            .min(4)
            .max(4)
            .required(),
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }
    return {
        type: statuses.SUCCESS
    }
}

const validateForgotPasswordWithOtpRequest = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .max(255)
            .required(),
        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
            .required(),
        medium: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        otpCode: Joi.string()
            .alphanum()
            .min(4)
            .max(4)
            .required(),
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }
    return {
        type: statuses.SUCCESS
    }
}

module.exports = {
    validateAuthRegisterRequest,
    validateAuthBasicRegisterRequest,
    validateAuthSalonRegisterRequest,
    validateAuthEmployeeRegisterRequest,
    validateAuthLoginRequest,
    validateAuthLoginTwoFARequest,
    validateAuthLoginTwoFAOtpVerifyRequest,
    validateChangePasswordRequest,
    validateForgotPasswordRequest,
    validateForgotPasswordOtpVerifyRequest,
    validateForgotPasswordWithOtpRequest
}