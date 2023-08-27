
const {SalonType} = require("../../models")
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
class SalonTypeSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(SalonType, fields, groups)
    }
}


module.exports = SalonTypeSerializer