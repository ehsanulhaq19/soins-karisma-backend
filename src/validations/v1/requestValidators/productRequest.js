const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')
const {getUrlRegex} = require("../../../utils/utility")

const urlRegex = getUrlRegex()

const validatePatchProductItemRequest = (data) => {
    const schema = Joi.object({
        name: Joi.string()
                .max(255),
        description: Joi.string()
                .max(4096),
        price: Joi.number(),
        rating: Joi.number(),
        stock: Joi.number()
                .integer(),
        imageUrl: Joi.string()
                .regex(new RegExp(urlRegex))
                .max(255)
                .error(new Error("imageUrl is not valid")),
        url: Joi.string()
                .regex(new RegExp(urlRegex))
                .max(255)
                .error(new Error("url is not valid")),
        backgroundColor: Joi.string()
                .max(255),
        statusId: Joi.number()
                .integer(),
        benefits: Joi.array().items(
            Joi.object({
                label: Joi.string()
                    .max(255),
                icon: Joi.string()
                    .max(50),
                content: Joi.string()
                    .max(2048)
                    .required(),
            }),
        ),
        ingredients: Joi.array().items(
            Joi.object({
                label: Joi.string()
                    .max(255),
                icon: Joi.string()
                    .max(50),
                content: Joi.string()
                    .max(2048)
                    .required(),
            }),
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

const validatePostProductItemRequest = (data) => {
    const schema = Joi.object({
        name: Joi.string()
                .max(255),
        description: Joi.string()
                .max(4096),
        price: Joi.number(),
        rating: Joi.number(),
        stock: Joi.number()
                .integer(),
        imageUrl: Joi.string()
                .regex(new RegExp(urlRegex))
                .max(255)
                .error(new Error("imageUrl is not valid")),
        url: Joi.string()
                .regex(new RegExp(urlRegex))
                .max(255)
                .error(new Error("url is not valid")),
        backgroundColor: Joi.string()
                .max(255),
        statusId: Joi.number()
                .integer(),
        benefits: Joi.array().items(
            Joi.object({
                label: Joi.string()
                    .max(255),
                icon: Joi.string()
                    .max(50),
                content: Joi.string()
                    .max(2048)
                    .required(),
            }),
        ),
        ingredients: Joi.array().items(
            Joi.object({
                label: Joi.string()
                    .max(255),
                icon: Joi.string()
                    .max(50),
                content: Joi.string()
                    .max(2048)
                    .required(),
            }),
        ),
        productQuantity: Joi.number().min(1),
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

const validateGetProductCollectionRequest = (data) => {
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
    validatePatchProductItemRequest,
    validatePostProductItemRequest,
    validateGetProductCollectionRequest
}