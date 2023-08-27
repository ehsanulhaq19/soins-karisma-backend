const encodeUuid = (uuid) => {
    if (!uuid) {
        return ''
    }
    const tempUuid = uuid.split("-").reverse()
    let reverseUuid = ""
    tempUuid.forEach((x, i) => {
        reverseUuid = `${reverseUuid}${x.split('').reverse().join('')}${(tempUuid.length - 1 != i ? "-" : "")}`
    })
    const encodedString = Buffer.from(reverseUuid).toString('base64')
    return Buffer.from(encodedString).toString('base64')
}

const decodeUuid = (uuid) => {
    if (!uuid) {
        return ''
    }
    const decodedString = Buffer.from(uuid, 'base64').toString('ascii')
    const decodedReversedUuid = Buffer.from(decodedString, 'base64').toString('ascii')
    const tempUuid = decodedReversedUuid.split("-").reverse()
    let reverseUuid = ""
    tempUuid.forEach((x, i) => {
        reverseUuid = `${reverseUuid}${x.split('').reverse().join('')}${(tempUuid.length - 1 != i ? "-" : "")}`
    })
    return reverseUuid
}

const isValidUuid = (uuid) => {
    if (!uuid) {
        return false
    }

    const maxUuidParts = 5
    const uuidArray = uuid.split("-")
    if (uuidArray.length === maxUuidParts) {
        let isValid = true
        uuidArray.forEach(uuidString => {
            if (!uuidString.length) {
                isValid = false
            }
        })

        return isValid
    }

    return false
}

module.exports = {
    encodeUuid,
    decodeUuid,
    isValidUuid
}