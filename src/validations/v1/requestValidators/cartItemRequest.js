const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validatePatchCartItemItemRequest = (data) => {
    const schema = Joi.object({
        quantity: Joi.number()
                .integer()
                .min(1),
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

const validatePostCartItemItemRequest = (data) => {
    const schema = Joi.object({
        productUuid: Joi.string()
            .max(128)
            .required(),
        cartUuid: Joi.string()
            .max(128),
        quantity: Joi.number()
                .integer()
                .min(1),
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

const validateGetCartItemCollectionRequest = (data) => {
    const schema = Joi.object({
        cartUuid: Joi.string()
            .max(128)
            .required(),
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

module.exports = {
    validatePatchCartItemItemRequest,
    validatePostCartItemItemRequest,
    validateGetCartItemCollectionRequest
}