const {Cart} = require("../../models")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")
const QuestionStatusSerializer = require("./QuestionStatusSerializer")
const QuestionTypeSerializer = require("./QuestionTypeSerializer")
const QuestionOptionSerializer = require("./QuestionOptionSerializer")

/**
 * Fields to expose
 */
const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    heading: {
        groups: ["read"]
    },
    position: {
        groups: ["read"]
    },
    questionOptions: {
        propertyName: "questionOptions",
        groups: ["questionOptions", "userAnswers"],
        customFunction: async(data, group = null) => {
            let questionOptionsData = []
            if (data?.QuestionOptions) {
                const questionOptions = data.QuestionOptions
                for(let i = 0; i < questionOptions.length; i++){
                    const questionOption = questionOptions[i]
                    let questionOptionData = {
                        ...(await (new QuestionOptionSerializer()).serialize(questionOption))
                    }
                    if (questionOption?.UserAnswers) {
                        let isSelected = false
                        if (questionOption?.UserAnswers?.length) {
                            isSelected = true
                        }
                        questionOptionData = {
                            ...questionOptionData,
                            isSelected
                        }
                    }
                    questionOptionsData.push(
                        questionOptionData
                    )
                }
            }

            return questionOptionsData
        }
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.QuestionStatus,
        serializer: async(data) => {
            if (data) {
                const questionStatusSerializer = new QuestionStatusSerializer()
                return await questionStatusSerializer.serialize(data, false)
            }
        }
    },
    typeId: {
        propertyName: "type",
        groups: ["read"],
        relation: (data) => data.QuestionType,
        serializer: async(data) => {
            if (data) {
                const questionTypeSerializer = new QuestionTypeSerializer()
                return await questionTypeSerializer.serialize(data, false)
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