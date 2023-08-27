const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validatePostBusinessServiceEmployeeItemRequest = (data) => {
    const schema = Joi.object({
        businessServiceUuid: Joi.string()
            .max(128)
            .required(),
        employeeUuid: Joi.string()
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

const validateGetBusinessServiceEmployeeCollectionRequest = (data) => {
    const schema = Joi.object({
        businessServiceUuid: Joi.string()
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
    validatePostBusinessServiceEmployeeItemRequest,
    validateGetBusinessServiceEmployeeCollectionRequest
}