function getOrderDocs() {
    return {
        schemas: {
            Order: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "Order identification uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    cart: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/Cart",
                            }
                        }
                    },
                    totalAmount: {
                        type: "integer",
                        description: "Total amount of the order",
                        example: "120.25",
                    },
                    user: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/User",
                            } 
                        }
                    },
                    status: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/OrderStatus",
                            } 
                        }
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
                },
            },
            "Order.ShippingAddress": {
                type: "object",
                properties: {
                    firstName: {
                        type: "string"
                    },
                    lastName: {
                        type: "string"
                    },
                    address: {
                        type: "string"
                    },
                    country: {
                        type: "string"
                    },
                    state: {
                        type: "string"
                    },
                    city: {
                        type: "string"
                    },
                    postCode: {
                        type: "string"
                    },
                    phoneNumber: {
                        type: "string"
                    }
                }
            },
            "Order.BillingAddress": {
                type: "object",
                properties: {
                    address: {
                        type: "string"
                    },
                    country: {
                        type: "string"
                    },
                    state: {
                        type: "string"
                    },
                    city: {
                        type: "string"
                    },
                    postCode: {
                        type: "string"
                    },
                    phoneNumber: {
                        type: "string"
                    }
                }
            }
        },
        paths: {
            "/api/v1/orders/{uuid}": {
                get: {
                    tags: ["Order"],
                    description: "" +
                        "### Order get item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer" +
                        "",
                    operationId: "getOrderItem", 
                    parameters: [
                        {
                            name:"uuid",
                            in:"path",
                            description:"Resource identifier",
                            required:true,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
                        },
                        {
                            name:"groups",
                            in:"query",
                            description:"Resource field groups e.g(paymentInfo)",
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
                                            order: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Order",
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
            "/api/v1/orders/{uuid}/charge/success": {
                post: {
                    tags: ["Order"],
                    description: "" +
                        "### Order post item api in order to mark charge success to the order.\n\n" +
                        "This api will move order to the pending status and will clear the cart.\n\n" +
                        "By moving the cart in pending status too.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer" +
                        "",
                    operationId: "postOrderChargeSuccessItem", 
                    parameters: [
                        {
                            name:"uuid",
                            in:"path",
                            description:"Resource identifier",
                            required:true,
                            deprecated:false,
                            schema:{
                                type:"string"
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
                                            order: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Order",
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

module.exports = getOrderDocs()