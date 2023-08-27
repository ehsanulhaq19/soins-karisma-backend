
const {QuestionOptionType} = require("../../models")
const Serializer = require("./Serializer")

const fields = {
    id: {
        groups: ["read"]
    },
    name: {
        groups: ["read"]
    }
}

const serializerGroups = ["read"]
class QuestionOptionTypeSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(QuestionOptionType, fields, groups)
    }
}


module.exports = QuestionOptionTypeSerializer