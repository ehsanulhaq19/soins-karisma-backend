const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')


const validatePostUserAnswerItemRequest = (data) => {
    const schema = Joi.object({
        questionUuid: Joi.string()
                .max(128)
                .required(),
        questionOptionUuid: Joi.string()
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


module.exports = {
    validatePostUserAnswerItemRequest
}