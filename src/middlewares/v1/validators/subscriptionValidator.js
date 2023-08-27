const httpStatus = require("http-status");
const subscriptionRequest = require("../../../validations/v1/requestValidators/subscriptionRequest");
const statuses = require("../../../constants/statuses.json");
const { Subscription, SubscriptionDuration } = require("../../../models");
const { Op } = require("sequelize");

const validator = async (req, res, next) => {
  const requestUrl = req.originalUrl;

  if (req.method === "POST") {
    if (requestUrl === "/api/v1/subscriptions") {
        const data = req.body;
        //validate request data
        const validationResponse = subscriptionRequest.validatePostSubscriptionItemRequest(data);
        if (validationResponse.type === statuses.ERROR) {
            return res.status(httpStatus.BAD_REQUEST).json({
                ...{
                    statusCode: httpStatus.BAD_REQUEST,
                    message: validationResponse.message,
                },
            });
        }

        //check subscription
        const subscription = await Subscription.findOne({
            where: {
                name: {
                    [Op.iLike]: data.name
                }
            }
        })

        if (subscription) {
            return res.status(httpStatus.CONFLICT).json({ ...{
                statusCode: httpStatus.CONFLICT,
                message: "Subscription already exists"
            } });
        }

        //check subscription duration
        const subscriptionDuration = await SubscriptionDuration.findOne({
            where: {
                name: {
                    [Op.iLike]: data.duration
                }
            }
        })

        if (!subscriptionDuration) {
            return res.status(httpStatus.NOT_FOUND).json({ ...{
                statusCode: httpStatus.NOT_FOUND,
                message: "Subscription duration not found"
            } });
        }

        req.subscriptionDuration = subscriptionDuration
    }
  } else if (req.method === "GET") {
    if (req.baseUrl === "/api/v1/subscriptions") {
      const data = req.query;
      //validate query data
      const validationResponse = subscriptionRequest.validateGetSubscriptionCollectionRequest(data);
      if (validationResponse.type === statuses.ERROR) {
        return res.status(httpStatus.BAD_REQUEST).json({
          ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message,
          },
        });
      }
    }
  }

  next();
};

module.exports = validator;
