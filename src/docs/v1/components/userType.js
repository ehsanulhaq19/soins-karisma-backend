function getUserStatusDocs() {
    return {
        schemas: {
            UserType: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "User id",
                        example: 1,
                    },
                    name: {
                        type: "string",
                        description: "User type name",
                        example: "Default",
                    }
                },
            }
        },
    }
}

module.exports = getUserStatusDocs()