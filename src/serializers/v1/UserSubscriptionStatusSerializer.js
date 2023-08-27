
const {UserSubscriptionStatus} = require("../../models")
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
class UserSubscriptionStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(UserSubscriptionStatus, fields, groups)
    }
}


module.exports = UserSubscriptionStatusSerializer