const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validatePatchUserItemRequest = (data) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .max(64),

        lastName: Joi.string()
            .max(64),

        statusId: Joi.number().integer(),
        salonUuid: Joi.string()
            .max(128),
        gender: Joi.string().valid('M', 'F', 'O').max(1),
        locale: Joi.string().valid('en', 'es', 'fr').max(50),
        profileImage: Joi.string().max(500),
        address: Joi.object({
            address: Joi.string(),
            country: Joi.string().required(),
            state: Joi.string().required(),
            city: Joi.string(),
            postCode: Joi.string(),
            phoneNumber: Joi.string(),
            latitude: Joi.string(),
            longitude: Joi.string()
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

const validatePostUserItemRequest = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .max(255)
            .required(),

        userName: Joi.string()
            .max(191)
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

        gender: Joi.string().valid('M', 'F', 'O').max(1).required(),
        locale: Joi.string().valid('en', 'es', 'fr').max(50),
        roleId: Joi.number().integer().required(),
        statusId: Joi.number().integer().required(),
        salonUuid: Joi.string()
                .max(128),
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
    validatePatchUserItemRequest,
    validatePostUserItemRequest
}