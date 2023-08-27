function getAddressDocs() {
    return {
        schemas: {
            Address: {
                type: "object",
                properties: {
                    firstName: {
                        type: "string",
                        description: "firstName information"
                    },
                    lastName: {
                        type: "string",
                        description: "lastName information"
                    },
                    address: {
                        type: "string",
                        description: "address information"
                    },
                    country: {
                        type: "string",
                        description: "country information"
                    },
                    state: {
                        type: "string",
                        description: "state information"
                    },
                    city: {
                        type: "string",
                        description: "city information"
                    },
                    postCode: {
                        type: "string",
                        description: "postCode information"
                    },
                    phoneNumber: {
                        type: "string",
                        description: "phoneNumber information"
                    },
                    latitude: {
                        type: "string",
                        description: "latitude information"
                    },
                    longitude: {
                        type: "string",
                        description: "longitude information"
                    },
                },
            }
        },
    }
}

module.exports = getAddressDocs()