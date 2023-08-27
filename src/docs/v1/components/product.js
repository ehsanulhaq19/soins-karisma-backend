function getProductDocs() {
    return {
        schemas: {
            Product: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "Product identification uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    name: {
                        type: "string",
                        description: "Name",
                        example: "product1",
                    },
                    description: {
                        type: "string",
                        description: "Description",
                        example: "Description...",
                    },
                    price: {
                        type: "string",
                        description: "Price",
                        example: "50.00",
                    },
                    rating: {
                        type: "string",
                        description: "Rating in percentage",
                        example: "90.50",
                    },
                    stock: {
                        type: "string",
                        description: "Stock",
                        example: 20,
                    },
                    imageUrl: {
                        type: "string",
                        description: "Image url",
                        example: "https://example.com/product-image",
                    },
                    url: {
                        type: "string",
                        description: "Url",
                        example: "https://example.com/product",
                    },
                    backgroundColor: {
                        type: "string",
                        description: "Background color",
                        example: "#ffffff",
                    },
                    status: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/ProductStatus",
                            } 
                        }
                    },
                    benefits: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                icon: {
                                    type: "string",
                                    description: "Icon name e.g 'Tick', (Can be null)",
                                    example: "Hydration"
                                },
                                label: {
                                    type: "string",
                                    description: "Label of the property (Can be null)",
                                    example: "Hydration"
                                },
                                content: {
                                    type: "string",
                                    description: "Property content",
                                    example: "Restore softness to your skin leaving an unforgetable feeling by providing a balanced moisturization."
                                }
                            }
                        }
                    },
                    ingredients: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                icon: {
                                    type: "string",
                                    description: "Icon name e.g 'Tick', (Can be null)",
                                    example: "Hydration"
                                },
                                label: {
                                    type: "string",
                                    description: "Label of the property (Can be null)",
                                    example: "Hydration"
                                },
                                content: {
                                    type: "string",
                                    description: "Property content",
                                    example: "Restore softness to your skin leaving an unforgetable feeling by providing a balanced moisturization."
                                }
                            }
                        }
                    }
                },
            }
        },
        paths: {
            "/api/v1/products/{uuid}": {
                get: {
                    tags: ["Product"],
                    description: "" +
                        "### Product get item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "   * Customer\n" +
                        "   * Guest" +
                        "",
                    operationId: "getProductItem", 
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
                                            product: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Product",
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
                    tags: ["Product"],
                    description: "" +
                        "### Product patch item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "",
                    operationId: "patchProductItem", 
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
                                        example: "product1",
                                    },
                                    description: {
                                        type: "string",
                                        description: "Description",
                                        example: "Description...",
                                    },
                                    price: {
                                        type: "string",
                                        description: "Price",
                                        example: "50.00",
                                    },
                                    rating: {
                                        type: "string",
                                        description: "Rating in percentage",
                                        example: "90.50",
                                    },
                                    stock: {
                                        type: "string",
                                        description: "Stock",
                                        example: 20,
                                    },
                                    imageUrl: {
                                        type: "string",
                                        description: "Image url",
                                        example: "https://example.com/product-image",
                                    },
                                    url: {
                                        type: "string",
                                        description: "Url",
                                        example: "https://example.com/product",
                                    },
                                    backgroundColor: {
                                        type: "string",
                                        description: "Background color",
                                        example: "#ffffff",
                                    },
                                    benefits: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                icon: {
                                                    type: "string",
                                                    description: "Icon name e.g 'Tick', (Can be null)",
                                                    example: "Hydration"
                                                },
                                                label: {
                                                    type: "string",
                                                    description: "Label of the property (Can be null)",
                                                    example: "Hydration"
                                                },
                                                content: {
                                                    type: "string",
                                                    description: "Property content",
                                                    example: "Restore softness to your skin leaving an unforgetable feeling by providing a balanced moisturization."
                                                }
                                            }
                                        }
                                    },
                                    ingredients: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                icon: {
                                                    type: "string",
                                                    description: "Icon name e.g 'Tick', (Can be null)",
                                                    example: "Hydration"
                                                },
                                                label: {
                                                    type: "string",
                                                    description: "Label of the property (Can be null)",
                                                    example: "Hydration"
                                                },
                                                content: {
                                                    type: "string",
                                                    description: "Property content",
                                                    example: "Restore softness to your skin leaving an unforgetable feeling by providing a balanced moisturization."
                                                }
                                            }
                                        }
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
                                            product: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Product",
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
                    tags: ["Product"],
                    description: "" +
                        "### Product delete item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "",
                    operationId: "deleteProductItem", 
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
            "/api/v1/products": {
                post: {
                    tags: ["Product"],
                    description: "" +
                        "### Product post item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "",
                    operationId: "postProductItem", 
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
                                        example: "product1",
                                    },
                                    description: {
                                        type: "string",
                                        description: "Description",
                                        example: "Description...",
                                    },
                                    price: {
                                        type: "string",
                                        description: "Price",
                                        example: "50.00",
                                    },
                                    rating: {
                                        type: "string",
                                        description: "Rating in percentage",
                                        example: "90.50",
                                    },
                                    stock: {
                                        type: "string",
                                        description: "Stock",
                                        example: 20,
                                    },
                                    imageUrl: {
                                        type: "string",
                                        description: "Image url",
                                        example: "https://example.com/product-image",
                                    },
                                    url: {
                                        type: "string",
                                        description: "Url",
                                        example: "https://example.com/product",
                                    },
                                    statusId: {
                                        type: "integer",
                                        description: "Status Id",
                                        example: 1,
                                    },
                                    backgroundColor: {
                                        type: "string",
                                        description: "Background color",
                                        example: "#ffffff",
                                    },
                                    benefits: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                icon: {
                                                    type: "string",
                                                    description: "Icon name e.g 'Tick', (Can be null)",
                                                    example: "Hydration"
                                                },
                                                label: {
                                                    type: "string",
                                                    description: "Label of the property (Can be null)",
                                                    example: "Hydration"
                                                },
                                                content: {
                                                    type: "string",
                                                    description: "Property content",
                                                    example: "Restore softness to your skin leaving an unforgetable feeling by providing a balanced moisturization."
                                                }
                                            }
                                        }
                                    },
                                    ingredients: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                icon: {
                                                    type: "string",
                                                    description: "Icon name e.g 'Tick', (Can be null)",
                                                    example: "Hydration"
                                                },
                                                label: {
                                                    type: "string",
                                                    description: "Label of the property (Can be null)",
                                                    example: "Hydration"
                                                },
                                                content: {
                                                    type: "string",
                                                    description: "Property content",
                                                    example: "Restore softness to your skin leaving an unforgetable feeling by providing a balanced moisturization."
                                                }
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
                                            product: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Product",
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
                    tags: ["Product"],
                    description: "" +
                        "### Product get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "   * Customer\n" +
                        "   * Guest" +
                        "",
                    operationId: "getProductCollection", 
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
                                            products: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        schema: {
                                                            $ref: "#/components/schemas/Product",
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

module.exports = getProductDocs()