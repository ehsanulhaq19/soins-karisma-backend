const uuidService = require("../services/uuidService")

const getPasswordFromUuid = (uuid) => {
    if (!uuid) {
        return null
    }
    const encodedUuid = uuidService.encodeUuid(uuid)
    return encodedUuid.substring(0, 10)
}

module.exports = {
    getPasswordFromUuid
}