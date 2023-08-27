function getBusinessServiceDocs() {
    return {
        schemas: {
            BusinessService: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "Business service identification uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    name: {
                        type: "string",
                        description: "BusinessService's name",
                        example: "Facial",
                    },
                    description: {
                        type: "string",
                        description: "BusinessService's description",
                        example: "Description...",
                    },
                    price: {
                        type: "integer",
                        description: "BusinessService's price",
                        example: 100,
                    },
                    duration: {
                        type: "integer",
                        description: "BusinessService's duration in minutes",
                        example: 60,
                    },
                    salon: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/Salon",
                            } 
                        }
                    },
                },
            }
        },
        paths: {
            "/api/v1/business_services": {
                get: {
                    tags: ["BusinessService"],
                    description: "" +
                        "### BusinessService get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "getBusinessServiceCollection", 
                    parameters: [
                        {
                            "name": "salonUuid",
                            "in": "query",
                            "description": "Salon uuid from which BusinessService belongs too",
                            "required": false,
                            "deprecated": false,
                            "schema": {
                                "type": "string"
                            },
                            "style": "form"
                        }, {
                            "name": "employeeIds[]",
                            "in": "query",
                            "description": "",
                            "required": false,
                            "deprecated": false,
                            "allowEmptyValue": true,
                            "schema": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                }
                            },
                            "style": "form",
                            "explode": true,
                            "allowReserved": false
                        }, {
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
                            "name": "name",
                            "in": "query",
                            "description": "Business service name",
                            "required": false,
                            "deprecated": false,
                            "schema": {
                                "type": "string"
                            },
                            "style": "form"
                        }, 
                        {
                            "name": "orderBy",
                            "in": "query",
                            "type": "string",
                            "default": 'ASC',
                            "enums": [
                                "ASC",
                                "DESC",
                                null
                            ],
                            "description": "Order by ASC or DESC",
                            "deprecated": false,
                            "required": false,
                            "style": "form"
                        },
                        {
                            "name": "isActive",
                            "in": "query",
                            "description": "Active or deactive business service",
                            "required": false,
                            "deprecated": false,
                            "schema": {
                                "type": "boolean"
                            },
                            "style": "form"
                        },
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
                                            businessServices: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/BusinessService",
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
                post: {
                    tags: ["BusinessService"],
                    description: "" +
                        "### BusinessService post item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "",
                    operationId: "postBusinessServiceItem", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "BusinessService's name",
                                        example: "Facial",
                                    },
                                    description: {
                                        type: "string",
                                        description: "BusinessService's description",
                                        example: "Description...",
                                    },
                                    price: {
                                        type: "integer",
                                        description: "BusinessService's price",
                                        example: 100,
                                    },
                                    duration: {
                                        type: "integer",
                                        description: "BusinessService's duration in minutes",
                                        example: 60,
                                    },
                                    salonUuid: {
                                        type: "string",
                                        description: "Salon's uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                    },
                                    rooms: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                totalChairs: {
                                                    type: "integer",
                                                    description: "Total number of chairs in a room",
                                                    example: "2",
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
                                            businessService: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/BusinessService",
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
            "/api/v1/business_services/{uuid}": {
                get: {
                    tags: ["BusinessService"],
                    description: "" +
                        "### BusinessService get item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "getBusinessServiceItem", 
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
                        }, {
                            "name": "fields[]",
                            "in": "query",
                            "description": "availableSlots",
                            "required": false,
                            "deprecated": false,
                            "allowEmptyValue": true,
                            "schema": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                }
                            },
                            "style": "form",
                            "explode": true,
                            "allowReserved": false
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
                                            businessService: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/BusinessService",
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
                    tags: ["BusinessService"],
                    description: "" +
                        "### BusinessService patch item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "",
                    operationId: "patchBusinessServiceItem", 
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
                                        description: "BusinessService's name",
                                        example: "Facial",
                                    },
                                    description: {
                                        type: "string",
                                        description: "BusinessService's description",
                                        example: "Description...",
                                    },
                                    price: {
                                        type: "integer",
                                        description: "BusinessService's price",
                                        example: 100,
                                    },
                                    duration: {
                                        type: "integer",
                                        description: "BusinessService's duration in minutes",
                                        example: 60,
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
                                            cartItem: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/BusinessService",
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
                }
            }
        }
    }
}

module.exports = getBusinessServiceDocs()