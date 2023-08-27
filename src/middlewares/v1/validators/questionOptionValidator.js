
const statuses = require('../../../constants/statuses.json')
const questionOptionValidator = require("../../../validations/v1/routeValidators/questionOptionValidation")

const validator = async(req, res, next) => {
  let validatorResponse;
  const requestUrl = req.originalUrl
  
  if (req.method === 'PATCH') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const patchRequestUrl = "/api/v1/question_options/:uuid"
    const patchRequestUri = patchRequestUrl.slice(0, patchRequestUrl.lastIndexOf('/'))
    
    if (requestUri === patchRequestUri) {
      validatorResponse = await questionOptionValidator.patchQuestionOptionItemRouteValidator(req)
    }
  } else if (req.method === 'POST') {
    if (requestUrl === '/api/v1/question_options') {
      validatorResponse = await questionOptionValidator.postQuestionOptionItemRouteValidator(req)
    }
  } else if(req.method === 'GET') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const getRequestUrl = "/api/v1/question_options/:uuid"
    const getRequestUri = getRequestUrl.slice(0, getRequestUrl.lastIndexOf('/'))
    
    if (requestUri === getRequestUri) {
      validatorResponse = await questionOptionValidator.getQuestionOptionItemRouteValidator(req)
    } else if (req.baseUrl === '/api/v1/question_options') {
      validatorResponse = await questionOptionValidator.getQuestionOptionCollectionRouteValidator(req)
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