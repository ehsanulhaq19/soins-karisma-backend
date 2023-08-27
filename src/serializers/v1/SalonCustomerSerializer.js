const {Salon, User, SalonCustomer} = require("../../models")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")
const UserSerializer = require("./UserSerializer")

/**
 * Fields to expose
 */
const fields = {
    user: {
        groups: ["read"],
        propertyName: "user",
        relation: (data) => data.User,
        serializer: async(data, groups = []) => {
            if (data) {
                const userSerializeGroups = ["read", "extended"]
                if (groups?.length && groups.includes("subscriptions")) {
                    userSerializeGroups.push(
                        "subscriptions"
                    )
                }
                
                const userSerializer = new UserSerializer(userSerializeGroups)
                return await userSerializer.serialize(data)
            }
        }
    }
}

const serializerGroups = ["read"]

class SalonCustomerSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(SalonCustomer, fields, groups)
    }
}


module.exports = SalonCustomerSerializer