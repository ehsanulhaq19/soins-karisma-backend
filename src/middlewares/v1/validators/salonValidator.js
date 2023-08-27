const httpStatus = require('http-status');
const salonRequest = require("../../../validations/v1/requestValidators/salonRequest")
const statuses = require('../../../constants/statuses.json')
const { Salon, MediaFile, SalonStatus } = require('../../../models');
const { Op } = require("sequelize");
const uuidService = require("../../../services/uuidService")
const {isMatchingUrl} = require("../../../utils/utility")

const validator = async(req, res, next) => {
    
  const requestUrl = req.originalUrl
  
  if (req.method === 'PATCH') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const patchRequestUrl = "/api/v1/salons/:uuid"
    const patchRequestUri = patchRequestUrl.slice(0, patchRequestUrl.lastIndexOf('/'))
    
    if (requestUri === patchRequestUri) {
      const data = req.body
      //validate request data
      const validationResponse = salonRequest.validatePatchSalonItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      if (data.imageUuids?.length) {
        const mediaFiles = []
        data.imageUuids.forEach(async(imageUuid) => {
          let mediaFile;

          try {
            mediaFile = await MediaFile.findOne({
              where: {
                uuid: uuidService.decodeUuid(imageUuid)
              }
            })
          } catch (error) {}

          mediaFiles.push(mediaFile)
        })
        
        req.mediaFiles = mediaFiles
      }

      if (data.statusId) {
        const salonStatus = await SalonStatus.findOne({
          where: {
            id: data.statusId
          }
        })
        
        if (!salonStatus) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: "Invalid salon status value"
          } });
        }
      }
    }
  } else if (req.method === 'POST') {
    if (requestUrl === '/api/v1/salons') {
      const data = req.body
      //validate request data
      const validationResponse = salonRequest.validatePostSalonItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        } });
      }

      //check salon
      const salon = await Salon.findOne({
          where: {
            email: data.email
          }
      })

      if (salon) {
        return res.status(httpStatus.CONFLICT).json({ ...{
          statusCode: httpStatus.CONFLICT,
          message: "Salon already exists"
        } });
      }

      //check subdomain
      const salonSubdomain = await Salon.findOne({
          where: {
            subdomain: data.subdomain
          }
      })

      if (salonSubdomain) {
        return res.status(httpStatus.CONFLICT).json({ ...{
          statusCode: httpStatus.CONFLICT,
          message: "Salon subdomain already exists"
        } });
      }
    }
  } else if(req.method === 'GET') {
    
    if (isMatchingUrl("/api/v1/salons/{uuid}/customers", req.originalUrl)) {
      const data = req.query
      //validate query data
      const validationResponse = salonRequest.validateGetSalonCustomerCollectionRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
    } else if (isMatchingUrl("/api/v1/salons/locations", req.originalUrl)) {
      const data = req.query
      //validate query data
      const validationResponse = salonRequest.validateGetSalonLocationCollectionRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
    } else if (isMatchingUrl("/api/v1/salons/:uuid/stats", req.originalUrl)) {
      const data = req.query
      //validate query data
      const validationResponse = salonRequest.validateGetSalonStatsRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
    } else if (req.baseUrl === '/api/v1/salons') {
      const data = req.query
      //validate query data
      const validationResponse = salonRequest.validateGetSalonCollectionRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
    }
  } else if (req.method === 'DELETE') {

    if (isMatchingUrl("/api/v1/salons/:uuid/images", req.originalUrl)) {
      const data = req.body
      //validate request data
      const validationResponse = salonRequest.validateDeleteSalonCollectionRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      if (data.imageUuids?.length) {
        const mediaFileIds = []
        data.imageUuids.forEach(async(imageUuid) => {
          let mediaFile;

          try {
            mediaFile = await MediaFile.findOne({
              where: {
                uuid: uuidService.decodeUuid(imageUuid)
              }
            })
          } catch (error) {}

          mediaFileIds.push(mediaFile.id)
        })
        
        req.mediaFileIds = mediaFileIds
      }
    }
  } 

  next()
}

module.exports = validator;