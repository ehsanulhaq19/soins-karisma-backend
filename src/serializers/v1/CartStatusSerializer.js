
const {CartStatus} = require("../../models")
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
class CartStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(CartStatus, fields, groups)
    }
}


module.exports = CartStatusSerializer