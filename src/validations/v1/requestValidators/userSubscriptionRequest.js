const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validatePostUserSubscriptionItemRequest = (data) => {
    const schema = Joi.object({
        userUuid: Joi.string()
                .max(128)
                .required(),
        subscriptionUuid: Joi.string()
                .max(128)
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

const validateGetSubscriptionCollectionRequest = (data) => {
    const schema = Joi.object({
        page: Joi.number()
            .integer()
            .greater(0),
        itemsPerPage: Joi.number()
            .integer()
            .greater(0),
        pagination: Joi.boolean(),
        subscriptionUuid: Joi.string()
            .max(128)
            .required(),
        groups: Joi.string()
            .max(512)
            .min(0)
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
    validatePostUserSubscriptionItemRequest,
    validateGetSubscriptionCollectionRequest
}