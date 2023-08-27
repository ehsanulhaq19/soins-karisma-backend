const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validatePatchCartItemRequest = (data) => {
    const schema = Joi.object({
        name: Joi.string()
                .max(255),
        description: Joi.string()
                .max(4096),
        statusId: Joi.number()
                .integer()
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

const validatePostCartItemRequest = (data) => {
    const schema = Joi.object({
        name: Joi.string()
                .max(255),
        description: Joi.string()
                .max(4096),
        statusId: Joi.number()
                .integer()
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

const validateGetCartCollectionRequest = (data) => {
    const schema = Joi.object({
        group: Joi.string()
                .max(255),
        userUuid: Joi.string()
                .max(128),
        page: Joi.number()
            .integer()
            .greater(0),
        itemsPerPage: Joi.number()
            .integer()
            .greater(0),
        pagination: Joi.boolean()
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

const validateGetCartItemRequest = (data) => {
    const schema = Joi.object({
        group: Joi.string()
                .max(255),
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
    validatePatchCartItemRequest,
    validatePostCartItemRequest,
    validateGetCartCollectionRequest,
    validateGetCartItemRequest
}