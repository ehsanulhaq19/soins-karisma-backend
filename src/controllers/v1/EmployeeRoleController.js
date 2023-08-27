const httpStatus = require('http-status');
const { EmployeeRoleRelation, EmployeeRole } = require('../../models');
const uuidService = require('../../services/uuidService')
const EmployeeSerializer = require('../../serializers/v1/EmployeeSerializer')
const apiDataJson = require("../../constants/apiConfig.json");


/**
 * get employee roles
 * @param {*} req
 * @param {*} res
 */

const getEmployeeRoles = async (req, res) => {
    const employeeRoles = await EmployeeRole.findAll()
    if (employeeRoles) {
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, employeeRoles} });
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Employee roles not found"} });
}

/**
 * get employee role
 * @param {*} req
 * @param {*} res
 */

const getEmployeeRole = async (req, res) => {
    const id = req.params.id

    const employeeRole = await EmployeeRole.findOne({ where: { id } })
    if (employeeRole) {
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, employeeRole} });
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Employee role not found"} });
}

/**
 * create employee role
 * @param {*} req
 * @param {*} res
 */

const createEmployeeRole = async (req, res) => {
    const data = req.body

    data.displayName = data['name']
    
    const employeeRole = await EmployeeRole.create(data)
    if (employeeRole) {
        return res.status(httpStatus.CREATED).json({ ...{statusCode: httpStatus.CREATED, employeeRole} });
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Employee role not found"} });
}

/**
 * update employee role
 * @param {*} req
 * @param {*} res
 */

const updateEmployeeRole = async (req, res) => {
    const data = req.body
    const id = req.params.id

    data.displayName = data['name']

    const employeeRole = await EmployeeRole.update(data, { where: { id } })
    if (employeeRole) {
        const employeeRole = await EmployeeRole.findOne({ where: { id } })
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, employeeRole} });
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Employee role not found"} });
}

/**
 * delete employee role
 * @param {*} req
 * @param {*} res
 */

const deleteEmployeeRole = async (req, res) => {
    const id = req.params.id

    const employeeRole = await EmployeeRole.destroy({ where: { id } })
    if (employeeRole) {
        await EmployeeRoleRelation.destroy({ where: { role_id : id } })
        return res.status(httpStatus.NO_CONTENT).json({ ...{statusCode: httpStatus.NO_CONTENT, employeeRole} });
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Employee role not found"} });
}

module.exports = {
    getEmployeeRoles,
    getEmployeeRole,
    createEmployeeRole,
    updateEmployeeRole,
    deleteEmployeeRole
}