const statuses = require('../../../constants/statuses.json')
const productCollectionRouteValidator = require("../../../validations/v1/routeValidators/productCollectionRouteValidator")

const validator = async(req, res, next) => {
    
  let validatorResponse = null;
  const requestUrl = req.originalUrl
  
  if (req.method === 'POST') {
    if (requestUrl === '/api/v1/product_collections') {
      validatorResponse = await productCollectionRouteValidator.postProductCollectionItemRouteValidator(req)
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