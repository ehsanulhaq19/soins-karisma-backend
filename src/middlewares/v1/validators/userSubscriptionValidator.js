const httpStatus = require('http-status');
const statuses = require('../../../constants/statuses.json')
const {User, Subscription, UserSubscription} = require("../../../models")
const uuidService = require("../../../services/uuidService")
const userSubscriptionRequest = require("../../../validations/v1/requestValidators/userSubscriptionRequest")
const {isMatchingUrl} = require("../../../utils/utility")

const validator = async(req, res, next) => {
    
    if(req.method === 'POST') {
        let validatorResponse = null
        const requestUrl = req.originalUrl

        if (requestUrl === "/api/v1/user_subscriptions") {
            validatorResponse = await postUserSubscriptionItemValidation(req)
        } else if (isMatchingUrl("/api/v1/user_subscriptions/charge/success", requestUrl)) {
            validatorResponse = await postUserSubscriptionItemValidation(req)
        }
        
        if (validatorResponse) {
            if (validatorResponse.type === statuses.ERROR) {
                delete validatorResponse["type"]
                return res.status(validatorResponse.statusCode).json(validatorResponse);
            }
          } 
    } else if(req.method === 'GET') {
        const requestUrl = req.originalUrl
        if (isMatchingUrl("/api/v1/user_subscriptions", requestUrl)) {
            const data = req.query;
            //validate request data
            const validationResponse = userSubscriptionRequest.validateGetSubscriptionCollectionRequest(data);
            if (validationResponse.type === statuses.ERROR) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    ...{
                        statusCode: httpStatus.BAD_REQUEST,
                        message: validationResponse.message,
                    },
                });
            }
    
            //check subscription
            let subscription
            try {
                subscription = await Subscription.findOne({
                    where: {
                        uuid: uuidService.decodeUuid(data.subscriptionUuid)
                    }
                })
            } catch (error) {}
    
            if (!subscription) {
                return res.status(httpStatus.NOT_FOUND).json({ ...{
                    statusCode: httpStatus.NOT_FOUND,
                    message: "Subscription not found"
                } });
            }

            req.subscription = subscription
        }
    }
  next()
}


const postUserSubscriptionItemValidation = async (req) => {
    const data = req.body;
    //validate request data
    const validationResponse = userSubscriptionRequest.validatePostUserSubscriptionItemRequest(data);
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message,
        }
    }

    //check subscription
    let subscription
    try {
        subscription = await Subscription.findOne({
            where: {
                uuid: uuidService.decodeUuid(data.subscriptionUuid)
            }
        })
    } catch (error) {}

    if (!subscription) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.NOT_FOUND,
            message: "Subscription not found"
        };
    }

    //check user
    let user
    try {
        user = await User.findOne({
            where: {
                uuid: uuidService.decodeUuid(data.userUuid)
            }
        })
    } catch (error) {}

    if (!user) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.NOT_FOUND,
            message: "User not found"
        };
    }

    //check user subscriptions
    let userSubscription
    try {
        userSubscription = await UserSubscription.findOne({
            where: {
                userId: user.id,
                subscriptionId: subscription.id
            }
        })
    } catch (error) {}

    if (userSubscription) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.CONFLICT,
            message: "UserSubscription already exists"
        };
    }

    req.subscription = subscription
    req.user = user

    return {
        type: statuses.SUCCESS
    }
}

module.exports = validator;