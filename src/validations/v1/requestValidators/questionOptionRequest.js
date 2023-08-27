const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validatePatchQuestionOptionItemRequest = (data) => {
    const schema = Joi.object({
        content: Joi.string()
                .max(255),
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

const validatePostQuestionOptionItemRequest = (data) => {
    const schema = Joi.object({
        content: Joi.string()
                .max(255)
                .required(),
        questionUuid: Joi.string()
                .max(128)
                .required(),
        statusId: Joi.number()
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

const validateGetQuestionOptionCollectionRequest = (data) => {
    const schema = Joi.object({
        group: Joi.string()
                .max(255),
        page: Joi.number()
            .integer()
            .greater(0),
        itemsPerPage: Joi.number()
            .integer()
            .greater(0),
        pagination: Joi.boolean(),
        questionUuid: Joi.string()
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

const validateGetQuestionOptionItemRequest = (data) => {
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
    validatePatchQuestionOptionItemRequest,
    validatePostQuestionOptionItemRequest,
    validateGetQuestionOptionCollectionRequest,
    validateGetQuestionOptionItemRequest
}