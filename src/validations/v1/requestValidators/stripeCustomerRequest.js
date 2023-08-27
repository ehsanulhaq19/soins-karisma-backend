const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')


const validateGetStripeCustomerPaymentMethodItemRequest = (data) => {
    const schema = Joi.object({
        userUuid: Joi.string()
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
    validateGetStripeCustomerPaymentMethodItemRequest
}