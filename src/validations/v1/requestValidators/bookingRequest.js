const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')
const { DateTime, Interval } = require("luxon");

const validatePostBookingItemRequest = (data) => {
    const schema = Joi.object({
        bookerUuid: Joi.string().max(128),
        bookerEmail: Joi.string()
                .email({ minDomainSegments: 2 })
                .max(255),
        isEmailAlert: Joi.boolean(),
        bookerPhone: Joi.string().max(255),
        isSmsAlert: Joi.boolean(),
        startDateTime: Joi.date().iso()
            .required(),
        endDateTime: Joi.date().iso().greater(Joi.ref('startDateTime'))
            .required(),
        employeeUuid: Joi.string()
            .max(128)
            .required(),
        businessServiceUuid: Joi.string()
            .max(128)
            .required(),
        statusId: Joi.number()
            .integer(),
        note: Joi.string().max(4096)
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }

    const start = DateTime.fromISO(data.startDateTime)
    const end = DateTime.fromISO(data.endDateTime)
    const interval = Interval.fromDateTimes(start, end);
    const minimumBookingSlotDuration = 15
    if (interval.length("minutes") < minimumBookingSlotDuration) {
        return {
            type: statuses.ERROR,
            message: `Booking slot can not be less than ${minimumBookingSlotDuration} minutes`
        }
    }

    const currentDate = DateTime.now()
    if (currentDate > start) {
        return {
            type: statuses.ERROR,
            message: `Invalid booking slot`
        }
    }

    if (data.isSmsAlert && !data.bookerPhone) {
        return {
            type: statuses.ERROR,
            message: `Booker phone is required for sms alert`
        }
    }

    if (data.isEmailAlert && !data.bookerEmail) {
        return {
            type: statuses.ERROR,
            message: `Booker email is required for email alert`
        }
    }

    return {
        type: statuses.SUCCESS
    }
}

const validateGetBookingCollectionRequest = (data) => {
    const schema = Joi.object({
        salonUuid: Joi.string()
                .max(128),
        bookerUuid: Joi.string()
                .max(128),
        businessServiceUuid: Joi.string()
                .max(128),
        employeeUuid: Joi.string()
                .max(128),
        statusId: Joi.number()
                .integer()
                .max(4),
        fromDate: Joi.date(),
        toDate: Joi.date(),
        page: Joi.number()
            .integer()
            .greater(0),
        itemsPerPage: Joi.number()
            .integer()
            .greater(0),
        pagination: Joi.boolean(),
        orderBy: Joi.string().valid('ASC','DESC').max(10),
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }

    if (!data.salonUuid && !data.bookerUuid) {
        return {
            type: statuses.ERROR,
            message: "Provide either salonUuid or bookerUuid"
        }
    }

    if (data.fromDate && data.toDate) {
        const start = DateTime.fromISO(data.fromDate)
        const end = DateTime.fromISO(data.toDate)
        if (start > end) {
            return {
                type: statuses.ERROR,
                message: `Invalid date range`
            }
        }
    }

    return {
        type: statuses.SUCCESS
    }
}

const validatePatchBookingItemRequest = (data) => {
    const schema = Joi.object({
        statusId: Joi.number().integer()
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

const validatePostBookingCancelItemRequest = (data) => {
    const schema = Joi.object({
        description: Joi.string()
                        .max(1024)
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
    validatePostBookingItemRequest,
    validateGetBookingCollectionRequest,
    validatePatchBookingItemRequest,
    validatePostBookingCancelItemRequest
}