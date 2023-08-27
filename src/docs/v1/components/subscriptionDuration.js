function getSubscriptionDurationDocs() {
    return {
        schemas: {
            SubscriptionDuration: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "SubscriptionDuration's identifier",
                        example: "1",
                    },
                    name: {
                        type: "string",
                        description: "SubscriptionDuration's name",
                        example: "Day",
                    },
                    interval: {
                        type: "string",
                        description: "SubscriptionDuration's interval",
                        example: "day",
                    }
                },
            }
        },
        
    }
}

module.exports = getSubscriptionDurationDocs()