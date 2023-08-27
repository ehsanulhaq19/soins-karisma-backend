
const {SubscriptionCollectionStatus} = require("../../models")
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
class SubscriptionCollectionStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(SubscriptionCollectionStatus, fields, groups)
    }
}


module.exports = SubscriptionCollectionStatusSerializer