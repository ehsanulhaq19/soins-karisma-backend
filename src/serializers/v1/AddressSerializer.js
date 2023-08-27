
const {Address} = require("../../models")
const Serializer = require("./Serializer")

const fields = {
    firstName: {
      groups: ["read"]  
    },
    lastName: {
      groups: ["read"]  
    },
    address: {
      groups: ["read"]  
    },
    country: {
      groups: ["read"]  
    },
    state: {
      groups: ["read"]  
    },
    city: {
      groups: ["read"]  
    },
    postCode: {
      groups: ["read"]  
    },
    phoneNumber: {
      groups: ["read"]  
    },
    longitude: {
      groups: ["extended"]  
    },
    latitude: {
      groups: ["extended"]  
    }
}

const serializerGroups = ["read"]
class AddressSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(Address, fields, groups)
    }
}

module.exports = AddressSerializer