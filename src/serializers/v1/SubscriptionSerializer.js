const {Subscription} = require("../../models")
const uuidService = require("../../services/uuidService")
const SubscriptionStatusSerializer = require("./SubscriptionStatusSerializer")
const SubscriptionDurationSerializer = require("./SubscriptionDurationSerializer")
const ReviewSerializer = require("./ReviewSerializer")
const Serializer = require("./Serializer")

/**
 * Fields to expose
 */
const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    name: {
        groups: ["read"]
    },
    price: {
        groups: ["read"]
    },
    description: {
        groups: ["read"]
    },
    durationId: {
        propertyName: "duration",
        groups: ["read"],
        relation: (data) => data.SubscriptionDuration,
        serializer: async(data) => {
            if (data) {
                const durationSerializer = new SubscriptionDurationSerializer()
                return await durationSerializer.serialize(data, false)
            }
        }
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.SubscriptionStatus,
        serializer: async(data) => {
            if (data) {
                const statusSerializer = new SubscriptionStatusSerializer()
                return await statusSerializer.serialize(data, false)
            }
        }
    },
    reviews: {
        propertyName: "reviews",
        groups: ["read"],
        relation: (data) => data.Reviews,
        serializer: async(data) => {
            if (data) {
                const reviewSerializer = new ReviewSerializer()
                return await reviewSerializer.serializeBulk(data, false)
            }
        }
    }
}

const serializerGroups = ["read"]

class SubscriptionSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(Subscription, fields, groups)
    }
}


module.exports = SubscriptionSerializer