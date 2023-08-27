const Serializer = require("./Serializer")
const { Note, User } = require('../../models');
const uuidService = require('../../services/uuidService')
// const SalonSerializer = require("./SalonSerializer")
const UserSerializer = require("./UserSerializer")


const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    title: {
        groups: ["read"]
    },
    description: {
        groups: ["read"]
    },
    // salonId: {
    //     propertyName: "salon",
    //     groups: ["read"],
    //     relation: (data) => {
    //         return data.Salon
    //     },
    //     serializer: async(data) => {
    //         if (data) {
    //             const salonSerializer = new SalonSerializer();
    //             return await salonSerializer.serialize(data, false)
    //         }
    //     }
    // },
    userId: {
        propertyName: "user",
        groups: ["read"],
        relation: (data) => {
            return data.userId
        },
        serializer: async(userId) => {
            if (userId) {
                const data = await User.findOne({ where: { id: userId } })
                if (data) {
                    return {
                        uuid: uuidService.encodeUuid(data.uuid),
                        firstName: data.firstName,
                        lastName: data.lastName,
                    }
                } else {
                    return null
                }
            }
        }
    },
    createdAt: {
        groups: ["read"]
    },
    updatedAt: {
        groups: ["read"]
    }
}

const serializerGroups = ["read"]

class NoteSerializer extends Serializer {
    constructor(groups = serializerGroups) {
        super(Note, fields, groups)
    }
}

module.exports = NoteSerializer;