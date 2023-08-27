const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validatePostNoteRequest = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .max(128)
            .required(),
        description: Joi.string()
            .max(1024)
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

module.exports = {
    validatePostNoteRequest
}