
const {SubscriptionStatus} = require("../../models")
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
class SubscriptionStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(SubscriptionStatus, fields, groups)
    }
}


module.exports = SubscriptionStatusSerializer