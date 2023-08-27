const httpStatus = require('http-status');
const businessServiceRequest = require("../../../validations/v1/requestValidators/businessServiceRequest")
const statuses = require('../../../constants/statuses.json')
const { BusinessService, Salon } = require('../../../models');
const uuidService = require("../../../services/uuidService")

const validator = async(req, res, next) => {
    
  const requestUrl = req.originalUrl
  if(req.method === 'POST') {
    if (requestUrl === '/api/v1/business_services') {
      const data = req.body
      //validate query data
      const validationResponse = businessServiceRequest.validatePostBusinessServiceItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
      
      if (data.salonUuid) {
        const decodedUuid = uuidService.decodeUuid(data.salonUuid)
        let salon;
        try{
          salon = await Salon.findOne({
            where: {
              uuid: decodedUuid
            }
          })
        } catch(error){}
        
        if (!salon) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "Salon not found"
          } });
        }
      }
    }
  }

  else if (req.method === 'GET') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const getRequestUrl = "/api/v1/business_services/:uuid"
    const getRequestUri = getRequestUrl.slice(0, getRequestUrl.lastIndexOf('/'))
    
    if (requestUri === getRequestUri) {
      const data = req.body
      //validate request data
      const validationResponse = businessServiceRequest.validateGetBusinessServiceItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
    } else if (req.baseUrl === '/api/v1/business_services') {
      const data = req.query
      //validate query data
      const validationResponse = businessServiceRequest.validateGetBusinessServiceCollectionRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
      
      if (data.salonUuid) {
        const decodedUuid = uuidService.decodeUuid(data.salonUuid)
        let salon;
        try{
          salon = await Salon.findOne({
            where: {
              uuid: decodedUuid
            }
          })
        } catch(error){}
        
        if (!salon) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "Salon not found"
          } });
        }
      }
    }
  }

  next()
}

module.exports = validator;