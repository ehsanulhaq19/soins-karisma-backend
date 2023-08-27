
const {QuestionType} = require("../../models")
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
class QuestionTypeSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(QuestionType, fields, groups)
    }
}


module.exports = QuestionTypeSerializer