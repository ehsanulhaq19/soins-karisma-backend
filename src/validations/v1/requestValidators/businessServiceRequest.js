const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validatePostBusinessServiceItemRequest = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .max(191)
            .required(),
        price: Joi.number()
            .required(),
        duration: Joi.number()
            .required(),
        description: Joi.string()
            .max(2048)
            .required(),
        salonUuid: Joi.string()
            .max(128)
            .required(),
        rooms: Joi.array().min(1).items(Joi.object({
            totalChairs: Joi.number()
                    .integer()
                    .min(1)
                    .required(),
        })).required()
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

const validateGetBusinessServiceCollectionRequest = (data) => {
    const schema = Joi.object({
        salonUuid: Joi.string()
                .max(128),
        employeeIds: Joi.array(),
        page: Joi.number()
            .integer()
            .greater(0),
        itemsPerPage: Joi.number()
            .integer()
            .greater(0),
        pagination: Joi.boolean(),
        name: Joi.string().max(100),
        orderBy: Joi.string().valid('ASC','DESC').max(10),
        isActive: Joi.boolean()
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

const validateGetBusinessServiceItemRequest = (data) => {
    const schema = Joi.object({
        fields: Joi.array()
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
    validatePostBusinessServiceItemRequest,
    validateGetBusinessServiceCollectionRequest,
    validateGetBusinessServiceItemRequest
}