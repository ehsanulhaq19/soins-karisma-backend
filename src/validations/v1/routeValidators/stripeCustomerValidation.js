const httpStatus = require('http-status');
const stripeCustomerRequest = require("../requestValidators/stripeCustomerRequest")
const {User, StripeCustomer} = require("../../../models")
const statuses = require('../../../constants/statuses.json')
const uuidService = require("../../../services/uuidService")

const getStripeCustomerPaymentMehtodItemRouteValidator = async(req) => {
    const data = req.query
    
    //validate request data
    const validationResponse = stripeCustomerRequest.validateGetStripeCustomerPaymentMethodItemRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    let queryUser
    try{
        const userUuid = uuidService.decodeUuid(data.userUuid)
        queryUser = await User.findOne({
            where: {
                uuid: userUuid
            },
            include: [
                {
                    model: StripeCustomer
                }
            ]
        })
    } catch(error) {}
    
    if (!queryUser) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.NOT_FOUND,
            message: "User not found"
        }
    }

    if (!queryUser.StripeCustomer) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.CONFLICT,
            message: "User is not linked with stripe"
        }
    }

    req.queryUser = queryUser

    return {
        type: statuses.SUCCESS
    }
}

module.exports = {
    getStripeCustomerPaymentMehtodItemRouteValidator
}