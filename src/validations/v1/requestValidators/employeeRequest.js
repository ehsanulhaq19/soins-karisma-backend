const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')


const validateGetEmployeeCollectionRequest = (data) => {
    const schema = Joi.object({
        salonUuid: Joi.string()
                .max(128),
        businessServiceUuid: Joi.string()
                .max(128),
        page: Joi.number()
            .integer()
            .greater(0),
        itemsPerPage: Joi.number()
            .integer()
            .greater(0),
        pagination: Joi.boolean(),
        name: Joi.string().max(100),
        orderBy: Joi.string().valid('ASC','DESC').max(10),
        isActive: Joi.boolean(),
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

const validateAssignEmployeeRoleRequest = (data) => {
    const schema = Joi.object({
        employeeUuid: Joi.string()
            .max(128)
            .required(),
        roleUuid: Joi.number()
            .integer()
            .greater(0)
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

const validatePatchEmployeeItemRequest = (data) => {
    const schema = Joi.object({
        statusId: Joi.number().integer(),
        gender: Joi.string().valid('M', 'F', 'O').max(1),
        profileImage: Joi.string().max(500),
        calendarColor: Joi.string().max(50)
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
    validateGetEmployeeCollectionRequest,
    validateAssignEmployeeRoleRequest,
    validatePatchEmployeeItemRequest
}