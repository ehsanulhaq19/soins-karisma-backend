const {SubscriptionCollection} = require("../../models")
const uuidService = require("../../services/uuidService")
const SubscriptionCollectionStatusSerializer = require("./SubscriptionCollectionStatusSerializer")
const SubscriptionSerializer = require("./SubscriptionSerializer")
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
    description: {
        groups: ["read"]
    },
    subscriptions: {
        groups: ["read"],
        propertyName: "subscriptions",
        relation: (data) => data.Subscriptions,
        serializer: async(data) => {
            const subscriptions = []
            if (data && data.length) {
                for(let i = 0; i < data.length; i++){
                    const subscription = data[i]
                    subscriptions.push(
                        await (new SubscriptionSerializer()).serialize(subscription)
                    )
                }
            }
            return subscriptions
        }
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.SubscriptionCollectionStatus,
        serializer: async(data) => {
            if (data) {
                const statusSerializer = new SubscriptionCollectionStatusSerializer()
                return await statusSerializer.serialize(data, false)
            }
        }
    }
}

const serializerGroups = ["read"]

class SubscriptionCollectionSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(SubscriptionCollection, fields, groups)
    }
}


module.exports = SubscriptionCollectionSerializer