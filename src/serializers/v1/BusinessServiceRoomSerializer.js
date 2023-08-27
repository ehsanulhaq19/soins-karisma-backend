
const {BusinessServiceRoom} = require("../../models")
const Serializer = require("./Serializer")
const uuidService = require("../../services/uuidService")
const BusinessServiceRoomStatusSerializer = require("./BusinessServiceRoomStatusSerializer")

const fields = {
    uuid: {
        groups: ["read", "bookingDetail"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    name: {
        groups: ["read", "bookingDetail"]
    },
    totalChairs: {
        groups: ["read"]
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.BusinessServiceRoomStatus,
        serializer: async(data) => {
            const businessServiceRoomStatusSerializer = new BusinessServiceRoomStatusSerializer()
            return await businessServiceRoomStatusSerializer.serialize(data, false)
        }
    }
}

const serializerGroups = ["read"]
class BusinessServiceRoomSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(BusinessServiceRoom, fields, groups)
    }
}

module.exports = BusinessServiceRoomSerializer