
const {ProductStatus} = require("../../models")
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
class ProductStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(ProductStatus, fields, groups)
    }
}


module.exports = ProductStatusSerializer