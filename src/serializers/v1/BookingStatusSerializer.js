
const {BookingStatus} = require("../../models")
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
class BookingStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(BookingStatus, fields, groups)
    }
}


module.exports = BookingStatusSerializer