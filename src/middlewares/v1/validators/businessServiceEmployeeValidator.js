const httpStatus = require('http-status');
const businessServiceEmployeeRequest = require("../../../validations/v1/requestValidators/businessServiceEmployeeRequest")
const statuses = require('../../../constants/statuses.json')
const { BusinessServiceEmployee, BusinessService, Employee } = require('../../../models');
const uuidService = require("../../../services/uuidService")

const validator = async(req, res, next) => {
    
  const requestUrl = req.originalUrl
  
  if(req.method === 'POST') {
    if (requestUrl === '/api/v1/business_service_employees') {
      const data = req.body
      //validate query data
      const validationResponse = businessServiceEmployeeRequest.validatePostBusinessServiceEmployeeItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
      
      let businessService;
      if (data.businessServiceUuid) {
        const businessServiceUuid = uuidService.decodeUuid(data.businessServiceUuid)
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
      }
      req.businessService = businessService

      let employee;
      if (data.employeeUuid) {
        const employeeUuid = uuidService.decodeUuid(data.employeeUuid)
        try{
          employee = await Employee.findOne({
            where: {
              uuid: employeeUuid
            }
          })
        } catch(error){}
        
        if (!employee) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "Employee not found"
          } });
        }
      }

      if (employee.salonId !== businessService.salonId) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ ...{
            statusCode: httpStatus.UNPROCESSABLE_ENTITY, 
            message:"Employee do not belong to the business service salon",
        } });
      }

      req.employee = employee

      const businessServiceEmployee = await BusinessServiceEmployee.findOne({
        where: {
          employeeId: employee.id,
          businessServiceId: businessService.id
        }
      })

      if(businessServiceEmployee) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ ...{
          statusCode: httpStatus.UNPROCESSABLE_ENTITY, 
          message:"BusinessServiceEmployee already exists",
        } });
      }

      req.businessServiceEmployee = businessServiceEmployee
    }
  }

  else if (req.method === 'GET') {
    if (req.baseUrl === '/api/v1/business_service_employees') {
      const data = req.query
      //validate query data
      const validationResponse = businessServiceEmployeeRequest.validateGetBusinessServiceEmployeeCollectionRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
      
      const decodedUuid = uuidService.decodeUuid(data.businessServiceUuid)
      let businessService;
      try{
        businessService = await BusinessService.findOne({
          where: {
            uuid: decodedUuid
          }
        })
      } catch(error){}
      
      if (!businessService) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{
            statusCode: httpStatus.NOT_FOUND,
            message: "BusinessService not found"
        } });
      }
    }
  }

  next()
}

module.exports = validator;