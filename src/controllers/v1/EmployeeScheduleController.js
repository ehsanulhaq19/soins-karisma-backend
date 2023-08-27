const httpStatus = require('http-status');
const { DateTime } = require("luxon");
const { EmployeeSchedule, Employee } = require('../../models');
const uuidService = require('../../services/uuidService')
const EmployeeScheduleSerializer = require('../../serializers/v1/EmployeeScheduleSerializer')
const apiDataJson = require("../../constants/apiConfig.json");
const {getEmployeeAvailableSlots} = require("../../repository/employeeScheduleRepository")

/**
 * get EmployeeSchedule collection
 * @param {*} req 
 * @param {*} res 
 */

 const getEmployeeScheduleCollection = async (req, res) => {
    const data = req.query
    const include = {
        model: Employee,
        where: {
            uuid: uuidService.decodeUuid(data.employeeUuid)
        }
    }

    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    const employeeSchedule = await EmployeeSchedule.findAll({
        include,
        order: [
            ['id', 'ASC']
        ],
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })

    const employeeScheduleObj = employeeSchedule[0]
    const employee = employeeScheduleObj.Employee
    const currentDateTime = DateTime.now()
    let startDateTime = data.startDateTime ? data.startDateTime : currentDateTime.startOf('day').toISO()
    let endDateTime = data.endDateTime ? data.endDateTime : currentDateTime.endOf('day').toISO()
    let duration = data.duration
    let availableSlots;

    availableSlots = await getEmployeeAvailableSlots(employee.id, startDateTime, endDateTime, duration)

    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        employeeSchedule: {
            uuid: uuidService.encodeUuid(employeeScheduleObj.uuid),
            availableSlots
        }
    } });
};

/**
 * create EmployeeSchedule item
 * @param {*} req 
 * @param {*} res 
 */

const createEmployeeScheduleItem = async (req, res) => {
    const data = req.body

    const employee = await Employee.findOne({
        where: {
            uuid: uuidService.decodeUuid(data.employeeUuid)
        }
    })

    //create employeeSchedule
    const employeeSchedule = await EmployeeSchedule.build({
        startTime: data.startTime,
        endTime: data.endTime,
        isWorking: true,
        employeeId: employee.id
    });

    await employeeSchedule.save()
    .then(async(response) => {
        const employeeScheduleSerializer = new EmployeeScheduleSerializer()
        return res.status(httpStatus.CREATED).json({ ...{
            statusCode: httpStatus.CREATED,
            employeeSchedule: await employeeScheduleSerializer.serialize(response)
        } });
    })
    .catch(e => {
       return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "EmployeeSchedule is not created"
        } });
    });
};

module.exports = {
    getEmployeeScheduleCollection,
    createEmployeeScheduleItem
}