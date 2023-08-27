function getCartDocs() {
    return {
        schemas: {
            Cart: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "Cart identification uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    name: {
                        type: "string",
                        description: "Name",
                        example: "My cart",
                    },
                    description: {
                        type: "string",
                        description: "Description",
                        example: "Description...",
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
                                $ref: "#/components/schemas/CartStatus",
                            } 
                        }
                    }
                },
            }
        },
        paths: {
            "/api/v1/carts/{uuid}": {
                get: {
                    tags: ["Cart"],
                    description: "" +
                        "### Cart get item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest" +
                        "",
                    operationId: "getCartItem", 
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
                            description:"Field groups e.g (cartItems)",
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
                                            cart: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Cart",
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
                    tags: ["Cart"],
                    description: "" +
                        "### Cart patch item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest" +
                        "",
                    operationId: "patchCartItem", 
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
                                    name: {
                                        type: "string",
                                        description: "Name",
                                        example: "My cart",
                                    },
                                    description: {
                                        type: "string",
                                        description: "Description",
                                        example: "Description...",
                                    },
                                    statusId: {
                                        type: "integer",
                                        description: "Status Id",
                                        example: 1,
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
                                            cart: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Cart",
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
                delete: {
                    tags: ["Cart"],
                    description: "" +
                        "### Cart delete item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest" +
                        "",
                    operationId: "deleteCartItem", 
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
                        204: {
                            description: "Successfully deleted", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 204
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
            "/api/v1/carts": {
                post: {
                    tags: ["Cart"],
                    description: "" +
                        "### Cart post item api.\n\n" +
                        "### Permissions\n" +
                        "   * Customer\n" +
                        "   * Guest" +
                        "",
                    operationId: "postCartItem", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "Name",
                                        example: "My cart",
                                    },
                                    description: {
                                        type: "string",
                                        description: "Description",
                                        example: "Description...",
                                    },
                                    statusId: {
                                        type: "integer",
                                        description: "Status Id",
                                        example: 1,
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
                                            cart: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Cart",
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
                    tags: ["Cart"],
                    description: "" +
                        "### Cart get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest" +
                        "",
                    operationId: "getCartCollection", 
                    parameters: [
                        {
                            "name": "page",
                            "in": "query",
                            "description": "Field groups e.g (cartItems)",
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
                            name:"group",
                            in:"query",
                            description:"Resource identifier",
                            required:false,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
                        },
                        {
                            name:"userUuid",
                            in:"query",
                            description:"Resource identifier",
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
                                            carts: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        schema: {
                                                            $ref: "#/components/schemas/Cart",
                                                        } 
                                                    },
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
            },
        },
    }
}

module.exports = getCartDocs()