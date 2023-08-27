
const {MediaFileStatus} = require("../../models")
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
class MediaFileStatusSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(MediaFileStatus, fields, groups)
    }
}


module.exports = MediaFileStatusSerializer