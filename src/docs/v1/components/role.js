function getRoleDocs() {
    return {
        schemas: {
            Role: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "Role's identifier",
                        example: "1",
                    },
                    name: {
                        type: "string",
                        description: "Role's name",
                        example: "Customer",
                    },
                    displayName: {
                        type: "string",
                        description: "Role's displayName",
                        example: "Customer",
                    },
                    description: {
                        type: "string",
                        description: "Role's description",
                        example: "Customer role description...",
                    },
                },
            }
        },
        paths: {
            "/api/v1/roles": {
                get: {
                    tags: ["Role"],
                    description: "" +
                        "### Role get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "",
                    operationId: "getRoleCollection", 
                    parameters: [],
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
                                            role: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        schema: {
                                                            $ref: "#/components/schemas/Role",
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
        }
    }
}

module.exports = getRoleDocs()