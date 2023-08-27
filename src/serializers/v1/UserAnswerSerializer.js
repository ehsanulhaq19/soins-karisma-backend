const {UserAnswer} = require("../../models")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")
const QuestionSerializer = require("./QuestionSerializer")
const QuestionOptionSerializer = require("./QuestionOptionSerializer")
const UserSerializer = require("./UserSerializer")

/**
 * Fields to expose
 */
const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    userId: {
        propertyName: "user",
        groups: ["read"],
        relation: (data) => data.User,
        serializer: async(data) => {
            if (data) {
                const userSerializer = new UserSerializer()
                return await userSerializer.serialize(data)
            }
        }
    },
    questionId: {
        propertyName: "question",
        groups: ["read"],
        relation: (data) => data.Question,
        serializer: async(data) => {
            if (data) {
                const questionSerializer = new QuestionSerializer()
                return await questionSerializer.serialize(data)
            }
        }
    },
    questionOptionId: {
        propertyName: "questionOption",
        groups: ["read"],
        relation: (data) => data.QuestionOption,
        serializer: async(data) => {
            if (data) {
                const questionOptionSerializer = new QuestionOptionSerializer()
                return await questionOptionSerializer.serialize(data)
            }
        }
    },
    
}

const serializerGroups = ["read"]

class UserAnswerSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(UserAnswer, fields, groups)
    }
}


module.exports = UserAnswerSerializer