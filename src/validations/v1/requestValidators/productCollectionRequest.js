const Joi = require('joi');
const statuses = require('../../../constants/statuses.json')

const validatePostProductCollectionItemRequest = (data) => {
    const schema = Joi.object({
        name: Joi.string()
                .max(255).required(),
        description: Joi.string()
                .max(4096).required(),
        price: Joi.number().required(),
        backgroundColor: Joi.string()
                .max(50).required(),
        products: Joi.array().min(1).items(Joi.object({
            productUuid: Joi.string()
                    .max(128)
                    .required(),
            productQuantity: Joi.number().min(1).required(),
        })).required(),
        benefits: Joi.array().items(
            Joi.object({
                label: Joi.string()
                    .max(255),
                icon: Joi.string()
                    .max(50),
                content: Joi.string()
                    .max(2048)
                    .required(),
            }),
        ),
        ingredients: Joi.array().items(
            Joi.object({
                label: Joi.string()
                    .max(255),
                icon: Joi.string()
                    .max(50),
                content: Joi.string()
                    .max(2048)
                    .required(),
            }),
        ),
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
    validatePostProductCollectionItemRequest,
}