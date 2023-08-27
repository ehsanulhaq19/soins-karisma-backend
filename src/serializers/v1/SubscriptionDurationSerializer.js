
const {SubscriptionDuration} = require("../../models")
const Serializer = require("./Serializer")

const fields = {
    id: {
        groups: ["read"]
    },
    name: {
        groups: ["read"]
    },
    interval: {
        groups: ["read"]
    }
}

const serializerGroups = ["read"]
class SubscriptionDurationSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(SubscriptionDuration, fields, groups)
    }
}


module.exports = SubscriptionDurationSerializer