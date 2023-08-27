const httpStatus = require('http-status');
const employeeRequest = require("../../../validations/v1/requestValidators/employeeRequest")
const statuses = require('../../../constants/statuses.json')
const { Employee, Salon, BusinessService, UserStatus } = require('../../../models');
const uuidService = require("../../../services/uuidService")

const validator = async(req, res, next) => {
  const requestUrl = req.originalUrl
  if (req.method === 'PATCH') {
    const lastIndexOfUri = requestUrl.lastIndexOf('/')
    const requestUri = requestUrl.slice(0, lastIndexOfUri)
    const patchRequestUrl = "/api/v1/employees/:uuid"
    const patchRequestUri = patchRequestUrl.slice(0, patchRequestUrl.lastIndexOf('/'))

    if (requestUri === patchRequestUri) {
      const patchEmployeeUuid = requestUrl.slice(lastIndexOfUri+1)
      const data = req.body
      //validate request dataquery
      const validationResponse = employeeRequest.validatePatchEmployeeItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      // check employee validity
      const uuid = uuidService.decodeUuid(patchEmployeeUuid)
      let patchEmployee = null
      
      try {
        patchEmployee = await Employee.findOne({
          where: { uuid }
        })
      } catch (error) {
        patchEmployee = null
      }
      
      if (!patchEmployee) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
            statusCode: httpStatus.NOT_FOUND,
            message: "Employee not found"
          } });
      }
      req.employee = patchEmployee

      // check status validity
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
    }
  } 
  else if(req.method === 'GET') {
    if (req.baseUrl === '/api/v1/employees') {
      const data = req.query
      //validate query data
      const validationResponse = employeeRequest.validateGetEmployeeCollectionRequest(data)
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

        req.salon = salon
      }

      if (data.businessServiceUuid) {
        const businessServiceUuid = uuidService.decodeUuid(data.businessServiceUuid)
        let businessService;
        try{
          businessService = await BusinessService.findOne({
            where: {
              uuid: businessServiceUuid
            }
          })
        } catch(error){}
        
        if (!businessService) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "BusinessService not found"
          } });
        }

        req.businessService = businessService
      }
    }
  } else if(req.method === 'POST') {
    if (req.baseUrl === '/api/v1/employees' && req.url === '/role') {
      const data = req.body
      //validate query data
      const validationResponse = employeeRequest.validateAssignEmployeeRoleRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      const decodedUuid = uuidService.decodeUuid(data.employeeUuid)
      let employee;
      try{
        employee = await Employee.findOne({
          where: {
            uuid: decodedUuid
          }
        })
      } catch(error){
        console.log(error);
      }

      if (!employee) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{
            statusCode: httpStatus.NOT_FOUND,
            message: "Employee not found"
        } });
      }

      req.employee = employee
    }
  }
  next()
}

module.exports = validator;