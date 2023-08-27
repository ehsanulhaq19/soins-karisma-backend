
const {UserStatus} = require("../../models")
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
class UserStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(UserStatus, fields, groups)
    }
}


module.exports = UserStatusSerializer