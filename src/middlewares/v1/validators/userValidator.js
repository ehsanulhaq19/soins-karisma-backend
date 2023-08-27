const httpStatus = require('http-status');
const userRequest = require("../../../validations/v1/requestValidators/userRequest")
const statuses = require('../../../constants/statuses.json')
const { User, Role, UserStatus, Salon } = require('../../../models');
const { Op } = require("sequelize");
const uuidService = require("../../../services/uuidService")
const RoleValues = require("../../../models/values/Role")
const userRepository = require("../../../repository/userRepository")

const validator = async(req, res, next) => {
    
  const requestUrl = req.originalUrl
  
  if (req.method === 'PATCH') {
    const lastIndexOfUri = requestUrl.lastIndexOf('/')
    const requestUri = requestUrl.slice(0, lastIndexOfUri)
    const patchRequestUrl = "/api/v1/users/:uuid"
    const patchRequestUri = patchRequestUrl.slice(0, patchRequestUrl.lastIndexOf('/'))

    if (requestUri === patchRequestUri) {
      const patchUserUuid = requestUrl.slice(lastIndexOfUri+1)
      const data = req.body
      //validate request dataquery
      const validationResponse = userRequest.validatePatchUserItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      const uuid = uuidService.decodeUuid(patchUserUuid)
      let patchUser = null
      
      try {
        patchUser = await User.findOne({
          include: [
            {
              model: Role
            }
          ],
          where: { uuid }
        })
      } catch (error) {
        patchUser = null
      }
      
      if (!patchUser) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
            statusCode: httpStatus.NOT_FOUND,
            message: "User not found"
          } });
      }
      req.patchUser = patchUser


      if (data.statusId) {
        const status = await UserStatus.findOne({where: {
          id: data.statusId
        }});
  
        if(!status) {
            return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "Status not found"
            } });
        }  
      }

      const isCustomer = userRepository.isCustomer(patchUser)

      if (!isCustomer && data.salonUuid) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: "Only customer can be attached with the salon"
        } });
      }

      if (data.salonUuid) {
        //check if provided salon is valid
        const salonUuid = data.salonUuid
        let salon;

        try {
            salon = await Salon.findOne({
                        where: {
                            uuid: uuidService.decodeUuid(salonUuid)
                        }
                    })
        } catch (error) {}

        if (!salon) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "Salon not found"
          } });
        }

        req.salon = salon
      }
    }
  } else if (req.method === 'POST') {
    const patchRequestUrl = "/api/v1/users"

    if (requestUrl === patchRequestUrl) {
      const data = req.body
      //validate request data
      const validationResponse = userRequest.validatePostUserItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      const payloadUser = await User.findOne({
        where: { 
          [Op.or]: [
            {
              email: data.email
            },
            {
              userName: data.userName
            }
          ]
         }
      });

      if (payloadUser) {
        return res.status(httpStatus.CONFLICT).json({ ...{
          statusCode: httpStatus.CONFLICT,
          message: "User already exists"
        } });
      }

      const role = await Role.findOne({where: {
          id: data.roleId
      }});

      if(!role) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
            statusCode: httpStatus.NOT_FOUND,
            message: "Role not found"
        } });
      }

      const status = await UserStatus.findOne({where: {
        id: data.statusId
      }});

      if(!status) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "Status not found"
          } });
      }

      if (RoleValues.CUSTOMER.id !== data.roleId && data.salonUuid) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: "Only customer can be attached with the salon"
        } });
      }

      if (data.salonUuid) {
        //check if provided salon is valid
        const salonUuid = data.salonUuid
        let salon;

        try {
            salon = await Salon.findOne({
                        where: {
                            uuid: uuidService.decodeUuid(salonUuid)
                        }
                    })
        } catch (error) {}

        if (!salon) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "Salon not found"
          } });
        }

        req.salon = salon
      }
    }
  }

  next()
}

module.exports = validator;