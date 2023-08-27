const httpStatus = require('http-status');
const employeeScheduleRequest = require("../../../validations/v1/requestValidators/employeeScheduleRequest")
const statuses = require('../../../constants/statuses.json')
const { Employee, EmployeeSchedule, businessServiceRoom } = require('../../../models');
const uuidService = require("../../../services/uuidService")

const validator = async(req, res, next) => {
    
  const requestUrl = req.originalUrl
  if(req.method === 'POST') {
    if (requestUrl === '/api/v1/employee_schedules') {
      const data = req.body
      //validate query data
      const validationResponse = employeeScheduleRequest.validatePostEmployeeScheduleItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
      
      let employee;
      if (data.employeeUuid) {
        const decodedUuid = uuidService.decodeUuid(data.employeeUuid)
        try{
          employee = await Employee.findOne({
            where: {
              uuid: decodedUuid
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

      const employeeSchedule = await EmployeeSchedule.findOne({
        where: {
          employeeId: employee.id,
          startTime: data.startTime,
          endTime: data.endTime
        }
      })

      if (employeeSchedule) {
        return res.status(httpStatus.CONFLICT).json({ ...{
          statusCode: httpStatus.CONFLICT,
          message: "EmployeeSchedule already exists"
        } });
      }

    }
  }
  else if(req.method === 'GET') {
    if (req.baseUrl === '/api/v1/employee_schedules') {
      const data = req.query
      //validate query data
      const validationResponse = employeeScheduleRequest.validateGetEmployeeScheduleCollectionRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
      
      if (data.employeeUuid) {
        const decodedUuid = uuidService.decodeUuid(data.employeeUuid)
        let employee;
        try{
          employee = await Employee.findOne({
            where: {
              uuid: decodedUuid
            }
          })
        } catch(error){}
        
        if (!employee) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "Employee not found"
          } });
        }

        const employeeSchedule = await EmployeeSchedule.findOne({
          where: {
            employeeId: employee.id
          }
        })
  
        if (!employeeSchedule) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
            statusCode: httpStatus.NOT_FOUND,
            message: "EmployeeSchedule is not found"
          } });
        }
      }
    }
  }

  next()
}

module.exports = validator;