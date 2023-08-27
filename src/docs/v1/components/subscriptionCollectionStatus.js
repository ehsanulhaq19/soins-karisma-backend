function getSubscriptionCollectionStatusDocs() {
    return {
        schemas: {
            SubscriptionCollectionStatus: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "SubscriptionCollectionStatus's identifier",
                        example: "1",
                    },
                    name: {
                        type: "string",
                        description: "SubscriptionCollectionStatus's name",
                        example: "Active",
                    }
                },
            }
        },
    }
}

module.exports = getSubscriptionCollectionStatusDocs()