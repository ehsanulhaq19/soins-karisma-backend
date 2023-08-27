
const {BusinessServiceRoomChair} = require("../../models")
const Serializer = require("./Serializer")
const uuidService = require("../../services/uuidService")
const BusinessServiceRoomChairStatusSerializer = require("./BusinessServiceRoomChairStatusSerializer")

const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    name: {
        groups: ["read"]
    },
    roomId: {
        groups: ["extended"]
    },
    statusId: {
        propertyName: "status",
        groups: ["extended"],
        relation: (data) => data.BusinessServiceRoomChairStatus,
        serializer: async(data) => {
            const businessServiceRoomChairStatusSerializer = new BusinessServiceRoomChairStatusSerializer()
            return await businessServiceRoomChairStatusSerializer.serialize(data, false)
        }
    }
}

const serializerGroups = ["read"]
class BusinessServiceRoomChairSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(BusinessServiceRoomChair, fields, groups)
    }
}

module.exports = BusinessServiceRoomChairSerializer