function getOrderStatusDocs() {
    return {
        schemas: {
            OrderStatus: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "Order status identifier",
                        example: "1",
                    },
                    name: {
                        type: "string",
                        description: "Status Name",
                        example: "Complete",
                    },
                },
            }
        }
    }
}

module.exports = getOrderStatusDocs()