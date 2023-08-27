
const {Role} = require("../../models")
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
class RoleSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(Role, fields, groups)
    }
}


module.exports = RoleSerializer