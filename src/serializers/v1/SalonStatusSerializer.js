
const {SalonStatus} = require("../../models")
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
class SalonStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(SalonStatus, fields, groups)
    }
}


module.exports = SalonStatusSerializer