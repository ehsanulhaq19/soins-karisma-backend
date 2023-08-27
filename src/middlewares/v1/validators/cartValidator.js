const httpStatus = require('http-status');
const cartRequest = require("../../../validations/v1/requestValidators/cartRequest")
const statuses = require('../../../constants/statuses.json')
const {CartStatus} = require("../../../models")
const {getUserActiveCart} = require("../../../repository/cartRepository")

const validator = async(req, res, next) => {
    
  const requestUrl = req.originalUrl
  
  if (req.method === 'PATCH') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const patchRequestUrl = "/api/v1/carts/:uuid"
    const patchRequestUri = patchRequestUrl.slice(0, patchRequestUrl.lastIndexOf('/'))
    
    if (requestUri === patchRequestUri) {
      const data = req.body
      //validate request data
      const validationResponse = cartRequest.validatePatchCartItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      const cartStatus = await CartStatus.findOne({
        where: {
          id: data.statusId
        }
      })
      
      if (!cartStatus) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{
          statusCode: httpStatus.BAD_REQUEST,
          message: "Invalid cart status value"
        } });
      }
    }
  } else if (req.method === 'POST') {
    if (requestUrl === '/api/v1/carts') {
      const data = req.body
      //validate request data
      const validationResponse = cartRequest.validatePostCartItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        } });
      }

      const cartStatus = await CartStatus.findOne({
        where: {
          id: data.statusId
        }
      })

      if (!cartStatus) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{
          statusCode: httpStatus.BAD_REQUEST,
          message: "Invalid cart status value"
        } });
      }

      const userActiveCart = await getUserActiveCart(req.user)
      if (userActiveCart) {
        return res.status(httpStatus.CONFLICT).json({ ...{
          statusCode: httpStatus.CONFLICT,
          message: "User already has an active cart"
        } });
      }

    }
  } else if(req.method === 'GET') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const getRequestUrl = "/api/v1/carts/:uuid"
    const getRequestUri = getRequestUrl.slice(0, getRequestUrl.lastIndexOf('/'))
    const data = req.query
    
    if (requestUri === getRequestUri) {
      //validate query data
      const validationResponse = cartRequest.validateGetCartItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
    } else if (req.baseUrl === '/api/v1/carts') {
      //validate query data
      const validationResponse = cartRequest.validateGetCartCollectionRequest(data)
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