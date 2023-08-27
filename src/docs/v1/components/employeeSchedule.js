function getEmployeeScheduleDocs() {
    return {
        schemas: {
            EmployeeSchedule: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "EmployeeSchedule identification uuid",
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
                    startTime: {
                        type: "string",
                        description: "EmployeeSchedule's startTime",
                        example: "09:00:00",
                    },
                    endTime: {
                        type: "string",
                        description: "EmployeeSchedule's endTime",
                        example: "18:00:00",
                    },
                },
            }
        },
        paths: {
            "/api/v1/employee_schedules": {
                post: {
                    tags: ["EmployeeSchedule"],
                    description: "" +
                        "### EmployeeSchedule post item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "",
                    operationId: "postEmployeeScheduleItem", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    startTime: {
                                        type: "string",
                                        description: "EmployeeSchedule's startTime",
                                        example: "09:00:00",
                                    },
                                    endTime: {
                                        type: "string",
                                        description: "EmployeeSchedule's endTime",
                                        example: "18:00:00",
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
                                            businessService: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/EmployeeSchedule",
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
                get: {
                    tags: ["EmployeeSchedule"],
                    description: "" +
                        "### Get employee all available slots with in a provided time period.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "getEmployeeScheduleCollection", 
                    parameters: [
                        {
                            "name": "employeeUuid",
                            "in": "query",
                            "description": "Employee uuid from which EmployeeSchedule belongs too",
                            "required": true,
                            "deprecated": false,
                            "schema": {
                                "type": "string"
                            },
                            "style": "form"
                        }, {
                            "name": "startDateTime",
                            "in": "query",
                            "description": "Employee schedule start date time",
                            "required": false,
                            "deprecated": false,
                            "schema": {
                                "type": "string",
                                "example": "2023-01-01T01:00:00"
                            },
                            "style": "form"
                        }, {
                            "name": "endDateTime",
                            "in": "query",
                            "description": "Employee schedule end date time",
                            "required": false,
                            "deprecated": false,
                            "schema": {
                                "type": "string",
                                "example": "2023-01-01T01:00:00"
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
                        }, {
                            "name": "duration",
                            "in": "query",
                            "description": "Duration of the slots [15, 30, 45, 60]",
                            "required": false,
                            "deprecated": false,
                            "schema": {
                                "type": "integer",
                                "default": 30,
                                "minimum": 15,
                                "maximum": 60
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
                                            employees: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/EmployeeSchedule",
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
        }
    }
}

module.exports = getEmployeeScheduleDocs()