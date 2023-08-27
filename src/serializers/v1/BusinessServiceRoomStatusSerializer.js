
const {BusinessServiceRoomStatus} = require("../../models")
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
class BusinessServiceRoomStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(BusinessServiceRoomStatus, fields, groups)
    }
}

module.exports = BusinessServiceRoomStatusSerializer