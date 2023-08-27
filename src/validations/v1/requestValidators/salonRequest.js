const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')
const {getDayList} = require("../../../utils/utility")
const { DateTime } = require("luxon");

const daysList = getDayList()

const validatePatchSalonItemRequest = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(255),
        lastName: Joi.string().max(255),
        mobilePhone: Joi.string().max(255),
        phone: Joi.string().max(255),
        otherEmail: Joi.string().max(255),
        noOfSalons: Joi.number().integer(),
        noOfChairs: Joi.number().integer(),
        noOfEmployees: Joi.number().integer(),
        describeSalon: Joi.string().max(255),
        servicesProvide: Joi.string().max(255),
        approxMonthlyRevenue: Joi.string().max(255),
        subdomain: Joi.string()
            .regex(new RegExp(/^\w+$/))
            .max(255)
            .error(new Error("subdomain is not valid")),
        rating: Joi.number().min(1).max(5),
        ownerReview: Joi.string()
            .max(2048),
        fromTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5][0-9])$/),
        toTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5][0-9])$/),
        fromDay: Joi.string().max(20).valid(...daysList),
        toDay: Joi.string().max(20).valid(...daysList),
        profileImage: Joi.string().max(500),
        address: Joi.object({
            firstName: Joi.string().max(255),
            lastName: Joi.string().max(255),
            address: Joi.string().max(255),
            country: Joi.string().max(255),
            state: Joi.string().max(255),
            city: Joi.string().max(255),
            postCode: Joi.string().max(255),
            phoneNumber: Joi.string().max(255),
            latitude: Joi.number(),
            longitude: Joi.number(),
        }),
        imageUuids: Joi.array().items(
            Joi.string().max(255)
        ),
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

const validatePostSalonItemRequest = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .max(255)
            .required(),
        name: Joi.string().max(255).required(),
        lastName: Joi.string().max(255).required(),
        mobilePhone: Joi.string().max(255),
        phone: Joi.string().max(255),
        otherEmail: Joi.string().max(255),
        noOfSalons: Joi.number().integer(),
        noOfChairs: Joi.number().integer(),
        noOfEmployees: Joi.number().integer(),
        describeSalon: Joi.string().max(255),
        servicesProvide: Joi.string().max(255),
        approxMonthlyRevenue: Joi.string().max(255),
        subdomain: Joi.string().regex(new RegExp(/^\w+$/)).max(255).error(new Error("subdomain is not valid")),
        rating: Joi.number().min(1).max(5),
        ownerReview: Joi.string()
                .max(2048),
        fromTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5][0-9])$/),
        toTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5][0-9])$/),
        fromDay: Joi.string().max(20).valid(...daysList),
        toDay: Joi.string().max(20).valid(...daysList),
        address: Joi.object({
            firstName: Joi.string().max(255),
            lastName: Joi.string().max(255),
            address: Joi.string().max(255),
            country: Joi.string().max(255),
            state: Joi.string().max(255),
            city: Joi.string().max(255),
            postCode: Joi.string().max(255),
            phoneNumber: Joi.string().max(255),
            latitude: Joi.number(),
            longitude: Joi.number(),
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

const validateGetSalonCollectionRequest = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .max(255),
        page: Joi.number()
            .integer()
            .greater(0),
        itemsPerPage: Joi.number()
            .integer()
            .greater(0),
        pagination: Joi.boolean(),
        groups: Joi.string()
                .max(512)
                .min(0),
        orderBy: Joi.string().
            max(4).min(3),
        search: Joi.string().
            max(255).min(0),
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

const validateGetSalonLocationCollectionRequest = (data) => {
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

const validateGetSalonCustomerCollectionRequest = (data) => {
    const schema = Joi.object({
        page: Joi.number()
            .integer()
            .greater(0),
        itemsPerPage: Joi.number()
            .integer()
            .greater(0),
        pagination: Joi.boolean(),
        customerName: Joi.string().max(100),
        orderBy: Joi.string().max(20),
        groups: Joi.string()
            .max(512)
            .min(0),
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }

    if (data.orderBy) {
        const orderBy = ['ASC', 'DESC']
        const validFields = ['id', 'statusId']
        const orderByArray = data.orderBy.split(",")
        if (
            orderByArray.length === 1 && !orderBy.includes(orderByArray[0]) ||
            orderByArray.length === 2 && !orderBy.includes(orderByArray[1])
        ) {
            return {
                type: statuses.ERROR,
                message: `Only [${orderBy.join(', ')}] order by are allowed`
            }
        } else if (
            orderByArray.length === 2 && !validFields.includes(orderByArray[0])
        ) {
            return {
                type: statuses.ERROR,
                message: `Only [${validFields.join(', ')}] order by are allowed`
            }
        } else if (orderByArray.length > 2) {
            return {
                type: statuses.ERROR,
                message: "Invalid order by clause"
            }
        }
    }

    return {
        type: statuses.SUCCESS
    }
}

const validateDeleteSalonCollectionRequest = (data) => {
    const schema = Joi.object({
        imageUuids: Joi.array().items(
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

const validateGetSalonStatsRequest = (data) => {
    const schema = Joi.object({
        fromDate: Joi.date(),
        toDate: Joi.date()
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
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

module.exports = {
    validatePatchSalonItemRequest,
    validatePostSalonItemRequest,
    validateGetSalonCollectionRequest,
    validateGetSalonLocationCollectionRequest,
    validateGetSalonCustomerCollectionRequest,
    validateDeleteSalonCollectionRequest,
    validateGetSalonStatsRequest
}