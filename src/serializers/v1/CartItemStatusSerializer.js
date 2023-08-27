
const {CartItemStatus} = require("../../models")
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
class CartItemStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(CartItemStatus, fields, groups)
    }
}


module.exports = CartItemStatusSerializer