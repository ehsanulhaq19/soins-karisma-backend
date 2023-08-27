const {EmployeeSchedule} = require("../../models")
const EmployeeSerializer = require("./EmployeeSerializer")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")

const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    startTime: {
        groups: ["read"]
    },
    endTime: {
        groups: ["read"]
    },
    employeeId: {
        propertyName: "employee",
        groups: ["detail"],
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
class EmployeeScheduleSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(EmployeeSchedule, fields, groups)
    }
}


module.exports = EmployeeScheduleSerializer