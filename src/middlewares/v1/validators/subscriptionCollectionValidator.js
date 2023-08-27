const httpStatus = require("http-status");
const subscriptionCollectionRequest = require("../../../validations/v1/requestValidators/subscriptionCollectionRequest");
const statuses = require("../../../constants/statuses.json");
const { Subscription, SubscriptionDuration } = require("../../../models");
const { Op } = require("sequelize");
const {getUniqueArrayValues, isMatchingUrl} = require("../../../utils/utility")
const uuidService = require("../../../services/uuidService")
const SubscriptionStatusValues = require("../../../models/values/SubscriptionStatus")

const validator = async (req, res, next) => {
  const requestUrl = req.originalUrl;

  if (req.method === "POST") {
    if (requestUrl === "/api/v1/subscription_collections") {
        const data = req.body;
        //validate request data
        const validationResponse = subscriptionCollectionRequest.validatePostSubscriptionCollectionItemRequest(data);
        if (validationResponse.type === statuses.ERROR) {
            return res.status(httpStatus.BAD_REQUEST).json({
                ...{
                    statusCode: httpStatus.BAD_REQUEST,
                    message: validationResponse.message,
                },
            });
        }

        if (data.subscriptionUuids?.length) {
          const subscriptionsResponse = await getValidSubscriptions(data)
  
          if (subscriptionsResponse.type === statuses.ERROR) {
            const {statusCode, message} = subscriptionsResponse
            return res.status(statusCode).json({
              statusCode,
              message
            });
          }
  
          req.subscriptions = subscriptionsResponse.subscriptions
        }
    }
  } else if (req.method === "GET") {
    if (req.baseUrl === "/api/v1/subscription_collections") {
      const data = req.query;
      //validate query data
      const validationResponse = subscriptionCollectionRequest.validateGetSubscriptionCollectionCollectionRequest(data);
      if (validationResponse.type === statuses.ERROR) {
        return res.status(httpStatus.BAD_REQUEST).json({
          ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message,
          },
        });
      }
    }
  } else if (req.method === 'DELETE') {

    if (isMatchingUrl("/api/v1/subscription_collections/:uuid/subscriptions", req.originalUrl)) {
      const data = req.body
      //validate request data
      const validationResponse = subscriptionCollectionRequest.validateDeleteSubscriptionCollectionItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      if (data.subscriptionUuids?.length) {
        const subscriptionsResponse = await getValidSubscriptions(data)

        if (subscriptionsResponse.type === statuses.ERROR) {
          const {statusCode, message} = subscriptionsResponse
          return res.status(statusCode).json({
            statusCode,
            message
          });
        }

        const subscriptionIds = []
        subscriptionsResponse.subscriptions.forEach(subscription => {
          subscriptionIds.push(subscription.id)
        })
        req.subscriptionIds = subscriptionIds
      }
    }
  } else  if (req.method === "PATCH") {
    if (isMatchingUrl("/api/v1/subscription_collections/:uuid", req.originalUrl)) {
        const data = req.body;
        //validate request data
        const validationResponse = subscriptionCollectionRequest.validatePatchSubscriptionCollectionItemRequest(data);
        if (validationResponse.type === statuses.ERROR) {
            return res.status(httpStatus.BAD_REQUEST).json({
                ...{
                    statusCode: httpStatus.BAD_REQUEST,
                    message: validationResponse.message,
                },
            });
        }

        if (data.subscriptionUuids?.length) {
          const subscriptionsResponse = await getValidSubscriptions(data)
  
          if (subscriptionsResponse.type === statuses.ERROR) {
            const {statusCode, message} = subscriptionsResponse
            return res.status(statusCode).json({
              statusCode,
              message
            });
          }
  
          req.subscriptions = subscriptionsResponse.subscriptions
        }
    }
  } 

  next();
};

const getValidSubscriptions = async (data) => {
  const subscriptionUuids = getUniqueArrayValues(data.subscriptionUuids)
  const subscriptionDecodedUuids = []
  let subscriptions = []

  subscriptionUuids.forEach(subscriptionUuid => {
    try {
      subscriptionDecodedUuids.push(
        uuidService.decodeUuid(subscriptionUuid)
      )
    } catch (error) {}
  })

  try {
    //check subscriptions
    subscriptions = await Subscription.findAll({
      where: {
          uuid: {
            [Op.in]: subscriptionDecodedUuids
          },
          statusId: SubscriptionStatusValues.ACTIVE.id
      }
    })

    if (!subscriptions || !subscriptions?.length) {
        return {
          type: statuses.ERROR,
          statusCode: httpStatus.CONFLICT,
          message: "Subscriptions not exists"
        }
    }

  } catch (error) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Invalid subscriptionUuids are provided"
      }
  }

  return {
    type: statuses.SUCCESS,
    subscriptions
  }
}


module.exports = validator;
