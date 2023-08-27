function getEmployeeDocs() {
    return {
        schemas: {
            Employee: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "Employee identification uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    calendarColor: {
                        type: 'string',
                        description: 'The employee calendar color',
                        example: 'yellow or #ffffff'
                    },
                    user: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/User",
                            } 
                        }
                    },
                    salon: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/Salon",
                            } 
                        }
                    },
                    employeeRole: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/employeeRoles",
                            } 
                        },
                    },
                    
                }
            }
        },
        paths: {
            "/api/v1/employees": {
                get: {
                    tags: ["Employee"],
                    description: "" +
                        "### Employee get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "getEmployeeCollection", 
                    parameters: [
                        {
                            "name": "salonUuid",
                            "in": "query",
                            "description": "Salon uuid from which employee belongs too",
                            "required": false,
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
                        },
                        {
                            "name": "businessServiceUuid",
                            "in": "query",
                            "description": "BusinessService uuid from which employee belongs too",
                            "required": false,
                            "deprecated": false,
                            "schema": {
                                "type": "string"
                            },
                            "style": "form"
                        }, 
                        {
                            "name": "name",
                            "in": "query",
                            "description": "Employee name",
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
                            "description": "Active or deactive employee",
                            "required": false,
                            "deprecated": false,
                            "schema": {
                                "type": "boolean"
                            },
                            "style": "form"
                        },
                        {
                            name:"groups",
                            in:"query",
                            description:"Resource field groups e.g (businessServices)",
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
                                            employees: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Employee",
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
            },
            "/api/v1/employees/{uuid}": {
                get: {
                    tags: ["Employee"],
                    description: "" +
                        "### Employee get item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "getEmployeeItem", 
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
                                            employee: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Employee",
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
                    tags: ["Employee"],
                    description: "" +
                        "### Employee patch item api.\n\n" +
                        "### Form fields\n\n" +
                        "   * #### Gender.\n" +
                        "     * Male - M.\n" +
                        "     * Female - F.\n" +
                        "     * Other - O.\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Employee\n" +
                        "",
                    operationId: "patchEmployeeItem", 
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
                                    gender: {
                                        type: "string",
                                        description: "User's gender",
                                        example: "M",
                                    },
                                    calendarColor: {
                                        type: 'string',
                                        description: 'The employee calendar color',
                                        example: 'yellow or #ffffff'
                                    },
                                    statusId: {
                                        type: "string",
                                        description: "User's status",
                                        example: 1,
                                    },
                                    profileImage: {
                                        type: "string",
                                        description: "Employee's profileImage",
                                        example: "https://www.example.com/image.png",
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
                                                        $ref: "#/components/schemas/Employee",
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
            "/api/v1/employees/role": {
                post: {
                    tags: ["Employee"],
                    description: "" +
                        "### Assign role to employee api.\n\n" +
                        "",
                    operationId: "assignRoleToEmployee",
                    parameters: [
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        employeeUuid: {
                                            type: "string",
                                            example: "xxxxxxxxxxxxxxxxxxxxxxxxxx"
                                        },
                                        roleUuid: {
                                            type: "integer",
                                            example: 1
                                        }
                                    }
                                },
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Role assigned successfully!", 
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
                                                example: "Role assigned successfully!"
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
                                        $ref: "#/components/schemas/BadRequestError",
                                    } 
                                }
                            },
                        },
                        401: {
                            description: "Unauthorized request", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/UnauthorizedError",
                                    } 
                                }
                            },
                        },
                        404: {
                            description: "Not found", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/NotFoundError",
                                    } 
                                }
                            },
                        },
                        409: {
                            description: "Conflict", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 409
                                            },
                                            message: {
                                                type: "string",
                                                example: "Employee already has this role",
                                            },
                                        }
                                    } 
                                }
                            },
                        },
                        500: {
                            description: "Internal server error", 
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/InternalServerError",
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

module.exports = getEmployeeDocs()