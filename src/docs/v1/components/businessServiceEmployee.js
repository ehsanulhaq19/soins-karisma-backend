function getBusinessServiceEmployeeDocs() {
    return {
        schemas: {
            BusinessServiceEmployee: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "Business service identification uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    employee: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/Employee",
                            } 
                        }
                    },
                    businessService: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/BusinessService",
                            } 
                        }
                    },
                },
            }
        },
        paths: {
            "/api/v1/business_service_employees": {
                get: {
                    tags: ["BusinessServiceEmployee"],
                    description: "" +
                        "### BusinessServiceEmployee get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "getBusinessServiceEmployeeCollection", 
                    parameters: [
                        {
                            "name": "businessServiceUuid",
                            "in": "query",
                            "description": "BusinessService uuid from which BusinessService belongs too",
                            "required": true,
                            "deprecated": false,
                            "schema": {
                                "type": "string"
                            },
                            "style": "form"
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
                                            businessServiceEmployee: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        uuid: {
                                                            type: "string",
                                                            description: "Business service identification uuid",
                                                            example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                                        },
                                                        businessService: {
                                                            type: "object",
                                                            properties: {
                                                                schema: {
                                                                    $ref: "#/components/schemas/BusinessService",
                                                                } 
                                                            }
                                                        },
                                                        employees: {
                                                            type: "array",
                                                            items: {
                                                                type: "object",
                                                                properties: {
                                                                    schema: {
                                                                        $ref: "#/components/schemas/Employee",
                                                                    } 
                                                                }
                                                            },
                                                        }
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
                    tags: ["BusinessServiceEmployee"],
                    description: "" +
                        "### BusinessServiceEmployee post item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "",
                    operationId: "postBusinessServiceEmployeeItem", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    businessServiceUuid: {
                                        type: "string",
                                        description: "BusinessService's uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                    },
                                    employeeUuid: {
                                        type: "string",
                                        description: "Employee's uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
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
                                            businessServiceEmployee: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/BusinessServiceEmployee",
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
            }
        }
    }
}

module.exports = getBusinessServiceEmployeeDocs()