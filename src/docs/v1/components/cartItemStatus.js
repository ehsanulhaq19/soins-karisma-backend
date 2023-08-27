function getCartItemStatusDocs() {
    return {
        schemas: {
            CartItemStatus: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "Cart item status identifier",
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

module.exports = getCartItemStatusDocs()