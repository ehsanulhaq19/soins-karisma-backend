function getUserProductDocs() {
    return {
        paths: {
            "/api/v1/user_products": {
                get: {
                    tags: ["UserProduct"],
                    description: "" +
                        "### UserProduct get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer" +
                        "",
                    operationId: "getUserProductCollection", 
                    parameters: [
                        {
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
                        },{
                            name:"userUuid",
                            in:"query",
                            description:"User resource identifier",
                            required:false,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
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
                                            products: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        schema: {
                                                            $ref: "#/components/schemas/Product",
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
        },
    }
}

module.exports = getUserProductDocs()