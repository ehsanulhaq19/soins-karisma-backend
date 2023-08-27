function getCartStatusDocs() {
    return {
        schemas: {
            CartStatus: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "Cart status identifier",
                        example: "1",
                    },
                    name: {
                        type: "string",
                        description: "Status Name",
                        example: "Active",
                    },
                },
            }
        }
    }
}

module.exports = getCartStatusDocs()