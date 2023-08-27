function getQuestionDocs() {
    return {
        schemas: {
            UserAnswer: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "Question identification uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    user: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/User",
                            } 
                        },
                    },
                    question: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/Question",
                            } 
                        },
                    },
                    questionOption: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/QuestionOption",
                            } 
                        },
                    }
                },
            }
        },
        paths: {
            "/api/v1/user_answers": {
                post: {
                    tags: ["UserAnswer"],
                    description: "" +
                        "### User answer post item api.\n\n" +
                        "### Permissions\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "postUserAnswerItem", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    questionUuid: {
                                        type: "string",
                                        description: "Question identification uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                    },
                                    questionOptionUuid: {
                                        type: "string",
                                        description: "Question option identification uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
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
                                            userAnswer: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/UserAnswer",
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
            },
            "/api/v1/user_answers/{uuid}" : {
                delete: {
                    tags: ["UserAnswer"],
                    description: "" +
                        "### UserAnswer delete item api.\n\n" +
                        "### Permissions\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "deleteUserAnswerItem", 
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

module.exports = getQuestionDocs()