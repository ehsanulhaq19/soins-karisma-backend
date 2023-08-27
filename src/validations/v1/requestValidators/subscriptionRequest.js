const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validatePostSubscriptionItemRequest = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .max(255)
            .required(),
        price: Joi.number()
            .required(),
        description: Joi.string()
            .max(2048),
        duration: Joi.string()
            .max(255)
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

const validateGetSubscriptionCollectionRequest = (data) => {
    const schema = Joi.object({
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
    validatePostSubscriptionItemRequest,
    validateGetSubscriptionCollectionRequest
}