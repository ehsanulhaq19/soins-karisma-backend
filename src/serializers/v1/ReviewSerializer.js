const { Review, User } = require('../../models');
const uuidService = require('../../services/uuidService');
const Serializer = require('./Serializer');

const fields = {
    uuid: {
        groups: ['read'],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    rating: {
        groups: ['read']
    },
    text: {
        groups: ['read']
    },
    userId: {
        propertyName: "user",
        groups: ["read"],
        relation: (data) => {
            return data.userId
        },
        serializer: async(data) => {
            if (data) {
                const user = await User.findOne({ where: { id: data } });
                if (user) {
                    return {
                        uuid: uuidService.encodeUuid(user.uuid),
                        firstName: user.firstName,
                        lastName: user.lastName,
                    } 
                } else {
                    return null
                }
            }
        }
    },
    createdAt: {
        groups: ['read']
    },
    updatedAt: {
        groups: ['read']
    }
};

const serializerGroups = ['read'];
class ReviewSerializer extends Serializer {
    constructor(groups = serializerGroups) {
        super(Review, fields, groups);
    }
}

module.exports = ReviewSerializer;
