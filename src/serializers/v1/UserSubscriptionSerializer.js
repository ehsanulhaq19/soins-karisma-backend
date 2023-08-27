const {UserSubscription} = require("../../models")
const uuidService = require("../../services/uuidService")
const SubscriptionSerializer = require("./SubscriptionSerializer")
const UserSubscriptionStatusSerializer = require("./UserSubscriptionStatusSerializer")
const Serializer = require("./Serializer")

/**
 * Fields to expose
 */
const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    lastPaymentDate: {
        groups: ["read"],
    },
    totalAmount: {
        groups: ["read"],
    },
    subTotalAmount: {
        groups: ["read"],
    },
    taxQst: {
        groups: ["read"],
    },
    taxPst: {
        groups: ["read"],
    },
    taxHst: {
        groups: ["read"],
    },
    taxGst: {
        groups: ["read"],
    },
    statusId: {
        groups: ["read"],
        propertyName: "status",
        relation: (data) => data.UserSubscriptionStatus,
        serializer: async(data) => {
            if (data) {
                const userSubscriptionStatusSerializer = new UserSubscriptionStatusSerializer()
                return await userSubscriptionStatusSerializer.serialize(data, false)
            }
        }
        
    },
    subscription: {
        propertyName: "subscription",
        groups: ["read"],
        relation: (data) => data.Subscription,
        serializer: async(data) => {
            if (data) {
                const subscriptionSerializer = new SubscriptionSerializer()
                return await subscriptionSerializer.serializeBulk(data, false)
            }
        }
    }
}

const serializerGroups = ["read"]

class UserSubscriptionSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(UserSubscription, fields, groups)
    }
}


module.exports = UserSubscriptionSerializer