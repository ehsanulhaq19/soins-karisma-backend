function getSubscriptionDocs() {
    return {
        schemas: {
            UserSubscription: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "User identification uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    lastPaymentDate: {
                        type: "string",
                    },
                    totalAmount: {
                        type: "integer",
                    },
                    subTotalAmount: {
                        type: "integer",
                    },
                    taxTvq: {
                        type: "integer",
                    },
                    taxGst: {
                        type: "integer",
                    },
                    subscription: {
                        $ref: "#/components/schemas/Subscription",
                    }
                },
            }
        },
        paths: {
            "/api/v1/user_subscriptions": {
                post: {
                    tags: ["UserSubscription"],
                    description: "" +
                        "### UserSubscription post item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "postUserSubscriptionItem", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    userUuid: {
                                        type: "string",
                                        description: "User identification uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                    },
                                    subscriptionUuid: {
                                        type: "string",
                                        description: "Subscription identification uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                    },
                                }
                            },
                          },
                        },
                    },
                    responses: {
                        200: {
                            description: "Successfully created", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            subscription: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Subscription",
                                                    } 
                                                },
                                            },
                                        }
                                    },
                                }
                            },
                        },
                        400: {
                            description: "Bad request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        401: {
                            description: "Unauthorized request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        500: {
                            description: "Internal server error", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                    },
                },
                get: {
                    tags: ["UserSubscription"],
                    description: "" +
                        "### UserSubscription get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest" +
                        "\n\n" +
                        "### Groups\n" +
                        "   * paymentDetail",
                    operationId: "getUserSubscriptionCollection", 
                    parameters: [
                        {
                            "name": "page",
                            "in": "query",
                            "description": "The collection page number",
                            "required": false,
                            "deprecated": false,
                            "schema": {
                                "type": "integer",
                                "default": 1
                            },
                            "style": "form"
                        }, {
                            "name": "itemsPerPage",
                            "in": "query",
                            "description": "The number of items per page",
                            "required": false,
                            "deprecated": false,
                            "schema": {
                                "type": "integer",
                                "default": 30,
                                "minimum": 0,
                                "maximum": 1000
                            },
                            "style": "form"
                        }, {
                            "name": "pagination",
                            "in": "query",
                            "description": "Enable or disable pagination",
                            "required": false,
                            "deprecated": false,
                            "schema": {
                                "type": "boolean"
                            },
                            "style": "form"
                        },
                        {
                            name:"subscriptionUuid",
                            in:"query",
                            description:"subscriptionUuid name filter",
                            required:false,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
                        },
                        {
                            name:"groups",
                            in:"query",
                            description: "Groups",
                            required:false,
                            deprecated:false,
                            schema:{
                                type:"array"
                            },
                            style:"simple"
                        }
                    ],
                    requestBody: {
                    },
                    responses: {
                        200: {
                            description: "Successfully fetched", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            subscription: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Subscription",
                                                    } 
                                                },
                                            },
                                            paymentDetails: {
                                                type: "object"
                                            }
                                        }
                                    },
                                }
                            },
                        },
                        400: {
                            description: "Bad request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        401: {
                            description: "Unauthorized request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        404: {
                            description: "Not found", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        500: {
                            description: "Internal server error", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                    },
                },
            },
            "/api/v1/user_subscriptions/charge/success": {
                post: {
                    tags: ["UserSubscription"],
                    description: "" +
                        "### Subscription post item api in order to mark charge success to the subscription.\n\n" +
                        "This api will move user subscription to the pending status\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer" +
                        "",
                    operationId: "postUserSubscriptionChargeSuccessItem", 
                    parameters: [
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        userUuid: {
                                            type: "string",
                                            description: "User identification uuid",
                                            example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                        },
                                        subscriptionUuid: {
                                            type: "string",
                                            description: "Subscription identification uuid",
                                            example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                        },
                                    }
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Successfully fetched", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            message: {
                                                type: "string",
                                                example: "Response messaage"
                                            },
                                        }
                                    },
                                }
                            },
                        },
                        400: {
                            description: "Bad request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        401: {
                            description: "Unauthorized request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        404: {
                            description: "Not found", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        500: {
                            description: "Internal server error", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                    },
                },
            },
        },
    }
}

module.exports = getSubscriptionDocs()