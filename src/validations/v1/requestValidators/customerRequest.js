const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')


const validateGetCustomerCollectionRequest = (data) => {
    const schema = Joi.object({
        page: Joi.number()
            .integer()
            .greater(0),
        itemsPerPage: Joi.number()
            .integer()
            .greater(0),
        pagination: Joi.boolean(),
        name: Joi.string().max(100),
        orderBy: Joi.string().valid('ASC','DESC').max(10),
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
    validateGetCustomerCollectionRequest
}