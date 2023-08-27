
const {OrderStatus} = require("../../models")
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
class OrderStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(OrderStatus, fields, groups)
    }
}


module.exports = OrderStatusSerializer