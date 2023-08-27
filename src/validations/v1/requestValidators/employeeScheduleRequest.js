const Joi = require('joi');
const { DateTime } = require("luxon");
const statuses = require('../../../constants/statuses.json')

const validatePostEmployeeScheduleItemRequest = (data) => {
    const schema = Joi.object({
        startTime: Joi.string()
            .regex(new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/))
            .max(8)
            .error(new Error("startTime is not valid"))
            .required(),
        endTime: Joi.string()
            .regex(new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/))
            .max(8)
            .error(new Error("endTime is not valid"))
            .required(),
        employeeUuid: Joi.string()
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
    const startTimeObj = DateTime.fromISO(data.startTime);
    const endTimeObj = DateTime.fromISO(data.endTime);
    
    if (startTimeObj >= endTimeObj) {
        return {
            type: statuses.ERROR,
            message: "startTime should be less than endTime"
        }
    }

    return {
        type: statuses.SUCCESS
    }
}

const validateGetEmployeeScheduleCollectionRequest = (data) => {
    const schema = Joi.object({
        employeeUuid: Joi.string()
            .max(128)
            .required(),
        startDateTime: Joi.date().iso(),
        endDateTime: Joi.date().iso(),
        page: Joi.number()
            .integer()
            .greater(0),
        itemsPerPage: Joi.number()
            .integer()
            .greater(0),
        duration: Joi.number()
            .integer()
            .min(15)
            .max(60)
            .valid(15, 30, 45, 60),
        pagination: Joi.boolean()
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }

    if (data.startDateTime && data.endDateTime) {
        const startDateTimeObj = DateTime.fromISO(data.startDateTime);
        const endDateTimeObj = DateTime.fromISO(data.endDateTime);
        
        if (!startDateTimeObj.isValid) {
            return {
                type: statuses.ERROR,
                message: "startDateTime is not valid"
            }
        } else if (!endDateTimeObj.isValid) {
            return {
                type: statuses.ERROR,
                message: "endDateTime is not valid"
            }
        } else if (startDateTimeObj >= endDateTimeObj) {
            return {
                type: statuses.ERROR,
                message: "startDateTime should be less than endDateTime"
            }
        }
    }

    return {
        type: statuses.SUCCESS
    }
}

module.exports = {
    validatePostEmployeeScheduleItemRequest,
    validateGetEmployeeScheduleCollectionRequest
}