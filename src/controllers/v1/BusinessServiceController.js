const httpStatus = require('http-status');
const { Op } = require("sequelize");
const { DateTime } = require("luxon");
const { BusinessService, Salon, Employee, BusinessServiceStatus, BusinessServiceRoom, BusinessServiceRoomChair } = require('../../models');
const uuidService = require('../../services/uuidService')
const BusinessServiceSerializer = require('../../serializers/v1/BusinessServiceSerializer')
const apiDataJson = require("../../constants/apiConfig.json");
const {getEmployeeAvailableSlots} = require("../../repository/employeeScheduleRepository")
const businessServiceStatusValues = require("../../models/values/BusinessServiceStatus")
const BusinessServiceRoomStatusValues = require("../../models/values/BusinessServiceRoomStatus")
const BusinessServiceRoomChairStatusValues = require("../../models/values/BusinessServiceRoomChairStatus")

/**
 * get BusinessService item
 * @param {*} req 
 * @param {*} res 
 */

const getBusinessServiceItem = async (req, res) => {
    const data = req.query
    const fields = data["fields"]
    const uuid = uuidService.decodeUuid(req.params.uuid)
    
    const businessService = await BusinessService.findOne({ 
                        where: { uuid },
                        include: [
                            {
                                model: Employee
                            },
                            {
                                model: Salon
                            },
                            {
                                model: BusinessServiceStatus
                            }
                        ]
                    })
                    .catch(error => {});

    
    if (businessService) {
        const businessServiceSerializer = new BusinessServiceSerializer()
        const response = {statusCode: httpStatus.OK, businessService: await businessServiceSerializer.serialize(businessService)}
        if (fields && fields.includes('availableSlots')) {

            const employees = businessService.Employees
            const availableEmployeeSlots = []

            for(let i = 0; i < employees.length; i++) {
                const employee = employees[i]
                const currentDateTime = DateTime.now()
                const availableSlots = await getEmployeeAvailableSlots(
                                        employee.id,
                                        currentDateTime.startOf('day').toISO(),
                                        currentDateTime.endOf('day').toISO()
                                    )
                availableEmployeeSlots.push({
                    employeeUuid: uuidService.encodeUuid(employee.uuid),
                    availableSlots
                })
            }

            response["availableEmployeeSlots"] = availableEmployeeSlots
        }
        return res.status(httpStatus.OK).json(response);
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Business service not found"} });
};

/**
 * get BusinessService collection
 * @param {*} req 
 * @param {*} res 
 */

 const getBusinessServiceCollection = async (req, res) => {
    const data = req.query
    const employeeIds = data["employeeIds"]?.length && data["employeeIds"].map(employeeId => uuidService.decodeUuid(employeeId))

    const include = {
        include: [
            {
                model: Salon,
                ...(
                    data.salonUuid && {
                        where: {
                            uuid: uuidService.decodeUuid(data.salonUuid)
                        }
                    }
                ),
            },
            {
                model: BusinessServiceStatus,
            }
        ]
    }
    if (employeeIds?.length) {
        include.include.push({
            model: Employee,
            where: {
                uuid: {
                    [Op.in]: employeeIds
                }
            }
        })
    }
    
    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    
    const orderBy = data.orderBy 
    const order = orderBy && [
        ['id', orderBy]
    ]

    const isActive = data.isActive
    const name = data.name
    const where = {
        ...(isActive && {
            statusId: isActive === "true" ? businessServiceStatusValues.ACTIVE.id : (
                isActive === "false" ? businessServiceStatusValues.DISABLE.id : null
            )
        }),
        ...(name && {
            name: {
                [Op.like]: `%${name}%`
            }
        })
    }

    // apiDataJson
    return BusinessService.findAll({
        where,
        ...include,
        order,
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })
    .then(async(businessServices) => {
        const businessServiceSerializer = new BusinessServiceSerializer()
        const statusCode = httpStatus.OK
        return res.status(statusCode).json({ ...{
            statusCode,
            businessServices: await businessServiceSerializer.serializeBulk(businessServices)
        } });
    })
    .catch(e => {
        return res.status(httpStatus.NOT_FOUND).json({ ...{
            statusCode: httpStatus.NOT_FOUND,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "Business services not found"
        } });
    })
};

const createBusinessServiceItem = async (req, res) => {
    const data = req.body

    const salon = await Salon.findOne({
        where: {
            uuid: uuidService.decodeUuid(data.salonUuid)
        }
    })

    //create businessService
    const businessService = await BusinessService.build({
        name: data.name,
        description: data.description,
        price: data.price,
        salonId: salon.id,
        duration: data.duration,
        statusId: businessServiceStatusValues.ACTIVE.id
    });

    //send response
    let message = ''
    let statusCode = null
    await businessService.save()
    .then(async(response) => {
        for(let i = 0; i < data.rooms.length; i++) {
            const room = data.rooms[i]
            await BusinessServiceRoom.create({
                name: `Room ${i+1}`,
                businessServiceId: response.id,
                totalChairs: room.totalChairs,
                statusId: BusinessServiceRoomStatusValues.ACTIVE.id
            }).then(async(businessServiceRoom) => {
                for (let j = 0; j < room.totalChairs; j++) {
                    const chairName = `Chair ${j+1}`
                    await BusinessServiceRoomChair.create({
                        name: chairName,
                        roomId: businessServiceRoom.id,
                        statusId: BusinessServiceRoomChairStatusValues.ACTIVE.id,
                        typeId: 1
                    })
                }
            })
        }

        const businessServiceSerializer = new BusinessServiceSerializer()
        statusCode = httpStatus.CREATED
        return res.status(statusCode).json({ ...{
            statusCode,
            businessService: await businessServiceSerializer.serialize(response)
        } });
    })
    .catch(e => {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = e?.errors?.[0]?.message ? e.errors[0].message : "BusinessService is not created"
        
        return res.status(statusCode).json({ ...{
            statusCode,
            message
        } });
    });
};

/**
 * patch business service item
 * @param {*} req
 * @param {*} res 
 */

 const patchBusinessServiceItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)

    let businessService;
    try {
        businessService = await BusinessService.findOne({ 
            where: { uuid }
        })
    } catch (error) {
        businessService = null
    }
    
    if (!businessService) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Business service not found"} });
    }

    const data = req.body
    await businessService.update({
        ...(data.name && {name: data.name}),
        ...(data.description && {description: data.description}),
        ...(data.statusId && {statusId: data.statusId}),
        ...(data.duration && {duration: data.duration}),
        ...(data.price && {price: data.price})
    })

    businessService = await BusinessService.findOne({ 
        where: { uuid },
        include: [
            {
                model: Salon
            },
            {
                model: BusinessServiceStatus
            },
            {
                model: BusinessServiceStatus
            }
        ]
    })
    const businessServiceSerializer = new BusinessServiceSerializer()
    res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, businessService: await businessServiceSerializer.serialize(businessService)} });
 };

module.exports = {
    getBusinessServiceItem,
    getBusinessServiceCollection,
    createBusinessServiceItem,
    patchBusinessServiceItem
}