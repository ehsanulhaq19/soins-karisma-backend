
const {Employee} = require("../../models")
const Serializer = require("./Serializer")
const UserSerializer = require("./UserSerializer")
const SalonSerializer = require("./SalonSerializer")
const EmployeeRoleSerializer = require("./EmployeeRoleSerializer")
const BusinessServiceSerializer = require("./BusinessServiceSerializer")
const uuidService = require("../../services/uuidService")

const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    calendarColor: {
        groups: ["read"]
    },
    userId: {
        propertyName: "user",
        groups: ["read"],
        relation: (data) => data.User,
        serializer: async(data) => {
            if (data) {
                const userSerializer = new UserSerializer()
                return await userSerializer.serialize(data, false)
            }
        }
    },
    salonId: {
        propertyName: "salon",
        groups: ["extended"],
        relation: (data) => data.Salon,
        serializer: async(data) => {
            if (data) {
                const salonSerializer = new SalonSerializer()
                return await salonSerializer.serialize(data, false)
            }
        }
    },
    employeeRole: {
        propertyName: "employeeRole",
        groups: ["read"],
        customFunction: (data) => {
            const roles = data?.EmployeeRoles
            if (roles) {
                const employeeRolesList = []
                if (roles && roles.length) {
                    roles.forEach(role => {
                        employeeRolesList.push({
                            id: role.id,
                            name: role.name
                        })
                    });
                }
                return employeeRolesList
            }
        },
        serializer: async(data) => {
            if (data) {
                const employeeRoleSerializer = new EmployeeRoleSerializer()
                return await employeeRoleSerializer.serialize(data, false)
            }
        }
    },
    businessServices: {
        propertyName: "businessServices",
        groups: ["businessServices"],
        customFunction: async(data) => {
            const businessServices = data?.BusinessServices
            if (businessServices) {
                const businessServicesList = []
                if (businessServices && businessServices.length) {
                    for(let i = 0; i < businessServices.length; i++) {
                        const businessService = businessServices[i]
                        businessServicesList.push(
                            await (new BusinessServiceSerializer()).serialize(businessService)
                        )
                    }
                }
                return businessServicesList
            }
        },
        serializer: async(data) => {
            if (data) {
                const employeeRoleSerializer = new EmployeeRoleSerializer()
                return await employeeRoleSerializer.serialize(data, false)
            }
        }
    }
}

const serializerGroups = ["read"]
class EmployeeSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(Employee, fields, groups)
    }
}


module.exports = EmployeeSerializer