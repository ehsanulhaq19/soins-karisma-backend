const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validateCreateReviewRequest = (data) => {
    const schema = Joi.object({
        rating: Joi.number()
                .integer()
                .min(1)
                .max(5)
                .required(),
        text: Joi.string()
                .regex(/<script>/, { invert: true })
                .max(4096)
                .required()
    })

    const {error, value} = schema.validate(data);
    
    if (error && error.message) {
        return {
            type: statuses.ERROR,
            message: error.message
        }
    }
}

module.exports = {
    validateCreateReviewRequest
}