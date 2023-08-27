
const {BusinessServiceStatus} = require("../../models")
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
class BusinessServiceStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(BusinessServiceStatus, fields, groups)
    }
}

module.exports = BusinessServiceStatusSerializer