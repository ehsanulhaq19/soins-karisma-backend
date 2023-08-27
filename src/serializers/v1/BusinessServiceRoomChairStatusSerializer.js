
const {BusinessServiceChairRoomStatus} = require("../../models")
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
class BusinessServiceRoomChairStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(BusinessServiceChairRoomStatus, fields, groups)
    }
}

module.exports = BusinessServiceRoomChairStatusSerializer