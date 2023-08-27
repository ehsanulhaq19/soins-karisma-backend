const {Cart} = require("../../models")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")
const QuestionSerializer = require("./QuestionSerializer")
const QuestionOptionStatusSerializer = require("./QuestionOptionStatusSerializer")
const QuestionOptionTypeSerializer = require("./QuestionOptionTypeSerializer")

/**
 * Fields to expose
 */
const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    content: {
        groups: ["read"]
    },
    questionId: {
        propertyName: "question",
        groups: ["extended"],
        relation: (data) => data.Question,
        serializer: async(data) => {
            if (data) {
                const questionSerializer = new QuestionSerializer()
                return await questionSerializer.serialize(data)
            }
        }
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.QuestionOptionStatus,
        serializer: async(data) => {
            if (data) {
                const questionOptionStatusSerializer = new QuestionOptionStatusSerializer()
                return await questionOptionStatusSerializer.serialize(data)
            }
        }
    },
    typeId: {
        propertyName: "type",
        groups: ["read"],
        relation: (data) => data.QuestionOptionType,
        serializer: async(data) => {
            if (data) {
                const questionOptionTypeSerializer = new QuestionOptionTypeSerializer()
                return await questionOptionTypeSerializer.serialize(data)
            }
        }
    },
}

const serializerGroups = ["read"]

class CartSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(Cart, fields, groups)
    }
}


module.exports = CartSerializer