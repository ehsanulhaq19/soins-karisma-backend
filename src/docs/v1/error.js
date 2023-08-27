function getErrorDocs() {
    return {
        schemas: {
            Error: {
                type: "object",
                properties: {
                    statusCode: {
                        type: "integer",
                        description: "Error Code"
                    },
                    message: {
                        type: "string",
                        description: "Error message"
                    },
                },
            },
            BadRequestError: {
                type: "object",
                properties: {
                    statusCode: {
                        type: "integer",
                        example: 400,
                        description: "Error Code"
                    },
                    message: {
                        type: "string",
                        example: "Bad Request",
                        description: "Error message"
                    }
                },
            },           
            UnauthorizedError: {
                type: "object",
                properties: {
                    statusCode: {
                        type: "integer",
                        example: 401,
                        description: "Error Code"
                    },
                    message: {
                        type: "string",
                        example: "Unauthorized",
                        description: "Error message"
                    }
                },
            },
            NotFoundError: {
                type: "object",
                properties: {
                    statusCode: {
                        type: "integer",
                        example: 404,
                        description: "Error Code"
                    },
                    message: {
                        type: "string",
                        example: "Not Found",
                        description: "Error message"
                    }
                },
            },
            InternalServerError: {
                type: "object",
                properties: {
                    statusCode: {
                        type: "integer",
                        example: 500,
                        description: "Error Code"
                    },
                    message: {
                        type: "string",
                        example: "Internal Server Error",
                        description: "Error message"
                    }
                },
            },
        }
    }
}

module.exports = getErrorDocs()