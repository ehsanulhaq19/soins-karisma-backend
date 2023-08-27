
const {QuestionOptionStatus} = require("../../models")
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
class QuestionOptionStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(QuestionOptionStatus, fields, groups)
    }
}


module.exports = QuestionOptionStatusSerializer