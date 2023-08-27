function getReviewDocs() {
    return {
        schemas: {
            Review: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6w",
                    },
                    rating: {
                        type: "integer",
                        example: 5,
                    },
                    text: {
                        type: "string",
                        example: "This is a comment",
                    },
                    user: {
                        type: "object",
                        properties: {
                            uuid: {
                                type: "string",
                                example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6w",
                            },
                            firstName: {
                                type: "string",
                                example: "John",
                            },
                            lastName: {
                                type: "string",
                                example: "Doe",
                            },
                            profileImage: {
                                type: "string",
                                example: "https://api.example.com/images/dummy/profileImages/user-1.png",
                            },
                        }
                    },
                    createdAt: {
                        type: "string",
                        example: "2021-01-01T00:00:00.000Z",
                    },
                    updatedAt: {
                        type: "string",
                        example: "2021-01-01T00:00:00.000Z",
                    }
                }
            },
            CreateReview: {
                type: "object",
                properties: {
                    rating: {
                        type: "integer",
                        example: 5,
                    },
                    text: {
                        type: "string",
                        example: "This is a comment",
                    }
                }
            }
        },
        paths: {
            "/api/v1/salons/{uuid}/reviews": {
                get: {
                    tags: ["Salon"],
                    description: "" +
                        "### Review get api.\n\n" + 
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest",
                    operationId: "getSalonReviews",
                    parameters: [
                        {
                            name: "uuid",
                            in: "path",
                            description: "salon's uuid",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                        {
                            name: 'page',
                            in: 'query',
                            description: 'Page number',
                            required: false,
                            schema: {
                                type: 'integer',
                                example: 1,
                            },
                        },
                        {
                            name: 'itemsPerPage',
                            in: 'query',
                            description: 'The number of items per page!\n\n' +
                                '   Default: 30',
                            required: false,
                            schema: {
                                type: 'integer',
                                example: 30,
                            },

                        },
                        {
                            name: "pagination",
                            in: "query",
                            description: "Pagination",
                            required: false,
                            schema: {
                                type: "boolean",
                            },

                        },
                        {
                            name: "orderBy",
                            in: "query",
                            description: "Order by ASC or DESC",
                            required: false,
                            schema: {
                                type: "string",
                            },
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
                                            reviews: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/Review"
                                                },
                                            },
                                        }
                                    },
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ["Salon"],
                    description: "" +
                        "### Review create api.\n\n" + 
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest",
                    operationId: "createSalonReview",
                    parameters: [
                        {
                            name: "uuid",
                            in: "path",
                            description: "Salon's uuid",
                            required: true,
                            schema: {
                                type: "string",
                            }
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CreateReview"
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: "Successfully created",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 201
                                            },
                                            review: {
                                                $ref: "#/components/schemas/Review"
                                            },  
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/subscriptions/{uuid}/reviews": {
                get: {
                    tags: ["Subscription"],
                    description: "" +
                        "### Review get api.\n\n" + 
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest",
                    operationId: "getSubscriptionReviews",
                    parameters: [
                        {
                            name: "uuid",
                            in: "path",
                            description: "Subscription's uuid",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                        {
                            name: 'page',
                            in: 'query',
                            description: 'Page number',
                            required: false,
                            schema: {
                                type: 'integer',
                                example: 1,
                            },
                        },
                        {
                            name: 'itemsPerPage',
                            in: 'query',
                            description: 'The number of items per page!\n\n' +
                                '   Default: 30',
                            required: false,
                            schema: {
                                type: 'integer',
                                example: 30,
                            },

                        },
                        {
                            name: "pagination",
                            in: "query",
                            description: "Pagination",
                            required: false,
                            schema: {
                                type: "boolean",
                            },

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
                                            reviews: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/Review"
                                                },
                                            },
                                        }
                                    },
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ["Subscription"],
                    description: "" +
                        "### Review create api.\n\n" + 
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest",
                    operationId: "createSubscriptionReview",
                    parameters: [
                        {
                            name: "uuid",
                            in: "path",
                            description: "Subscription's uuid",
                            required: true,
                            schema: {
                                type: "string",
                            }
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CreateReview"
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: "Successfully created",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 201
                                            },
                                            review: {
                                                $ref: "#/components/schemas/Review"
                                            },  
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/products/{uuid}/reviews": {
                get: {
                    tags: ["Product"],
                    description: "" +
                        "### Review get api.\n\n" + 
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest",
                    operationId: "getProductReviews",
                    parameters: [
                        {
                            name: "uuid",
                            in: "path",
                            description: "Product's uuid",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                        {
                            name: 'page',
                            in: 'query',
                            description: 'Page number',
                            required: false,
                            schema: {
                                type: 'integer',
                                example: 1,
                            },
                        },
                        {
                            name: 'itemsPerPage',
                            in: 'query',
                            description: 'The number of items per page!\n\n' +
                                '   Default: 30',
                            required: false,
                            schema: {
                                type: 'integer',
                                example: 30,
                            },

                        },
                        {
                            name: "pagination",
                            in: "query",
                            description: "Pagination",
                            required: false,
                            schema: {
                                type: "boolean",
                            },

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
                                            reviews: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/Review"
                                                },
                                            },
                                        }
                                    },
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ["Product"],
                    description: "" +
                        "### Review create api.\n\n" + 
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest",
                    operationId: "createProductReview",
                    parameters: [
                        {
                            name: "uuid",
                            in: "path",
                            description: "Product's uuid",
                            required: true,
                            schema: {
                                type: "string",
                            }
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CreateReview"
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: "Successfully created",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 201
                                            },
                                            review: {
                                                $ref: "#/components/schemas/Review"
                                            },  
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/review/{uuid}": {
                get: {
                    tags: ["Review"],
                    description: "" +
                        "### Review get api.\n\n" + 
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest",
                    operationId: "getReview",
                    parameters: [
                        {
                            name: "uuid",
                            in: "path",
                            description: "Review's uuid",
                            required: true,
                            schema: {
                                type: "string",
                                example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6w",
                            },
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
                                            review: {
                                                $ref: "#/components/schemas/Review"
                                            },
                                        }
                                    },
                                }   
                            },
                        },
                    },
                },
                patch: {
                    tags: ["Review"],
                    description: "" +
                        "### Review patch api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest",
                    operationId: "patchReview",
                    parameters: [
                        {
                            name: "uuid",
                            in: "path",
                            description: "Review's uuid",
                            required: true,
                            schema: {
                                type: "string",
                                example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6w",
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        rating: {
                                            type: "integer",
                                            example: 5,
                                        },
                                        text: {
                                            type: "string",
                                            example: "This is a comment",
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Successfully patched",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            review: {
                                                $ref: "#/components/schemas/Review"
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {   
                    tags: ["Review"],
                    description: "" +
                        "### Review delete api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "   * Guest",
                    operationId: "deleteReview",
                    parameters: [
                        {
                            name: "uuid",
                            in: "path",
                            description: "Review's uuid",
                            required: true,
                            schema: {
                                type: "string",
                                example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6w",
                            },
                        },
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
                                    }
                                }
                            }
                        }
                    }
                }
            },

        }
    }
}

module.exports = getReviewDocs();