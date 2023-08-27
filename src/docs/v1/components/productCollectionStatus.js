function getProductCollectionStatusDocs() {
    return {
        schemas: {
            ProductCollectionStatus: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "Product collection status identifier",
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

module.exports = getProductCollectionStatusDocs()