const {BusinessServiceEmployee} = require("../../models")
const EmployeeSerializer = require("./EmployeeSerializer")
const BusinessServiceSerializer = require("./BusinessServiceSerializer")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")

const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    businessServiceId: {
        propertyName: "businessService",
        groups: ["read"],
        relation: (data) => data.BusinessService,
        serializer: async(data) => {
            if (data) {
                const businessServiceSerializer = new BusinessServiceSerializer()
                return await businessServiceSerializer.serialize(data, false)
            }
        }
    },
    employeeId: {
        propertyName: "employee",
        groups: ["read"],
        relation: (data) => data.Employee,
        serializer: async(data) => {
            if (data) {
                const employeeSerializer = new EmployeeSerializer()
                return await employeeSerializer.serialize(data, false)
            }
        }
    }
}

const serializerGroups = ["read"]
class BusinessServiceEmployeeSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(BusinessServiceEmployee, fields, groups)
    }
}


module.exports = BusinessServiceEmployeeSerializer