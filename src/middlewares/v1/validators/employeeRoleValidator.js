const httpStatus = require('http-status');
const employeeRoleRequest = require("../../../validations/v1/requestValidators/employeeRoleRequest")
const statuses = require('../../../constants/statuses.json')
const { Employee, Salon } = require('../../../models');
const uuidService = require("../../../services/uuidService")


const validator = async(req, res, next) => {

    if (req.method === "POST") {
        if (req.baseUrl === '/api/v1/employee_roles') {
            const data = req.body

            //validate query data
            const validationResponse = employeeRoleRequest.validateEmployeeRoleRequest(data)
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

module.exports = validator