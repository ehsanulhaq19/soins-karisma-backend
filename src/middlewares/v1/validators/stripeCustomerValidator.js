const statuses = require('../../../constants/statuses.json')
const stripeCustomerValidator = require("../../../validations/v1/routeValidators/stripeCustomerValidation")
const {isMatchingUrl} = require("../../../utils/utility")

const validator = async(req, res, next) => {
  let validatorResponse;
  const requestUrl = req.originalUrl
  if (req.method === 'GET') {
    if (isMatchingUrl("/api/v1/stripe_customer/payment_methods", requestUrl)) {
      validatorResponse = await stripeCustomerValidator.getStripeCustomerPaymentMehtodItemRouteValidator(req)
    }
  }
  
  if (validatorResponse) {
    if (validatorResponse.type === statuses.ERROR) {
      delete validatorResponse["type"]
      return res.status(validatorResponse.statusCode).json(validatorResponse);
    }
  } 

  next()
}

module.exports = validator;