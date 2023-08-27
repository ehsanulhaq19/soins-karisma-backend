const {MediaFile} = require("../models")
const MediaFileStatusValues = require("../models/values/MediaFileStatus")
const MediaFileTypeValues = require("../models/values/MediaFileType")

const createMediaFIle = async(data) => {
    const {reference, originalName, path} = data

    const mediaFile = await MediaFile.create({
        reference, 
        originalName, 
        path,
        statusId: MediaFileStatusValues.ACTIVE.id,
        typeId: MediaFileTypeValues.DEFAULT.id
    })

    return mediaFile
}

module.exports = {
    createMediaFIle
}