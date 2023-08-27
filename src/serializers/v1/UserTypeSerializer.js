
const {UserType} = require("../../models")
const Serializer = require("./Serializer")

const fields = {
    id: {
        groups: ["read"]
    },
    name: {
        groups: ["read"]
    }
}

const serializerGroups = ["read"]
class UserTypeSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(UserType, fields, groups)
    }
}


module.exports = UserTypeSerializer