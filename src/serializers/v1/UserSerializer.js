const {User} = require("../../models")
const Serializer = require("./Serializer")
const RoleSerializer = require("./RoleSerializer")
const SalonSerializer = require("./SalonSerializer")
const UserStatusSerializer = require("./UserStatusSerializer")
const UserTypeSerializer = require("./UserTypeSerializer")
const SubscriptionSerializer = require("./SubscriptionSerializer")
const AddressSerializer = require("./AddressSerializer")
const uuidService = require("../../services/uuidService")

const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    email: {
        groups: ["read"]
    },
    firstName: {
        groups: ["read"]
    },
    lastName: {
        groups: ["read"]
    },
    phone: {
        groups: ["read"]
    },
    gender: {
        groups: ["read"]
    },
    locale: {
        groups: ["read"]
    },
    addressId: {
        propertyName: "address",
        groups: ["read"],
        relation: (data) => data.Address,
        serializer: async(data) => {
            if (data) {
                const addressSerializer = new AddressSerializer()
                return await addressSerializer.serialize(data, false)
            }
        }
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.UserStatus,
        serializer: async(data) => {
            if (data) {
                const userStatusSerializer = new UserStatusSerializer()
                return await userStatusSerializer.serialize(data, false)
            }
        }
    },
    typeId: {
        propertyName: "type",
        groups: ["read"],
        relation: (data) => data.UserType,
        serializer: async(data) => {
            if (data) {
                const userTypeSerializer = new UserTypeSerializer()
                return await userTypeSerializer.serialize(data, false)
            }
        }
    },
    profileImage: {
        groups: ["read"],
        customFunction: async(data) => {
            return data?.profileImage ? data.profileImage : process.env.USER_PROFILE_PLACEHOLDER_IMAGE
        }
    },
    subscriptions: {
        groups: ["subscriptions"],
        customFunction: async(data) => {
            const userSubscriptionsList = []
            if (data) {
                const subscriptions = data?.Subscriptions
                if (subscriptions && subscriptions.length) {
                    for (let i = 0; i < subscriptions.length; i++) {
                        const subscription = subscriptions[i]
                        const userSubscription = subscription.user_subscriptions
                        const subscriptionSerializer = new SubscriptionSerializer()
                        const subscriptionObject = await subscriptionSerializer.serialize(subscription, false)

                        const allUserSubscriptions = subscription.UserSubscriptions
                        let currentSubscriptionStatus = {}
                        if (allUserSubscriptions) {
                            for(let y = 0; y < allUserSubscriptions.length; y++) {
                                if (userSubscription.userId === allUserSubscriptions[y].userId) {
                                    currentSubscriptionStatus = allUserSubscriptions[y].UserSubscriptionStatus
                                    break
                                }
                            }
    
                            subscriptionObject.userSubscriptionStatus = currentSubscriptionStatus
                        }
                        userSubscriptionsList.push(subscriptionObject)
                    }
                }
            }
            return userSubscriptionsList
        }
    },
    role: {
        propertyName: "role",
        groups: ["read"],
        customFunction: (data) => {
            const roles = data?.Roles
            if (roles) {
                const userRolesList = []
                if (roles && roles.length) {
                    roles.forEach(role => {
                        userRolesList.push({
                            id: role.id,
                            name: role.name
                        })
                    });
                }
                return userRolesList
            }
        },
        serializer: async(data) => {
            if (data) {
                const roleSerializer = new RoleSerializer()
                return await roleSerializer.serialize(data, false)
            }
        }
    },
    salons: {
        propertyName: "salons",
        groups: ["read"],
        customFunction: async(data) => {
            const salons = data?.Salons
            if (salons) {
                const userSalonsList = []
                if (salons && salons.length) {
                    for (let i = 0; i < salons.length; i++) {
                        const salon = salons[i]
                        const salonData = await (new SalonSerializer()).serialize(salon)
                        userSalonsList.push(
                            salonData
                        )
                    }
                }
                return userSalonsList
            }
        }
    }
}

const serializerGroups = ["read"]
class UserSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(User, fields, groups)
    }
}


module.exports = UserSerializer