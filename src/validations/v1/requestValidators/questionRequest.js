const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validatePatchQuestionItemRequest = (data) => {
    const schema = Joi.object({
        heading: Joi.string()
                .max(255),
        position: Joi.number()
                .integer(),
        statusId: Joi.number()
                .integer(),
        typeId: Joi.number()
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

const validatePostQuestionItemRequest = (data) => {
    const schema = Joi.object({
        heading: Joi.string()
                .max(255)
                .required(),
        position: Joi.number()
                .integer()
                .min(0)
                .required(),
        statusId: Joi.number()
                .integer()
                .required(),
        typeId: Joi.number()
                .integer()
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

const validateGetQuestionCollectionRequest = (data) => {
    const schema = Joi.object({
        page: Joi.number()
            .integer()
            .greater(0),
        itemsPerPage: Joi.number()
            .integer()
            .greater(0),
        pagination: Joi.boolean(),
        groups: Joi.string()
                .max(512),
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

const validateGetQuestionItemRequest = (data) => {
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
    validatePatchQuestionItemRequest,
    validatePostQuestionItemRequest,
    validateGetQuestionCollectionRequest,
    validateGetQuestionItemRequest
}