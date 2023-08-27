function getProductStatusDocs() {
    return {
        schemas: {
            ProductStatus: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "Product status identifier",
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

module.exports = getProductStatusDocs()