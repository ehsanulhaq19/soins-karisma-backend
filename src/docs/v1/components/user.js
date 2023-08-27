function getAuthDocs() {
    return {
        schemas: {
            User: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "User identification uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    email: {
                        type: "email",
                        description: "User's email",
                        example: "testuser@example.com",
                    },
                    firstName: {
                        type: "string",
                        description: "User's firstName",
                        example: "Test",
                    },
                    lastName: {
                        type: "string",
                        description: "User's lastName",
                        example: "User",
                    },
                    profileImage: {
                        type: "string",
                        description: "User's profileImage",
                        example: "https://www.example.com/image.png",
                    },
                    lastName: {
                        type: "string",
                        description: "User's lastName",
                        example: "User",
                    },
                    locale: {
                        type: "string",
                        description: "User's locale",
                        example: "Can be (en, es or fr)",
                    },
                    type: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/UserType",
                            } 
                        },
                    },
                    address: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/Address",
                            } 
                        },
                    },
                    role: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/Role",
                            } 
                        },
                    },
                    salons: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/Salon",
                            } 
                        },
                    },
                },
            },

            UserAddress: {
                type: "object",
                properties: {
                    address: {
                        type: "string",
                        description: "address information"
                    },
                    country: {
                        type: "string",
                        description: "country information"
                    },
                    state: {
                        type: "string",
                        description: "state information"
                    },
                    city: {
                        type: "string",
                        description: "city information"
                    },
                    postCode: {
                        type: "string",
                        description: "postCode information"
                    },
                    phoneNumber: {
                        type: "string",
                        description: "phoneNumber information"
                    },
                    latitude: {
                        type: "string",
                        description: "latitude information"
                    },
                    longitude: {
                        type: "string",
                        description: "longitude information"
                    },
                },
            }
        },
        paths: {
            "/api/v1/users/{uuid}": {
                get: {
                    tags: ["User"],
                    description: "" +
                        "### User get item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Customer (Self)\n" +
                        "\n\n" + 
                        "### Groups\n\n" +
                        "   * subscriptions",
                    operationId: "getUserItem", 
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
                            name:"group",
                            in:"query",
                            description: "Groups",
                            required:false,
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
                                            user: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/User",
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
                patch: {
                    tags: ["User"],
                    description: "" +
                        "### User patch item api.\n\n" +
                        "   * Only customer can be attached with the salon.\n\n" +
                        "### Form fields\n\n" +
                        "   * #### Gender.\n" +
                        "     * Male - M.\n" +
                        "     * Female - F.\n" +
                        "     * Other - O.\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "patchUserItem", 
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
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    firstName: {
                                        type: "string",
                                        example: "test"
                                    },
                                    lastName: {
                                        type: "string",
                                        example: "user"
                                    },
                                    statusId: {
                                        type: "integer",
                                        example: 1
                                    },
                                    gender: {
                                        type: "string",
                                        description: "User's gender",
                                        example: "M",
                                    },
                                    locale: {
                                        type: "string",
                                        description: "User's locale",
                                        example: "Can be (en, es or fr)",
                                    },
                                    profileImage: {
                                        type: "string",
                                        description: "User's profileImage",
                                        example: "https://www.example.com/image.png",
                                    },
                                    salonUuid: {
                                        type: "string",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (required)" 
                                    },
                                    address: {
                                        $ref: "#/components/schemas/UserAddress"
                                    },
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Successfully updated", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            user: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/User",
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
            "/api/v1/users": {
                post: {
                    tags: ["User"],
                    description: "" +
                        "### User post item api.\n\n" +
                        "   * Only customer can be attached with the salon.\n\n" +
                        "### Form fields\n\n" +
                        "   * #### Gender.\n" +
                        "     * Male - M.\n" +
                        "     * Female - F.\n" +
                        "     * Other - O.\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "",
                    operationId: "postUserItem", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "email",
                                        description: "User's email",
                                        example: "testuser@example.com",
                                    },
                                    userName: {
                                        type: "string",
                                        example: "test123"
                                    },
                                    password: {
                                        type: "string"
                                    },
                                    firstName: {
                                        type: "string",
                                        example: "test"
                                    },
                                    lastName: {
                                        type: "string",
                                        example: "user"
                                    },
                                    locale: {
                                        type: "string",
                                        description: "User's locale",
                                        example: "Can be (en, es or fr)",
                                    },
                                    roleId: {
                                        type: "integer",
                                        example: "3"
                                    },
                                    statusId: {
                                        type: "integer",
                                        example: "1"
                                    },
                                    gender: {
                                        type: "string",
                                        description: "User's gender",
                                        example: "M",
                                    },
                                    salonUuid: {
                                        type: "string",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (required)" 
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
                                            user: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/User",
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
            "/api/v1/users/{uuid}/address": {
                get: {
                    tags: ["User"],
                    description: "" +
                        "### User get address collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Customer (Self)\n" +
                        "\n\n",
                    operationId: "getUserAddressCollection", 
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
                                            addresses: {
                                                type: "object",
                                                properties: {
                                                    shippingAddresses: {
                                                        type: "array",
                                                        items: {
                                                            $ref: "#/components/schemas/Address",
                                                        },
                                                    },
                                                    billingAddresses: {
                                                        type: "array",
                                                        items: {
                                                            $ref: "#/components/schemas/Address",
                                                        },
                                                    }
                                                }
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
            }
        }
    }
}

module.exports = getAuthDocs()