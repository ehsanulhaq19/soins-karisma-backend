function getProductCollectionDocs() {
    return {
        schemas: {
            ProductCollection: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "Product collection identification uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    name: {
                        type: "string",
                        description: "Name",
                        example: "product_collection_1",
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
                    backgroundColor: {
                        type: "string",
                        description: "Background color in simple word or in hexa format",
                        example: "#ffffff",
                    },
                    status: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/ProductCollectionStatus",
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
                    },
                    products: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                schema: {
                                    $ref: "#/components/schemas/Product",
                                },
                                productQuantity: {
                                    type: "integer",
                                    description: "Product quantity integer",
                                    example: 3,
                                }
                            }
                        }
                    }
                },
            }
        },
        paths: {
            "/api/v1/product_collections": {
                post: {
                    tags: ["ProductCollection"],
                    description: "" +
                        "### Product collection post item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "",
                    operationId: "postProductCollectionItem", 
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
                                        example: "product_collection_1",
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
                                    backgroundColor: {
                                        type: "string",
                                        description: "Background color in simple word or in hexa format",
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
                                    products: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                productUuid: {
                                                    type: "string",
                                                    description: "Product identification uuid",
                                                    example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                                },
                                                productQuantity: {
                                                    type: "integer",
                                                    description: "Product quantity integer",
                                                    example: 3,
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
                                            backgroundColor: {
                                                type: "string",
                                                description: "Background color in simple word or in hexa format",
                                                example: "#ffffff",
                                            },
                                            product: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/ProductCollection",
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
                    tags: ["ProductCollection"],
                    description: "" +
                        "### Product collection get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "   * Customer\n" +
                        "   * Guest" +
                        "",
                    operationId: "getProductCollectionCollection", 
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
                                            productCollections: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        schema: {
                                                            $ref: "#/components/schemas/ProductCollection",
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
            "/api/v1/product_collections/{uuid}": {
                get: {
                    tags: ["ProductCollection"],
                    description: "" +
                        "### ProductCollection get item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "   * Customer" +
                        "",
                    operationId: "getProductCollectionItem", 
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
                                            productCollection: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/ProductCollection",
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
                    tags: ["ProductCollection"],
                    description: "" +
                        "### ProductCollection delete item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "",
                    operationId: "deleteProductCollectionItem", 
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
            }
        },
    }
}

module.exports = getProductCollectionDocs()