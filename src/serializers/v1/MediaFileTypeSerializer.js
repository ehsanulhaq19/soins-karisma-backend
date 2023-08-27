
const {MediaFileType} = require("../../models")
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
class MediaFileTypeSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(MediaFileType, fields, groups)
    }
}


module.exports = MediaFileTypeSerializer