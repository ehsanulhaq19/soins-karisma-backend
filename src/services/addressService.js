const {Address} = require("../models")
const statsues = require("../constants/statuses.json")

const createOrUpdateAddress = async(address, data) => {
    let addressObj = address
    
    if (!addressObj) {
        addressObj = await Address.create({})
    }

    await addressObj.update({
        firstName: data.firstName || addressObj.firstName,
        lastName: data.lastName || addressObj.lastName,
        address: data.address || addressObj.address,
        country: data.country || addressObj.country,
        state: data.state || addressObj.state,
        city: data.city || addressObj.city,
        postCode: data.postCode || addressObj.postCode,
        phoneNumber: data.phoneNumber || addressObj.phoneNumber,
    })

    return {
        type: statsues.SUCCESS,
        address: addressObj
    }
}

module.exports = {
    createOrUpdateAddress
}