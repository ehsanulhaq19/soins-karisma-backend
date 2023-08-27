
const {EmployeeRole} = require("../../models")
const Serializer = require("./Serializer")

const fields = {
    id: {
        groups: ["read"]
    },
    name: {
        groups: ["read"]
    },
    displayName: {
        groups: ["read"]
    },
    description: {
        groups: ["read"]
    }
}

const serializerGroups = ["read"]
class EmployeeRoleSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(EmployeeRole, fields, groups)
    }
}


module.exports = EmployeeRoleSerializer