const {BusinessService} = require("../../models")
const SalonSerializer = require("./SalonSerializer")
const BusinessServiceStatusSerializer = require("./BusinessServiceStatusSerializer")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")

const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    name: {
        groups: ["read"]
    },
    description: {
        groups: ["read"]
    },
    price: {
        groups: ["read"]
    },
    duration: {
        groups: ["read"]
    },
    salonId: {
        propertyName: "salon",
        groups: ["read"],
        relation: (data) => data.Salon,
        serializer: async(data) => {
            if (data) {
                const salonSerializer = new SalonSerializer()
                return await salonSerializer.serialize(data, false)
            }
        }
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.BusinessServiceStatus,
        serializer: async(data) => {
            if (data) {
                const businessServiceStatusSerializer = new BusinessServiceStatusSerializer()
                return await businessServiceStatusSerializer.serialize(data, false)
            }
        }
    }
}

const serializerGroups = ["read"]
class BusinessServiceSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(BusinessService, fields, groups)
    }
}


module.exports = BusinessServiceSerializer