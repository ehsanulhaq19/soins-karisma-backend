const {Address} = require("../models")

const addOrUpdateAddress = async(data) => {
    const {
        id,
        firstName = null,
        lastName = null,
        address = null,
        country = null,
        state = null,
        city = null,
        postCode = null,
        phoneNumber = null,
        latitude = null,
        longitude = null
    } = data

    let addressObject
    if (id) {
        addressObject = await Address.findOne({
            where: {
                id: id
            }
        })
    } else {
        addressObject = await Address.create({})
    }

    await addressObject.update({
        firstName,
        lastName,
        address,
        country,
        state,
        city,
        postCode,
        phoneNumber,
        latitude,
        longitude
    })

    return addressObject
}

module.exports = {
    addOrUpdateAddress
}