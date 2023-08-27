
const {QuestionStatus} = require("../../models")
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
class QuestionStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(QuestionStatus, fields, groups)
    }
}


module.exports = QuestionStatusSerializer