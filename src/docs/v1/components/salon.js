function getSalonDocs() {
    return {
        schemas: {
            Salon: {
                type: "object",
                properties: {
                    uuid: {
                        type: "string",
                        description: "Salon identification uuid",
                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    },
                    email: {
                        type: "string",
                        description: "Email",
                        example: "testuser@example.com",
                    },
                    name: {
                        type: "string",
                        description: "Name",
                        example: "Test",
                    },
                    lastName: {
                        type: "string",
                        description: "Last name",
                        example: "User",
                    },
                    mobilePhone: {
                        type: "string",
                        description: "Mobile phone",
                        example: "+12 345 678 9000",
                    },
                    phone: {
                        type: "string",
                        description: "Phone",
                        example: "+12 345 678 9000",
                    },
                    otherEmail: {
                        type: "string",
                        description: "Other email",
                        example: "testuser@example.com",
                    },
                    noOfSalons: {
                        type: "integer",
                        description: "No of salons",
                        example: "2",
                    },
                    noOfChairs: {
                        type: "integer",
                        description: "No of chairs",
                        example: "2",
                    },
                    noOfEmployees: {
                        type: "integer",
                        description: "No of employees",
                        example: "2",
                    },
                    describeSalon: {
                        type: "string",
                        description: "Describe salon",
                        example: "Salon description...",
                    },
                    servicesProvide: {
                        type: "string",
                        description: "Services provide",
                        example: "Salon services...",
                    },
                    approxMonthlyRevenue: {
                        type: "string",
                        description: "Approx monthly revenue",
                        example: "Approx monthly revenue...",
                    },
                    subdomain: {
                        type: "string",
                        description: "Subdomain",
                        example: "Subdomain...",
                    },
                    fromTime: {
                        type: "string",
                        description: "Salon's fromTime",
                        example: "07:00",
                    },
                    toTime: {
                        type: "string",
                        description: "Salon's toTime",
                        example: "19:00",
                    },
                    fromDay: {
                        type: "string",
                        description: "Salon's fromDate",
                        example: "Monday",
                    },
                    toDay: {
                        type: "string",
                        description: "Salon's toDate",
                        example: "Friday",
                    },
                    address: {
                        type: "object",
                        properties: {
                            firstName: {
                                type: "string"
                            },
                            lastName: {
                                type: "string"
                            },
                            address: {
                                type: "string"
                            },
                            country: {
                                type: "string"
                            },
                            state: {
                                type: "string"
                            },
                            city: {
                                type: "string"
                            },
                            postCode: {
                                type: "string"
                            },
                            phoneNumber: {
                                type: "string"
                            },
                            latitude: {
                                type: "string",
                                description: "Salon's latitue",
                                example: "45.4101441",
                            },
                            longitude: {
                                type: "string",
                                description: "Salon's longitude",
                                example: "72.749482",
                            }
                        }
                    },
                    rating: {
                        type: "string",
                        description: "Rating",
                        example: "80.45",
                    },
                    ownerReview: {
                        type: "string",
                        description: "Salon's owner review",
                        example: "Salon's owner review...",
                    },
                    user: {
                        type: "object",
                        properties: {
                            schema: {
                                $ref: "#/components/schemas/User",
                            } 
                        },
                    },
                },
            }
        },
        paths: {
            "/api/v1/salons/{uuid}": {
                get: {
                    tags: ["Salon"],
                    description: "" +
                        "### Salon get item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "   * Customer\n" +
                        "   * Guest\n" +
                        "",
                    operationId: "getSalonItem", 
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
                                            salon: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Salon",
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
                    tags: ["Salon"],
                    description: "" +
                        "### Salon patch item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "",
                    operationId: "patchSalonItem", 
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
                                    name: {
                                        type: "string",
                                        description: "User's name",
                                        example: "Test",
                                    },
                
                                    lastName: {
                                        type: "string",
                                        description: "User's lastName",
                                        example: "User",
                                    },
                
                                    mobilePhone: {
                                        type: "string",
                                        description: "User's mobile phone",
                                        example: "+12 345 678 9000",
                                    },
                
                                    phone: {
                                        type: "string",
                                        description: "User's phone",
                                        example: "+12 345 678 9000",
                                    },
                
                                    otherEmail: {
                                        type: "email",
                                        description: "User's email",
                                        example: "testuser@example.com",
                                    },
                
                                    noOfSalons: {
                                        type: "integer",
                                        description: "User's no of salons",
                                        example: "2",
                                    },
                
                                    noOfChairs: {
                                        type: "integer",
                                        description: "User's no of chairs",
                                        example: "2",
                                    },
                
                                    noOfEmployees: {
                                        type: "integer",
                                        description: "User's no of employees",
                                        example: "2",
                                    },
                
                                    describeSalon: {
                                        type: "string",
                                        description: "User's describe salon",
                                        example: "Salon description...",
                                    },
                
                                    noOfSalons: {
                                        type: "integer",
                                        description: "User's no of salons",
                                        example: "2",
                                    },
                
                                    servicesProvide: {
                                        type: "string",
                                        description: "User's services provide",
                                        example: "Salon services...",
                                    },
                
                                    approxMonthlyRevenue: {
                                        type: "string",
                                        description: "User's approx monthly revenue",
                                        example: "Approx monthly revenue...",
                                    },
                                    subdomain: {
                                        type: "string",
                                        description: "User's subdomain",
                                        example: "Subdomain...",
                                    },
                                    rating: {
                                        type: "string",
                                        description: "Rating",
                                        example: "80.45",
                                    },
                                    ownerReview: {
                                        type: "string",
                                        description: "Salon's owner review",
                                    },
                                    fromTime: {
                                        type: "string",
                                        description: "Salon's fromTime",
                                        example: "07:00",
                                    },
                                    toTime: {
                                        type: "string",
                                        description: "Salon's toTime",
                                        example: "19:00",
                                    },
                                    fromDay: {
                                        type: "string",
                                        description: "Salon's fromDate",
                                        example: "Monday",
                                    },
                                    toDay: {
                                        type: "string",
                                        description: "Salon's toDate",
                                        example: "Friday",
                                    },
                                    profileImage: {
                                        type: "string",
                                        description: "Salon's profileImage",
                                        example: "https://www.example.com/image.png",
                                    },
                                    address: {
                                        type: "object",
                                        properties: {
                                            firstName: {
                                                type: "string"
                                            },
                                            lastName: {
                                                type: "string"
                                            },
                                            address: {
                                                type: "string"
                                            },
                                            country: {
                                                type: "string"
                                            },
                                            state: {
                                                type: "string"
                                            },
                                            city: {
                                                type: "string"
                                            },
                                            postCode: {
                                                type: "string"
                                            },
                                            phoneNumber: {
                                                type: "string"
                                            },
                                            latitude: {
                                                type: "string",
                                                description: "Salon's latitue",
                                                example: "45.4101441",
                                            },
                                            longitude: {
                                                type: "string",
                                                description: "Salon's longitude",
                                                example: "72.749482",
                                            }
                                        },
                                    },
                                    imageUuids: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                            description: "MediaFile identification uuid",
                                            example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                        }
                                    },
                                    statusId: {
                                        type: "integer",
                                        description: "Status Id",
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
                                            salon: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Salon",
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
            "/api/v1/salons": {
                post: {
                    tags: ["Salon"],
                    description: "" +
                        "### Salon post item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "",
                    operationId: "postSalonItem", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "email",
                                        description: "User's email",
                                        example: "testuser@example.com (required)",
                                    },
    
                                    name: {
                                        type: "string",
                                        description: "User's name",
                                        example: "Test (required)",
                                    },
                
                                    lastName: {
                                        type: "string",
                                        description: "User's lastName",
                                        example: "User (required)",
                                    },
                
                                    mobilePhone: {
                                        type: "string",
                                        description: "User's mobile phone",
                                        example: "+12 345 678 9000",
                                    },
                
                                    phone: {
                                        type: "string",
                                        description: "User's phone",
                                        example: "+12 345 678 9000",
                                    },
                
                                    otherEmail: {
                                        type: "email",
                                        description: "User's email",
                                        example: "testuser@example.com",
                                    },
                
                                    noOfSalons: {
                                        type: "integer",
                                        description: "User's no of salons",
                                        example: "2",
                                    },
                
                                    noOfChairs: {
                                        type: "integer",
                                        description: "User's no of chairs",
                                        example: "2",
                                    },
                
                                    noOfEmployees: {
                                        type: "integer",
                                        description: "User's no of employees",
                                        example: "2",
                                    },
                
                                    describeSalon: {
                                        type: "string",
                                        description: "User's describe salon",
                                        example: "Salon description...",
                                    },
                
                                    noOfSalons: {
                                        type: "integer",
                                        description: "User's no of salons",
                                        example: "2",
                                    },
                
                                    servicesProvide: {
                                        type: "string",
                                        description: "User's services provide",
                                        example: "Salon services...",
                                    },
                
                                    approxMonthlyRevenue: {
                                        type: "string",
                                        description: "User's approx monthly revenue",
                                        example: "Approx monthly revenue...",
                                    },
                                    subdomain: {
                                        type: "string",
                                        description: "User's subdomain",
                                        example: "Subdomain...",
                                    },
                                    rating: {
                                        type: "string",
                                        description: "Rating",
                                        example: "80.45",
                                    },
                                    ownerReview: {
                                        type: "string",
                                        description: "Salon's owner review",
                                    },
                                    fromTime: {
                                        type: "string",
                                        description: "Salon's fromTime",
                                        example: "07:00",
                                    },
                                    toTime: {
                                        type: "string",
                                        description: "Salon's toTime",
                                        example: "19:00",
                                    },
                                    fromDay: {
                                        type: "string",
                                        description: "Salon's fromDate",
                                        example: "Monday",
                                    },
                                    toDay: {
                                        type: "string",
                                        description: "Salon's toDate",
                                        example: "Friday",
                                    },
                                    address: {
                                        type: "object",
                                        properties: {
                                            firstName: {
                                                type: "string"
                                            },
                                            lastName: {
                                                type: "string"
                                            },
                                            address: {
                                                type: "string"
                                            },
                                            country: {
                                                type: "string"
                                            },
                                            state: {
                                                type: "string"
                                            },
                                            city: {
                                                type: "string"
                                            },
                                            postCode: {
                                                type: "string"
                                            },
                                            phoneNumber: {
                                                type: "string"
                                            },
                                            latitude: {
                                                type: "string",
                                                description: "Salon's latitue",
                                                example: "45.4101441",
                                            },
                                            longitude: {
                                                type: "string",
                                                description: "Salon's longitude",
                                                example: "72.749482",
                                            }
                                        }
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
                                            salon: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        $ref: "#/components/schemas/Salon",
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
                get: {
                    tags: ["Salon"],
                    description: "" +
                        "### Salon get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "   * Customer\n" +
                        "   * Guest\n" +
                        "### Groups\n" +
                        "   * businessServices\n" +
                        "",
                    operationId: "getSalonCollection", 
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
                            name:"name",
                            in:"query",
                            description:"Salon name filter",
                            required:false,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
                        },
                        {
                            name:"groups",
                            in:"query",
                            description:"Resource field groups",
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
                                            salons: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        schema: {
                                                            $ref: "#/components/schemas/Salon",
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
            "/api/v1/salons/{uuid}/stats": {
                get: {
                    tags: ["Salon"],
                    description: "" +
                        "### Salon stats get item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Guest\n" +
                        "",
                    operationId: "getSalonStatsItem", 
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
                        },
                        {
                            name:"fromDate",
                            in:"query",
                            description:"Salon's stats fromDate filter (2023-03-26)",
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
                            description:"Salon's stats toDate filter (2023-03-28)",
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
                                            salonStats: {
                                                type: "object",
                                                properties: {
                                                    schema: {
                                                        type: "object",
                                                        properties: {
                                                            totalBookings: {
                                                                type: "object",
                                                                properties: {
                                                                    value: {
                                                                        type: "integer",
                                                                        description: "Salon's totalBookings",
                                                                        example: "12",
                                                                    },
                                                                    state: {
                                                                        type: "string",
                                                                        description: "Salon's totalBookings state",
                                                                        example: "POSITIVE",
                                                                    }
                                                                }
                                                            },

                                                            completedBookings: {
                                                                type: "object",
                                                                properties: {
                                                                    value: {
                                                                        type: "integer",
                                                                        description: "Salon's completedBookings",
                                                                        example: "10",
                                                                    },
                                                                    state: {
                                                                        type: "string",
                                                                        description: "Salon's completedBookings state",
                                                                        example: "POSITIVE",
                                                                    }
                                                                }
                                                            },
                                                        
                                                            pendingBookings: {
                                                                type: "object",
                                                                properties: {
                                                                    value: {
                                                                        type: "integer",
                                                                        description: "Salon's pendingBookings",
                                                                        example: "2",
                                                                    },
                                                                    state: {
                                                                        type: "string",
                                                                        description: "Salon's pendingBookings state",
                                                                        example: "POSITIVE",
                                                                    }
                                                                }
                                                            },
                                                        
                                                            cancelledBookings: {
                                                                type: "object",
                                                                properties: {
                                                                    value: {
                                                                        type: "integer",
                                                                        description: "Salon's cancelledBookings",
                                                                        example: "4",
                                                                    },
                                                                    state: {
                                                                        type: "string",
                                                                        description: "Salon's cancelledBookings state",
                                                                        example: "POSITIVE",
                                                                    }
                                                                }
                                                            },
                                                        
                                                            bookingsRequests: {
                                                                type: "object",
                                                                properties: {
                                                                    value: {
                                                                        type: "integer",
                                                                        description: "Salon's bookingsRequests",
                                                                        example: "10",
                                                                    },
                                                                    state: {
                                                                        type: "string",
                                                                        description: "Salon's bookingsRequests state",
                                                                        example: "POSITIVE",
                                                                    }
                                                                }
                                                            },
                                                        
                                                            weeksWorkload: {
                                                                type: "object",
                                                                properties: {
                                                                    value: {
                                                                        type: "integer",
                                                                        description: "Salon's weeksWorkload",
                                                                        example: "12",
                                                                    },
                                                                    state: {
                                                                        type: "string",
                                                                        description: "Salon's weeksWorkload state",
                                                                        example: "NEGATIVE",
                                                                    }
                                                                }
                                                            },
                                                        
                                                            totalCustomers: {
                                                                type: "object",
                                                                properties: {
                                                                    value: {
                                                                        type: "integer",
                                                                        description: "Salon's totalCustomer",
                                                                        example: "50",
                                                                    },
                                                                    state: {
                                                                        type: "string",
                                                                        description: "Salon's totalCustomer state",
                                                                        example: "POSITIVE",
                                                                    }
                                                                }
                                                            },
                                                        
                                                            totalEarnings: {
                                                                type: "object",
                                                                properties: {
                                                                    value: {
                                                                        type: "integer",
                                                                        description: "Salon's totalEarnings",
                                                                        example: "2500.50",
                                                                    },
                                                                    state: {
                                                                        type: "string",
                                                                        description: "Salon's totalEarnings state",
                                                                        example: "NEUTRAL",
                                                                    }
                                                                }
                                                            },
                                                        }
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
            "/api/v1/salons/locations": {
                get: {
                    tags: ["Salon"],
                    description: "" +
                        "### Salon locations get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Guest\n" +
                        "",
                    operationId: "getSalonLocationCollection", 
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
                                            locations: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        firstName: {
                                                            type: "string"
                                                        },
                                                        lastName: {
                                                            type: "string"
                                                        },
                                                        address: {
                                                            type: "string"
                                                        },
                                                        country: {
                                                            type: "string"
                                                        },
                                                        state: {
                                                            type: "string"
                                                        },
                                                        city: {
                                                            type: "string"
                                                        },
                                                        postCode: {
                                                            type: "string"
                                                        },
                                                        phoneNumber: {
                                                            type: "string"
                                                        },
                                                        latitude: {
                                                            type: "string",
                                                            description: "Salon's latitue",
                                                            example: "45.4101441",
                                                        },
                                                        longitude: {
                                                            type: "string",
                                                            description: "Salon's longitude",
                                                            example: "72.749482",
                                                        }
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
            "/api/v1/salons/{uuid}/customers": {
                get: {
                    tags: ["Salon"],
                    description: "" +
                        "### Salon customers get collection api.\n\n" +
                        "### OrderBy possible values\n" +
                        "   * id,ASC\n" +
                        "   * id,DESC\n" +
                        "   * statusId,ASC\n" +
                        "   * statusId,DESC\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "### Groups\n" +
                        "   * subscriptions\n" +
                        "",
                    operationId: "getSalonCustomerCollection", 
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
                            name:"uuid",
                            in:"path",
                            description:"Resource identifier",
                            required:true,
                            deprecated:false,
                            schema:{
                                type:"string"
                            },
                            style:"simple"
                        },
                        {
                            "name": "customerName",
                            "in": "query",
                            "description": "Customer name",
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
                            "default": 'id,ASC',
                            "description": "Order by {fieldName},ASC or {fieldName},DESC",
                            "schema": {
                                "type": "string"
                            },
                            "deprecated": false,
                            "required": false,
                            "style": "form"
                        },
                        {
                            name:"groups",
                            in:"query",
                            description:"Resource field groups",
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
                                            customers: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        schema: {
                                                            $ref: "#/components/schemas/User",
                                                        } 
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
            },
            "/api/v1/salons/{uuid}/images": {
                delete: {
                    tags: ["Salon"],
                    description: "" +
                        "### Salon image delete item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Customer\n" +
                        "",
                    operationId: "deleteSalonImageCollection", 
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
                                        imageUuids: {
                                            type: "array",
                                            items: {
                                                type: "string",
                                                description: "MediaFile identification uuid",
                                                example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                                            }
                                        }
                                    }
                                }
                            }
                        }
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
        },
    }
}

module.exports = getSalonDocs()