const httpStatus = require('http-status');
const productRequest = require("../../../validations/v1/requestValidators/productRequest")
const statuses = require('../../../constants/statuses.json')
const {ProductStatus} = require("../../../models")

const validator = async(req, res, next) => {
    
  const requestUrl = req.originalUrl
  
  if (req.method === 'PATCH') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const patchRequestUrl = "/api/v1/products/:uuid"
    const patchRequestUri = patchRequestUrl.slice(0, patchRequestUrl.lastIndexOf('/'))
    
    if (requestUri === patchRequestUri) {
      const data = req.body
      //validate request data
      const validationResponse = productRequest.validatePatchProductItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      if (data.statusId) {
        const productStatus = await ProductStatus.findOne({
          where: {
            id: data.statusId
          }
        })
        
        if (!productStatus) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: "Invalid product status value"
          } });
        }
      }
    }
  } else if (req.method === 'POST') {
    if (requestUrl === '/api/v1/products') {
      const data = req.body
      //validate request data
      const validationResponse = productRequest.validatePostProductItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        } });
      }

      if (data.statusId) {
        const productStatus = await ProductStatus.findOne({
          where: {
            id: data.statusId
          }
        })
  
        if (!productStatus) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: "Invalid product status value"
          } });
        }
      }
    }
  } else if(req.method === 'GET') {
    if (req.baseUrl === '/api/v1/products') {
      const data = req.query
      //validate query data
      const validationResponse = productRequest.validateGetProductCollectionRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
    }
  }

  next()
}

module.exports = validator;