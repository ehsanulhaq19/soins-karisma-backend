function getSubscriptionStatusDocs() {
    return {
        schemas: {
            SubscriptionStatus: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "SubscriptionStatus's identifier",
                        example: "1",
                    },
                    name: {
                        type: "string",
                        description: "SubscriptionStatus's name",
                        example: "Active",
                    }
                },
            }
        },
    }
}

module.exports = getSubscriptionStatusDocs()