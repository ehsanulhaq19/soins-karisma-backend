const httpStatus = require('http-status');
const orderRequest = require("../../../validations/v1/requestValidators/orderRequest")
const statuses = require('../../../constants/statuses.json')

const validator = async(req, res, next) => {
    
  const requestUrl = req.originalUrl
  
  if(req.method === 'GET') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const getRequestUrl = "/api/v1/orders/:uuid"
    const getRequestUri = getRequestUrl.slice(0, getRequestUrl.lastIndexOf('/'))
    const data = req.query
    
    if (requestUri === getRequestUri) {
      //order get item api validation
    }
  } else if (req.method === 'POST') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const getRequestUrl = "/api/v1/orders/:uuid/charge/success"
    const getRequestUri = getRequestUrl.slice(0, getRequestUrl.lastIndexOf('/'))
    
    if (requestUri === getRequestUri) {
      console.log("--------------------")
      //order post charge success item api validation
    }
  } 

  next()
}

module.exports = validator;