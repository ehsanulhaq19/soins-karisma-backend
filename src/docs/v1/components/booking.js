function getBookingeDocs() {
    return {
        schemas: {
            Booking: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "Booking identification uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    startDateTime: {
                        type: "string",
                        description: "Booking's startDateTime",
                        example: "2023-01-23T17:30:00",
                    },
                    endDateTime: {
                        type: "string",
                        description: "Booking's endDateTime",
                        example: "2023-01-23T18:00:00",
                    },
                    booker: {
                        $ref: "#/components/schemas/User",
                    },
                    businessServiceEmployee: {
                        $ref: "#/components/schemas/BusinessServiceEmployee",
                    },
                    bookerUuid: {
                        type: "string",
                        description: "Booker's uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    bookerEmail: {
                        type: "string",
                        description: "Booker's email",
                        example: "user@example.com",
                    },
                    isEmailAlert: {
                        type: "boolean",
                        description: "Booking's email alert",
                    },
                    bookerPhone: {
                        type: "string",
                        description: "Booker's phone",
                        example: "+9232432432432",
                    },
                    isSmsAlert: {
                        type: "boolean",
                        description: "Booking's sms alert",
                    },
                    statusId: {
                        type: "integer",
                        description: "Booking's status",
                    },
                    note: {
                        type: "string",
                        description: "Booker's note",
                        example: "I want a curly hair, with black color and .....",
                    },
                },
            }
        },
        paths: {
            "/api/v1/bookings": {
                post: {
                    tags: ["Booking"],
                    description: "" +
                        "### Booking post item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "postBookingItem", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    bookerUuid: {
                                        type: "string",
                                        description: "Booker's uuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                    },
                                    bookerEmail: {
                                        type: "string",
                                        description: "Booker's email",
                                        example: "user@example.com",
                                    },
                                    isEmailAlert: {
                                        type: "boolean",
                                        description: "Booking's email alert",
                                    },
                                    bookerPhone: {
                                        type: "string",
                                        description: "Booker's phone",
                                        example: "+9232432432432",
                                    },
                                    isSmsAlert: {
                                        type: "boolean",
                                        description: "Booking's sms alert",
                                    },
                                    startDateTime: {
                                        type: "string",
                                        description: "Booking's startDateTime",
                                        example: "2023-01-23T17:30:00",
                                    },
                                    endDateTime: {
                                        type: "string",
                                        description: "Booking's endDateTime",
                                        example: "2023-01-23T18:00:00",
                                    },
                                    businessServiceUuid: {
                                        type: "string",
                                        description: "Booking's businessServiceUuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                    },
                                    employeeUuid: {
                                        type: "string",
                                        description: "Booking's employeeUuid",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                    },
                                    note: {
                                        type: "string",
                                        description: "Booker's note",
                                        example: "I want a curly hair, with black color and .....",
                                    },
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
                                            booking: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Booking",
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
                    tags: ["Booking"],
                    description: "" +
                        "### Booking get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "getBookingCollection", 
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
                        },
                        {
                            name:"salonUuid",
                            in:"query",
                            description:"Salon resource identifier",
                            required:false,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
                        },
                        {
                            name:"bookerUuid",
                            in:"query",
                            description:"User resource identifier (Booker user uuid - Booker is a user)",
                            required:false,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
                        },
                        {
                            name:"businessServiceUuid",
                            in:"query",
                            description:"Busiess service resource identifier",
                            required:false,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
                        },
                        {
                            name:"employeeUuid",
                            in:"query",
                            description:"Employee resource identifier",
                            required:false,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
                        },
                        {
                            name:"fromDate",
                            in:"query",
                            description:"Booking fromDate filter (2023-03-26)",
                            required:false,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
                        },
                        {
                            name:"toDate",
                            in:"query",
                            description:"Booking toDate filter (2023-03-28)",
                            required:false,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
                        },
                        {
                            name:"statusId",
                            in:"query",
                            description:"Booking status id",
                            required:false,
                            deprecated:false,
                            schema:{
                                type:"integer"
                            },
                            style:"simple"
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
                                            bookings: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        schema: {
                                                            $ref: "#/components/schemas/Booking",
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
            "/api/v1/bookings/{uuid}": {
                get: {
                    tags: ["Booking"],
                    description: "" +
                        "### Booking get item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "getBookingItem", 
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
                                            booking: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Booking",
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
                    tags: ["Booking"],
                    description: "" +
                        "### Booking patch item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "patchBookingItem", 
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
                                    statusId: {
                                        type: "integer",
                                        description: "Booking statusId",
                                        example: 1,
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
                                            booking: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Booking",
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
                delete: {
                    tags: ["Booking"],
                    description: "" +
                        "### Booking delete item api. This api end point will only soft delete the booking record\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "deleteBookingItem", 
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
            },
            "/api/v1/bookings/{uuid}/cancel": {
                post: {
                    tags: ["Booking"],
                    description: "" +
                        "### Booking cancel post item api.\n\n" +
                        "It will change the appointment status to cancel\n" +
                        "and add the cancelation reason with booking\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "postBookingCancelItem", 
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
                                    description: {
                                        type: "string",
                                        description: "Booking cancel descritpion",
                                        example: "Booking cancel descritpion...",
                                    },
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Successfully added", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            booking: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Booking",
                                                    } 
                                                },
                                            },
                                            bookingStatusDetail: {
                                                type: "object",
                                                properties: {
                                                    description: {
                                                        type: "string",
                                                        description: "Booking cancel descritpion",
                                                        example: "Booking cancel descritpion...",
                                                    }, 
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

module.exports = getBookingeDocs()