const httpStatus = require('http-status');
const { Employee, Salon, User, UserStatus, EmployeeRole, BusinessService, EmployeeRoleRelation } = require('../../models');
const uuidService = require('../../services/uuidService')
const EmployeeSerializer = require('../../serializers/v1/EmployeeSerializer')
const apiDataJson = require("../../constants/apiConfig.json");
const UserStatusValues = require("../../models/values/UserStatus")
const sequelize = require('sequelize');

/**
 * get employee item
 * @param {*} req 
 * @param {*} res 
 */

const getEmployeeItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    
    const employee = await Employee.findOne({ 
                        where: { uuid },
                        include: [
                            {
                                model: Salon
                            },
                            {
                                model: User,
                                include: [
                                    {
                                        model: UserStatus
                                    }
                                ]
                            },
                            {
                                model: EmployeeRole,
                                through: {
                                    model: EmployeeRoleRelation,
                                    attributes: []
                                }
                            }
                        ]
                    })
                    .catch(error => {});
    if (employee) {
        const employeeSerializer = new EmployeeSerializer()
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, employee: await employeeSerializer.serialize(employee)} });
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Employee not found"} });
};

/**
 * get employee collection
 * @param {*} req 
 * @param {*} res 
 */

 const getEmployeeCollection = async (req, res) => {
    const data = req.query
    const isActive = data.isActive
    const businessService = req.businessService
    const name = data.name || ""
    const groups = req.query.groups ? req.query.groups.split(",") : []

    const include = {
        include: [
            {
                model: User,
                include: [
                    {
                        model: UserStatus
                    }
                ],
                where: {
                    ...(isActive && {
                        statusId: isActive === "true" ? UserStatusValues.ACTIVE.id : (
                            isActive === "false" ? UserStatusValues.DISABLE.id : null
                        )
                    }),
                    ...(name && {
                        [sequelize.Op.or]: {
                            firstName: {
                                [sequelize.Op.like]: `%${name}%`
                            },
                            lastName: {
                                [sequelize.Op.like]: `%${name}%`
                            }
                        }
                    })
                }
            },
            {
                model: Salon,
                ...(
                    data.salonUuid && {
                        where: {
                            uuid: uuidService.decodeUuid(data.salonUuid)
                        }
                    }
                )
                
            },
            {
                model: EmployeeRole
            },
            {
                model: BusinessService,
                ...(
                    businessService && {
                        where: {
                            id: businessService.id
                        }
                    }
                )
            }
        ].filter(data => data)
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

    // apiDataJson
    const employees = await Employee.findAll({
        ...include,
        order,
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })

    const serializerGroups = ["read", "employeeRole", "businessServices", ...groups]
    const employeeSerializer = new EmployeeSerializer(serializerGroups)
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        employees: await employeeSerializer.serializeBulk(employees)
    } });
};

/**
 * patch employee item
 * @param {*} req
 * @param {*} res 
 */

 const patchEmployeeItem = async (req, res) => {
    const data = req.body
    const employee = req.employee
    const user = await User.findOne({
        where: {
            id: employee.userId
        }
    })

    if (data.calendarColor) {
        await employee.update({
            ...(data.calendarColor && {calendarColor: data.calendarColor})
        })
    }
    
    if (data.gender || data.statusId || data.profileImag) {
        await user.update({
            ...(data.gender && {gender: data.gender}),
            ...(data.statusId && {statusId: data.statusId}),
            ...(data.profileImage && {profileImage: data.profileImage}),
        })
    }

    if (employee && data.roleUuid) {
        const employeeRole = await EmployeeRole.findOne({
            where: {
                id: data.roleUuid
            }
        })

        if (employeeRole) {
            const employeeRoleRelation = await EmployeeRoleRelation.findOne({
                where: {
                    employeeId: employee.id,
                    roleId: employeeRole.id
                }
            })
            if (employeeRoleRelation) {
                return res.status(httpStatus.CONFLICT).json({ ...{statusCode: httpStatus.CONFLICT, message: "Employee role already assigned"} });
            } else {
                const employeeRoleRelation = await EmployeeRoleRelation.build({
                    employeeId: employee.id,
                    roleId: employeeRole.id
                })
                await employeeRoleRelation.save()
            }
            
            await employee.save()
        }
    }

    const updatedEmployee = await Employee.findOne({ 
        where: { id: employee.id },
        include: [
            {
                model: Salon
            },
            {
                model: User,
                include: [
                    {
                        model: UserStatus
                    }
                ]
            },
            {
                model: EmployeeRole
            }
        ]
    })
    .catch(error => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: "Employee not updated"} });
    });

    const employeeSerializer = new EmployeeSerializer()
    return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK, 
        user: await employeeSerializer.serialize(updatedEmployee)
    });
};

/**
 * assign role to employee
 * @param {*} req
 * @param {*} res
 */

const assignRoleToEmployee = async (req, res) => {
    const data = req.body
    const uuid = uuidService.decodeUuid(data.employeeUuid)
    const employee = await Employee.findOne({
        where: { uuid },
        include: [{
                model: EmployeeRole
            }
        ]
    })

    const employeeSerializer = new EmployeeSerializer()
    res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, employee: await employeeSerializer.serialize(employee)} });
};

module.exports = {
    getEmployeeItem,
    getEmployeeCollection,
    assignRoleToEmployee,
    patchEmployeeItem
}