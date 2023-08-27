const statuses = require('../../../constants/statuses.json')
const userAnswerValidator = require("../../../validations/v1/routeValidators/userAnswerValidation")

const validator = async(req, res, next) => {
  let validatorResponse;
  const requestUrl = req.originalUrl
  if (req.method === 'POST') {
    if (requestUrl === '/api/v1/user_answers') {
      validatorResponse = await userAnswerValidator.postUserAnswerItemRouteValidator(req)
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