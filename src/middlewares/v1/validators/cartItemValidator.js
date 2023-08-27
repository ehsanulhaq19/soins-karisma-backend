const httpStatus = require('http-status');
const cartItemRequest = require("../../../validations/v1/requestValidators/cartItemRequest")
const statuses = require('../../../constants/statuses.json')
const {CartItemStatus, Product, Cart} = require("../../../models")
const {getOrCreateUserActiveCart} = require("../../../repository/cartRepository")
const uuidService = require("../../../services/uuidService")
const ProductStatus = require("../../../models/values/ProductStatus")
const CartStatusValue = require("../../../models/values/CartStatus")

const validator = async(req, res, next) => {
    
  const requestUrl = req.originalUrl
  
  if (req.method === 'PATCH') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const patchRequestUrl = "/api/v1/cart_items/:uuid"
    const patchRequestUri = patchRequestUrl.slice(0, patchRequestUrl.lastIndexOf('/'))
    
    if (requestUri === patchRequestUri) {
      const data = req.body
      //validate request data
      const validationResponse = cartItemRequest.validatePatchCartItemItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      if (data.statusId) {
        const cartItemStatus = await CartItemStatus.findOne({
          where: {
            id: data.statusId
          }
        })
        
        if (!cartItemStatus) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: "Invalid cart item status value"
          } });
        }
      }
    }
  } else if (req.method === 'POST') {
    if (requestUrl === '/api/v1/cart_items') {
      const data = req.body
      //validate request data
      const validationResponse = cartItemRequest.validatePostCartItemItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        } });
      }

      const cartItemStatus = await CartItemStatus.findOne({
        where: {
          id: data.statusId
        }
      })

      if (!cartItemStatus) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{
          statusCode: httpStatus.BAD_REQUEST,
          message: "Invalid cart item status value"
        } });
      }

      let cartProduct;
      try {
        cartProduct = await Product.findOne({
          where: {
            uuid: uuidService.decodeUuid(data.productUuid),
            statusId: ProductStatus.ACTIVE.id
          }
        })
      } catch (error) {}

      if (!cartProduct) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{
          statusCode: httpStatus.NOT_FOUND,
          message: "Product not found"
        } });
      }

      req.product = cartProduct
      
      if (data.cartUuid) {
        try {
          req.cart = await Cart.findOne({
            where: {
              uuid: uuidService.decodeUuid(data.cartUuid),
              statusId: CartStatusValue.ACTIVE.id
            }
          })

        } catch (error) {}
        
        if (!req.cart) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
            statusCode: httpStatus.NOT_FOUND,
            message: "Active cart not found"
          } });
        }
      } else {
        req.cart = await getOrCreateUserActiveCart(req.user)
      }
    }
  } else if(req.method === 'GET') {
    if (req.baseUrl === '/api/v1/cart_items') {
      const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
      const getRequestUrl = "/api/v1/cart_items/:uuid"
      const getRequestUri = getRequestUrl.slice(0, getRequestUrl.lastIndexOf('/'))
      
      if (requestUri !== getRequestUri) {
        const data = req.query
        //validate query data
        const validationResponse = cartItemRequest.validateGetCartItemCollectionRequest(data)
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
              uuid: uuidService.decodeUuid(data.cartUuid),
              statusId: CartStatusValue.ACTIVE.id
            }
          })
        } catch (error) {}

        if (!cart) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
            statusCode: httpStatus.NOT_FOUND,
            message: "Cart not found"
          } });
        }
      }
    }
  }

  next()
}

module.exports = validator;