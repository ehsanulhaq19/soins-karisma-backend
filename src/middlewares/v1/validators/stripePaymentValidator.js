const httpStatus = require('http-status');
const Sequelize = require("sequelize");
const { Subscription, UserSubscription, Cart, CartItem, Product, 
  StripeSubscriptionProduct, SubscriptionStatus, SubscriptionDuration, Review,
  StripeSubscriptionPrice, Order
} = require('../../../models');
const UserSubscriptionStatus = require('../../../models/values/UserSubscriptionStatus');
const SubscriptionStatusValues = require("../../../models/values/SubscriptionStatus")
const CartStatus = require("../../../models/values/CartStatus")
const OrderStatusValues = require('../../../models/values/OrderStatus');
const stripePaymentRequest = require("../../../validations/v1/requestValidators/stripePaymentRequest")
const statuses = require('../../../constants/statuses.json')
const uuidService = require("../../../services/uuidService")

const validator = async(req, res, next) => {
    
  const requestUrl = req.originalUrl
  if(req.method === 'POST') {
    const data = req.body
    if (requestUrl === '/api/v1/stripe/subscription/checkout') {
      //validate query data
      const validationResponse = stripePaymentRequest.createSubscriptionPaymentRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      const subscriptionValidationResponse = await subscriptionValidation(req)
      if (subscriptionValidationResponse.type === statuses.ERROR) {
        const {statusCode: subStatus, message: subMessage} = subscriptionValidationResponse
        return res.status(subStatus).json({
              statusCode: subStatus,
              message: subMessage
          });
      }
    } 
    else if (requestUrl === '/api/v1/stripe/subscription/checkout_session') {
      const subscriptionValidationResponse = await subscriptionValidation(req)
      if (subscriptionValidationResponse.type === statuses.ERROR) {
        const {statusCode: subStatus, message: subMessage} = subscriptionValidationResponse
        return res.status(subStatus).json({
              statusCode: subStatus,
              message: subMessage
          });
      }
    }
    else if (requestUrl === '/api/v1/stripe/subscription/payment_intent') {
      //validate query data
      const validationResponse = stripePaymentRequest.createSubscriptionPaymentIntentRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      const subscriptionValidationResponse = await subscriptionValidation(req)
      if (subscriptionValidationResponse.type === statuses.ERROR) {
        const {statusCode: subStatus, message: subMessage} = subscriptionValidationResponse
        return res.status(subStatus).json({
              statusCode: subStatus,
              message: subMessage
          });
      }
    }
    else if (requestUrl === '/api/v1/stripe/subscription/charge') {
      //validate query data
      const validationResponse = stripePaymentRequest.createSubscriptionChargeRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      const subscriptionValidationResponse = await subscriptionValidation(req)
      if (subscriptionValidationResponse.type === statuses.ERROR) {
        const {statusCode: subStatus, message: subMessage} = subscriptionValidationResponse
        return res.status(subStatus).json({
              statusCode: subStatus,
              message: subMessage
          });
      }
    }
    else if (requestUrl === '/api/v1/stripe/order/payment_intent') {
      //validate query data
      const validationResponse = stripePaymentRequest.createOrderPaymentIntentRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      let cart;

      try {
        cart = await Cart.findOne({
          where: {
            uuid: uuidService.decodeUuid(data.cartUuid)
          },
          include: [
            {
              model: CartItem,
              include: [
                {
                  model: Product
                }
              ]
            }
          ]
        })
      } catch (error) {}

      if (!cart) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{
          statusCode: httpStatus.NOT_FOUND,
          message: "Cart not found"
        } });
      }

      if (cart.statusId != CartStatus.ACTIVE.id) {
        return res.status(httpStatus.CONFLICT).json({ ...{
          statusCode: httpStatus.CONFLICT,
          message: "Cart is disabled"
        } });
      }

      req.cart = cart
    }
    else if (requestUrl === '/api/v1/stripe/order/checkout') {

    } 
    else if (requestUrl === '/api/v1/stripe/order/charge') {
      //validate query data
      const validationResponse = stripePaymentRequest.createOrderChargeRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      let order;

      try {
        order = await Order.findOne({
          include: [
            {
              model: Cart,
              include: [
                {
                  model: CartItem,
                  include: [
                    {
                      model: Product
                    }
                  ]
                }
              ]
            }
          ],
          where: {
            uuid: uuidService.decodeUuid(data.orderUuid),
            statusId: {
              [Sequelize.Op.not]: OrderStatusValues.COMPLETE.id
            }
          }
        })
      } catch (error) {}

      if (!order) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{
          statusCode: httpStatus.NOT_FOUND,
          message: "Order not found"
        } });
      }

      req.order = order
      req.cart = order.Cart
    }
    else if (requestUrl === '/api/v1/stripe/subscription/payment_sheet') {
      //validate query data
      const validationResponse = stripePaymentRequest.createSubscriptionPaymentSheetRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      const subscriptionValidationResponse = await subscriptionValidation(req)
      if (subscriptionValidationResponse.type === statuses.ERROR) {
        const {statusCode: subStatus, message: subMessage} = subscriptionValidationResponse
        return res.status(subStatus).json({
              statusCode: subStatus,
              message: subMessage
          });
      }
    }
  }

  next()
}

const subscriptionValidation = async(req) => {
  const data = req.body
  let subscription;

  try {
    subscription = await Subscription.findOne({
      where: {
        uuid: uuidService.decodeUuid(data.subscriptionUuid)
      },
      include: [
        {
          model: StripeSubscriptionPrice
        },
        {
          model: StripeSubscriptionProduct
        },
        {
          model: SubscriptionStatus,
        },
        {
          model: SubscriptionDuration,
        },
        {
          model: Review
        }
      ]
    })
  } catch (error) {}

  if (!subscription) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.NOT_FOUND,
      message: "Subscription not found"
    }
  }

  if (subscription.statusId != SubscriptionStatusValues.ACTIVE.id) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.CONFLICT,
      message: "Subscription is disabled"
    }
  }

  const user = req.user

  if (!user) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.CONFLICT,
      message: "Invalid auth user"
    }
  }

  // const userSubscription = await UserSubscription.findOne({
  //   where: {
  //     userId: user.id,
  //     subscriptionId: subscription.id,
  //     statusId: UserSubscriptionStatus.ACTIVE.id
  //   }
  // })

  // if (userSubscription) {
  //   return {
  //     type: statuses.ERROR,
  //     statusCode: httpStatus.CONFLICT,
  //     message: "User is already subscribed to this subscription"
  //   }
  // }

  req.subscription = subscription

  return {
    type: statuses.SUCCESS
  }
}

module.exports = validator;