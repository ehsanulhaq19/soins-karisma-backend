const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validateGetOrderCollectionRequest = (data) => {
    const schema = Joi.object({
        groups: Joi.string()
                .max(512)
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
    validateGetOrderCollectionRequest
}