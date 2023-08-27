function getStripeDocs() {
    return {
        paths: {
            "/api/v1/stripe/subscription/checkout_session": {
                post: {
                    tags: ["Stripe"],
                    description: "Subscription post item api", 
                    operationId: "postStripeSubscriptionCheckoutSession", 
                    parameters: [],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        subscriptionUuid: {
                                            type: "string",
                                            description: "Subscription's uuid",
                                            example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (required)",
                                        }
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
                                            checkoutLink: {
                                                type: "string"
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
                            description: "Unauthorized request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        409: {
                            description: "Conflict request", 
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
            "/api/v1/stripe/subscription/checkout": {
                post: {
                    tags: ["Stripe"],
                    description: "" +
                        "### Subscription post item api.\n\n" +
                        "### Permissions\n" +
                        "   * Customer\n" +
                        "   * Guest" +
                        "",
                    operationId: "postStripeSubscriptionCheckout", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    subscriptionUuid: {
                                        type: "string",
                                        description: "Subscription's uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (required)"
                                    },
                                    cardNumber: {
                                        type: "string",
                                        description: "User's credit card number",
                                        example: "xxxxxxxxxxxxxxxx (required)"
                                    },
                                    month: {
                                        type: "integer",
                                        description: "User's credit card expiry month",
                                        example: "12 (required)"
                                    },
                                    year: {
                                        type: "integer",
                                        description: "User's credit card expiry year",
                                        example: "2025 (required)"
                                    },
                                    cvc: {
                                        type: "integer",
                                        description: "User's credit card cvc",
                                        example: "123 (required)"
                                    }
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
                                            message: {
                                                type: "string"
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
                            description: "Unauthorized request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        409: {
                            description: "Conflict request", 
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
            "/api/v1/stripe/subscription/payment_intent": {
                post: {
                    tags: ["Stripe"],
                    description: "Subscription payment intent post item api", 
                    operationId: "postStripeSubscriptionPaymentIntent", 
                    parameters: [],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        subscriptionUuid: {
                                            type: "string",
                                            description: "Subscription's uuid",
                                            example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (required)",
                                        }
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
                                            paymentIntentId: {
                                                type: "string",
                                                description: "Payment intent id",
                                                example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                            },
                                            clientSecret: {
                                                type: "string",
                                                description: "Client secret",
                                                example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                            },
                                            subscriptoinUuid: {
                                                type: "string",
                                                description: "Subscription resource identifier",
                                                example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
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
                            description: "Unauthorized request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        409: {
                            description: "Conflict request", 
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
            "/api/v1/stripe/subscription/charge": {
                post: {
                    tags: ["Stripe"],
                    description: "" +
                    "### Stripe subscription charge post item api.\n\n" +
                    "### Permissions\n" +
                    "   * Customer\n" +
                    "   * Guest" +
                    "",
                    operationId: "postStripeSubscriptionCharge", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    subscriptionUuid: {
                                        type: "string",
                                        description: "Subscription's uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (required)"
                                    },
                                    stripePaymentSourceId: {
                                        type: "string",
                                        description: "Stripe payment source id",
                                        example: "src_1Mu******************** (required)"
                                    },
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Successfully charged", 
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
                                                $ref: "#/components/schemas/Subscription",
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
                            description: "Unauthorized request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        409: {
                            description: "Conflict request", 
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
            "/api/v1/stripe/subscription/payment_sheet": {
                post: {
                    tags: ["Stripe"],
                    description: "" +
                    "### Stripe subscription payment sheet post item api.\n\n" +
                    "### Permissions\n" +
                    "   * Customer\n" +
                    "",
                    operationId: "postStripeSubscriptionPaymentSheet", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    subscriptionUuid: {
                                        type: "string",
                                        description: "Subscription's uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (required)"
                                    },
                                    billingAddress: {
                                        type: "object",
                                        properties: {
                                            state: {
                                                type: "string",
                                                description: "Subscription's billing address state"
                                            }
                                        }
                                    },
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Successfully charged", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            userSubscription: {
                                                $ref: "#/components/schemas/UserSubscription",
                                            },
                                            customerId: {
                                                type: "string",
                                                example: "******************"
                                            },
                                            setupIntent: {
                                                type: "string",
                                                example: "******************"
                                            },
                                            ephemeralKey: {
                                                type: "string",
                                                example: "******************"
                                            },
                                            paymentIntentId: {
                                                type: "string",
                                                example: "******************"
                                            },
                                            clientSecret: {
                                                type: "string",
                                                example: "******************"
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
                            description: "Unauthorized request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        409: {
                            description: "Conflict request", 
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
            "/api/v1/stripe/order/checkout": {
                post: {
                    tags: ["Stripe"],
                    summary: "(Depricated)",
                    description: "" +
                    "### Stripe order checkout post item api.\n\n" +
                    "### Permissions\n" +
                    "   * Customer" +
                    "",
                    operationId: "postStripeOrderCheckout", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    cartUuid: {
                                        type: "string",
                                        description: "Cart's uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (required)"
                                    },
                                    cardNumber: {
                                        type: "string",
                                        description: "User's credit card number",
                                        example: "xxxxxxxxxxxxxxxx (required)"
                                    },
                                    month: {
                                        type: "integer",
                                        description: "User's credit card expiry month",
                                        example: "12 (required)"
                                    },
                                    year: {
                                        type: "integer",
                                        description: "User's credit card expiry year",
                                        example: "2025 (required)"
                                    },
                                    cvc: {
                                        type: "integer",
                                        description: "User's credit card cvc",
                                        example: "123 (required)"
                                    },
                                    shippingAddress: {
                                        type: "object",
                                        properties: {
                                            schema: {
                                                $ref: "#/components/schemas/Order.ShippingAddress",
                                            }
                                        }
                                    },
                                    billingAddress: {
                                        type: "object",
                                        properties: {
                                            schema: {
                                                $ref: "#/components/schemas/Order.BillingAddress",
                                            }
                                        }
                                    }
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
                                            orderUuid: {
                                                type: "string",
                                                description: "Cart's uuid",
                                                example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
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
                            description: "Unauthorized request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        409: {
                            description: "Conflict request", 
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
            "/api/v1/stripe/order/payment_intent": {
                post: {
                    tags: ["Stripe"],
                    description: "" +
                    "### Stripe order payment intent post item api.\n\n" +
                    "### Permissions\n" +
                    "   * Customer\n" +
                    "   * Guest" +
                    "",
                    operationId: "postStripeOrderPaymentIntent", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    cartUuid: {
                                        type: "string",
                                        description: "Cart's uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (required)"
                                    },
                                    shippingAddress: {
                                        $ref: "#/components/schemas/Order.ShippingAddress",
                                    },
                                    billingAddress: {
                                        $ref: "#/components/schemas/Order.BillingAddress",
                                    }
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
                                            paymentIntentId: {
                                                type: "string",
                                                description: "Payment intent id",
                                                example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                            },
                                            clientSecret: {
                                                type: "string",
                                                description: "Client secret",
                                                example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                            },
                                            customerId: {
                                                type: "string",
                                                example: "******************",
                                                description:"Stripe customerId"
                                            },
                                            setupIntent: {
                                                type: "string",
                                                example: "******************",
                                                description:"Stripe setupIntent"
                                            },
                                            ephemeralKey: {
                                                type: "string",
                                                example: "******************",
                                                description:"Stripe ephemeralKey"
                                            },
                                            orderUuid: {
                                                type: "string",
                                                description: "Order resource identifier",
                                                example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                            },
                                            order: {
                                                $ref: "#/components/schemas/Order",
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
                            description: "Unauthorized request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        409: {
                            description: "Conflict request", 
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
            "/api/v1/stripe/order/charge": {
                post: {
                    tags: ["Stripe"],
                    description: "" +
                    "### Stripe order charge post item api.\n\n" +
                    "### Permissions\n" +
                    "   * Customer\n" +
                    "   * Guest" +
                    "",
                    operationId: "postStripeOrderCharge", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    orderUuid: {
                                        type: "string",
                                        description: "Order's uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (required)"
                                    },
                                    stripePaymentSourceId: {
                                        type: "string",
                                        description: "Stripe payment source id",
                                        example: "src_1Mu******************** (required)"
                                    },
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Successfully charged", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            order: {
                                                $ref: "#/components/schemas/Order",
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
                            description: "Unauthorized request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    } 
                                }
                            },
                        },
                        409: {
                            description: "Conflict request", 
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
            }
        },
    }
}

module.exports = getStripeDocs()