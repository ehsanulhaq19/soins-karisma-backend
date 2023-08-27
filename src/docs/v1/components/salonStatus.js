function getSalonStatusDocs() {
    return {
        schemas: {
            SalonStatus: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "Salon status identifier",
                        example: "1",
                    },
                    name: {
                        type: "string",
                        description: "Status Name",
                        example: "Active",
                    },
                },
            }
        },
        paths: {
            "/api/v1/salon_statuses": {
                get: {
                    tags: ["SalonStatus"],
                    description: "" +
                        "### SalonStatus get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "getSalonStatusCollection", 
                    parameters: [
                        
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
                                            BookingStatus: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/SalonStatus",
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
        }
    }
}

module.exports = getSalonStatusDocs()