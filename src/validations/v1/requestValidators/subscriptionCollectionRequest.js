const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validatePostSubscriptionCollectionItemRequest = (data) => {
    const schema = Joi.object({
        subscriptionUuids: Joi.array().items(
            Joi.string().max(255).required()
        ).required(),
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

const validateGetSubscriptionCollectionCollectionRequest = (data) => {
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

const validateDeleteSubscriptionCollectionItemRequest = (data) => {
    const schema = Joi.object({
        subscriptionUuids: Joi.array().items(
            Joi.string().max(255).required()
        ).required(),
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

const validatePatchSubscriptionCollectionItemRequest = (data) => {
    const schema = Joi.object({
        subscriptionUuids: Joi.array().items(
            Joi.string().max(255).required()
        ),
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
    validatePostSubscriptionCollectionItemRequest,
    validateGetSubscriptionCollectionCollectionRequest,
    validateDeleteSubscriptionCollectionItemRequest,
    validatePatchSubscriptionCollectionItemRequest
}