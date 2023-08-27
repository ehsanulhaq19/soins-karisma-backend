function getQuestionStatusDocs() {
    return {
        schemas: {
            QuestionStatus: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "Question status identifier",
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
            "/api/v1/question_statuses": {
                get: {
                    tags: ["QuestionStatus"],
                    description: "" +
                        "### QuestionStatus get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "getQuestionStatusCollection", 
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
                                                        $ref: "#/components/schemas/QuestionStatus",
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

module.exports = getQuestionStatusDocs()