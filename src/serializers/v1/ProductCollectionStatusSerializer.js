
const {ProductCollectionStatus} = require("../../models")
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
class ProductCollectionStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(ProductCollectionStatus, fields, groups)
    }
}


module.exports = ProductCollectionStatusSerializer