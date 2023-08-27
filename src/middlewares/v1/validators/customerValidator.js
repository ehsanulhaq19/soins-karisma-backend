const httpStatus = require('http-status');
const customerRequest = require("../../../validations/v1/requestValidators/customerRequest")
const statuses = require('../../../constants/statuses.json')

const validator = async(req, res, next) => {
  
  if(req.method === 'GET') {
    if (req.baseUrl === '/api/v1/customers') {
      const data = req.query
      //validate query data
      const validationResponse = customerRequest.validateGetCustomerCollectionRequest(data)
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