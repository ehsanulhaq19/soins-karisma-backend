const Joi = require('joi');
const valid = require("card-validator");
const { DateTime } = require("luxon");
const statuses = require('../../../constants/statuses.json')

const createSubscriptionPaymentRequest = (data) => {
    const currentDate = DateTime.now()
    const year = parseInt(currentDate.toFormat("y"))
    const schema = Joi.object({
        subscriptionUuid: Joi.string()
            .max(128)
            .required(),
        cardNumber: Joi.string().required(),
        month: Joi.number().min(1).max(12).required(),
        year: Joi.number().min(year).max(9999).required(),
        cvc: Joi.number().min(1).required(),
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }

    const cardValidation = valid.number(data.cardNumber)
    if (!cardValidation.isValid) {
        return {
            type: statuses.ERROR,
            message: "Invalid card number"
        }
    }
    
    return {
        type: statuses.SUCCESS
    }
}

const createOrderPaymentIntentRequest = (data) => {
    const schema = Joi.object({
        cartUuid: Joi.string()
            .max(128)
            .required(),
        shippingAddress: Joi.object({
            firstName: Joi.string(),
            lastName: Joi.string(),
            address: Joi.string(),
            country: Joi.string(),
            state: Joi.string(),
            city: Joi.string(),
            postCode: Joi.string(),
            phoneNumber: Joi.string()
        }),
        billingAddress: Joi.object({
            address: Joi.string(),
            country: Joi.string(),
            state: Joi.string(),
            city: Joi.string(),
            postCode: Joi.string(),
            phoneNumber: Joi.string()
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

const createOrderChargeRequest = (data) => {
    const schema = Joi.object({
        orderUuid: Joi.string()
            .max(128)
            .required(),
        stripePaymentSourceId: Joi.string().max(128),
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

const createSubscriptionPaymentIntentRequest = (data) => {
    const schema = Joi.object({
        subscriptionUuid: Joi.string()
            .max(128)
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

const createSubscriptionChargeRequest = (data) => {
    const schema = Joi.object({
        subscriptionUuid: Joi.string()
            .max(128)
            .required(),
        stripePaymentSourceId: Joi.string().max(128),
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

const createSubscriptionPaymentSheetRequest = (data) => {
    const schema = Joi.object({
        subscriptionUuid: Joi.string()
            .max(128)
            .required(),
        billingAddress: Joi.object({
            state: Joi.string().required()
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

module.exports = {
    createSubscriptionPaymentRequest,
    createOrderPaymentIntentRequest,
    createOrderChargeRequest,
    createSubscriptionPaymentIntentRequest,
    createSubscriptionChargeRequest,
    createSubscriptionPaymentSheetRequest
}