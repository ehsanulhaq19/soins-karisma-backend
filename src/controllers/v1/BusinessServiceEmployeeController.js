const httpStatus = require('http-status');
const { BusinessService, BusinessServiceEmployee, Employee, EmployeeRole, Salon, User } = require('../../models');
const uuidService = require('../../services/uuidService')
const BusinessServiceEmployeeSerializer = require('../../serializers/v1/BusinessServiceEmployeeSerializer')
const apiDataJson = require("../../constants/apiConfig.json");

/**
 * get BusinessServiceEmployee collection
 * @param {*} req 
 * @param {*} res 
 */

 const getBusinessServiceEmployeeCollection = async (req, res) => {
    const data = req.query
    
    const include = [
        {
            model: BusinessService,
            where: {
                uuid: uuidService.decodeUuid(data.businessServiceUuid)
            }
        },
        {
            model: Employee,
            include: [
                {
                    model: Salon
                },
                {
                    model: User
                },
                {
                    model: EmployeeRole
                }
            ]
        }
    ]

    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    const businessServiceEmployees = await BusinessServiceEmployee.findAll({
        include,
        order: [
            ['id', 'ASC']
        ],
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })

    const businessServiceEmployeeSerializer = new BusinessServiceEmployeeSerializer()
    const businessServiceEmployeesArray = await businessServiceEmployeeSerializer.serializeBulk(businessServiceEmployees)
    
    let response = {}
    
    if (businessServiceEmployeesArray.length) {
        const businessServiceEmplpyeesData = businessServiceEmployeesArray.map(bse => {
            return bse?.employee
        })
        response = {
            uuid: businessServiceEmployeesArray[0].uuid,
            businessService: businessServiceEmployeesArray[0].businessService,
            employees: businessServiceEmplpyeesData
        }
    }
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        businessServiceEmployees: response
    } });
};

/**
 * create BusinessServiceEmployee item
 * @param {*} req 
 * @param {*} res 
 */

const createBusinessServiceEmployeeItem = async (req, res) => {
    const businessService = req.businessService
    const employee = req.employee

    const businessServiceEmployee = BusinessServiceEmployee.build({
        businessServiceId: businessService.id,
        employeeId: employee.id
    })

    await businessServiceEmployee.save()
    .then(async(businessServiceEmployee) => {
        const newBSE = await BusinessServiceEmployee.findOne({
            include: [{
                model: BusinessService,
            },
            {
                model: Employee,
                include: [
                    {
                        model: Salon
                    },
                    {
                        model: User
                    },
                    {
                        model: EmployeeRole
                    }
                ]
            }],
            where: {
                id: businessServiceEmployee.id
            }
        })
        
        const businessServiceEmployeeSerializer = new BusinessServiceEmployeeSerializer()
        return res.status(httpStatus.CREATED).json({ ...{
            statusCode: httpStatus.CREATED,
            businessServiceEmployee: await businessServiceEmployeeSerializer.serialize(newBSE)
        } });
    })
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR, 
            message: e?.errors?.[0]?.message ? e.errors[0].message : "BusinessServiceEmployee is not created",
        } });
    });

    
};

module.exports = {
    getBusinessServiceEmployeeCollection,
    createBusinessServiceEmployeeItem
}