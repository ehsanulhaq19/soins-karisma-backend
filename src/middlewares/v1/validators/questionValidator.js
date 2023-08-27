const statuses = require('../../../constants/statuses.json')
const questionValidator = require("../../../validations/v1/routeValidators/questionValidation")

const validator = async(req, res, next) => {
  let validatorResponse;
  const requestUrl = req.originalUrl
  
  if (req.method === 'PATCH') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const patchRequestUrl = "/api/v1/questions/:uuid"
    const patchRequestUri = patchRequestUrl.slice(0, patchRequestUrl.lastIndexOf('/'))
    
    if (requestUri === patchRequestUri) {
      validatorResponse = await questionValidator.patchQuestionItemRouteValidator(req)
    }
  } else if (req.method === 'POST') {
    if (requestUrl === '/api/v1/questions') {
      validatorResponse = await questionValidator.postQuestionItemRouteValidator(req)
    }
  } else if(req.method === 'GET') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const getRequestUrl = "/api/v1/carts/:uuid"
    const getRequestUri = getRequestUrl.slice(0, getRequestUrl.lastIndexOf('/'))
    
    if (requestUri === getRequestUri) {
      validatorResponse = await questionValidator.getQuestionItemRouteValidator(req)
    } else if (req.baseUrl === '/api/v1/questions') {
      validatorResponse = await questionValidator.getQuestionCollectionRouteValidator(req)
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