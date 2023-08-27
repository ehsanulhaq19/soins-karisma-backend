
const {MediaFile} = require("../../models")
const Serializer = require("./Serializer")
const MediaFileStatusSerializer = require("./MediaFileStatusSerializer")
const MediaFileTypeSerializer = require("./MediaFileTypeSerializer")
const uuidService = require("../../services/uuidService")

const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    reference: {
        groups: ["read"]
    },
    path: {
        groups: ["read"]
    },
    originalName: {
        groups: ["read"]
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.MediaFileStatus,
        serializer: async(data) => {
            if (data) {
                const mediaFileStatusSerializer = new MediaFileStatusSerializer()
                return await mediaFileStatusSerializer.serialize(data)
            }
        }
    },
    typeId: {
        propertyName: "type",
        groups: ["read"],
        relation: (data) => data.MediaFileType,
        serializer: async(data) => {
            if (data) {
                const mediaFileTypeSerializer = new MediaFileTypeSerializer()
                return await mediaFileTypeSerializer.serialize(data)
            }
        }
    },
}

const serializerGroups = ["read"]
class MediaFileSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(MediaFile, fields, groups)
    }
}


module.exports = MediaFileSerializer