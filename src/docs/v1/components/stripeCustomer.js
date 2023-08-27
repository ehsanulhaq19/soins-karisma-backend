function getStripeCustomerDocs() {
    return {
        paths: {
            "/api/v1/stripe_customer/payment_methods": {
                get: {
                    tags: ["StripeCustomer"],
                    description: "" +
                        "### Api will return all the payment methods attached with app user (Customer).\n\n" +
                        "### Permissions\n" +
                        "   * Customer\n" +
                        "   * Admin\n" +
                        "",
                    operationId: "getStripeCustomerPaymentMethodItem", 
                    parameters: [],
                    parameters: [
                        {
                            name:"userUuid",
                            in:"query",
                            description:"Resource identifier",
                            required:true,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
                        },
                    ],
                    requestBody: {},
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
                                            userAnswer: {
                                                type: "array",
                                                items: {
                                                    paymentMethod: {
                                                        type: "object"
                                                    },
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
            },
        },
    }
}

module.exports = getStripeCustomerDocs()