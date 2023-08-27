function getAuthDocs() {
    return {
        paths: {
            "/api/v1/login": {
                post: {
                    tags: ["Auth"],
                    description: "User can login with either using email and password or username and password", 
                    operationId: "login", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    "email": {
                                        type: "string",
                                        example: "testuser@example.com (required if username is not provided)",
                                    },
                                    "userName": {
                                        type: "string",
                                        example: "user123 (required if email is not provided)",
                                    },
                                    "password": {
                                        type: "string",
                                        example: "pass.. (required)"
                                    }
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Successfully logged in", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            registerationType: {
                                                type: "string",
                                                description: "User registerationType."
                                            },
                                            token: {
                                                type: "string",
                                                description: "User auth token will be null if user has enabled two factor authentication."
                                            },
                                            twoFactorAuthenticationEnabled: {
                                                type: "string",
                                                example: "true",
                                                description: "Property will be part of response if user has enabled two factor authentication."
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
                        403: {
                            description: "Forbidden request", 
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
            "/api/v1/login/two_factor_authentication": {
                post: {
                    tags: ["Auth"],
                    description: "Send two factor authentication code to user's provided medium", 
                    operationId: "loginWithTwoFactorAuth", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    "email": {
                                        type: "string",
                                        example: "testuser@example.com (required)"
                                    },
                                    "password": {
                                        type: "string",
                                        example: "pass... (required)"
                                    },
                                    "medium": {
                                        type: "string",
                                        example: "email|phone (required)"
                                    }
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Successfully send otp code to provided medium", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            message: {
                                                type: "string"
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
            "/api/v1/login/two_factor_authentication/otp_verify": {
                post: {
                    tags: ["Auth"],
                    description: "Verify two factor authentication code sended to user's provided medium", 
                    operationId: "loginWithTwoFactorAuthOtpVerify", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    "email": {
                                        type: "string",
                                        example: "testuser@example.com (required)"
                                    },
                                    "password": {
                                        type: "string",
                                        example: "pass... (required)"
                                    },
                                    "medium": {
                                        type: "string",
                                        example: "email|phone (required)"
                                    },
                                    "otpCode": {
                                        type: "string",
                                        example: "1234 (required)"
                                    }
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Successfully get user auth token", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            token: {
                                                type: "string"
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
            "/api/v1/register": {
                post: {
                    tags: ["Auth"],
                    description: "Register api", 
                    operationId: "register", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    "email": {
                                        type: "string",
                                        example: "testuser@example.com (required)"
                                    },
                                    "firstName": {
                                        type: "string",
                                        example: "test (required)"
                                    },
                                    "lastName": {
                                        type: "string",
                                        example: "user (required)"
                                    },
                                    "password": {
                                        type: "string",
                                        example: "pass... (required)"
                                    },
                                    "phone": {
                                        type: "string",
                                        example: "+123456789000"
                                    },
                                    "locale": {
                                        type: "string",
                                        description: "User's locale",
                                        example: "Can be (en, es or fr)",
                                    },
                                    "salonUuid": {
                                        type: "string",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (required)" 
                                    }
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        201: {
                            description: "Successfully registered", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 201
                                            },
                                            message: {
                                                type: "string"
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
            "/api/v1/basic/register": {
                post: {
                    tags: ["Auth"],
                    description: "Register basic api", 
                    operationId: "registerBasic", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    "email": {
                                        type: "string",
                                        example: "testuser@example.com (required)"
                                    },
                                    "password": {
                                        type: "string",
                                        example: "pass... (required)"
                                    },
                                    "firstName": {
                                        type: "string",
                                        example: "test"
                                    },
                                    "lastName": {
                                        type: "string",
                                        example: "user"
                                    },
                                    "phone": {
                                        type: "string",
                                        example: "+123456789000"
                                    },
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        201: {
                            description: "Successfully registered", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 201
                                            },
                                            message: {
                                                type: "string"
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
            "/api/v1/salon/register": {
                post: {
                    tags: ["Auth"],
                    description: "Salon register api", 
                    operationId: "salonRegister", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    "email": {
                                        type: "string",
                                        example: "testuser@example.com (required)"
                                    },
                                    "name": {
                                        type: "string",
                                        example: "test user (required)"
                                    },
                                    "firstName": {
                                        type: "string",
                                        example: "test (required)"
                                    },
                                    "lastName": {
                                        type: "string",
                                        example: "test (required)"
                                    },
                                    phone: {
                                        type: "string",
                                        example: "+012 321 321 3213"
                                    },
                                    mobilePhone: {
                                        type: "string",
                                        example: "+012 321 321 3213"
                                    },
                                    otherEmail: {
                                        type: "string",
                                        example: "testuser@example.com"
                                    },
                                    noOfSalons: {
                                        type: "integer",
                                        example: "2"
                                    },
                                    describeSalon: {
                                        type: "string",
                                        example: "Salon description..."
                                    },
                                    noOfChairs: {
                                        type: "integer",
                                        example: "3"
                                    },
                                    noOfEmployees: {
                                        type: "integer",
                                        example: "5"
                                    },
                                    servicesProvide: {
                                        type: "string",
                                        example: "Services description..."
                                    },
                                    approxMonthlyRevenue: {
                                        type: "string",
                                        example: "Monthly revenue..."
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
                        201: {
                            description: "Salon successfully registered", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 201
                                            },
                                            message: {
                                                type: "string"
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
            "/api/v1/employee/register": {
                post: {
                    tags: ["Auth"],
                    description: "" +
                        "### Employee register api.\n\n" +
                        "### Form fields\n\n" +
                        "   * #### Gender.\n" +
                        "     * Male - M.\n" +
                        "     * Female - F.\n" +
                        "     * Other - O.\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon (self)\n" +
                        "",
                    operationId: "employeeRegister", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    "email": {
                                        type: "string",
                                        example: "testuser@example.com (required)"
                                    },
                                    "password": {
                                        type: "string",
                                        example: "pass... (required)"
                                    },
                                    "firstName": {
                                        type: "string",
                                        example: "test (required)"
                                    },
                                    "lastName": {
                                        type: "string",
                                        example: "test (required)"
                                    },
                                    phone: {
                                        type: "string",
                                        example: "+012 321 321 3213"
                                    },
                                    mobilePhone: {
                                        type: "string",
                                        example: "+012 321 321 3213"
                                    },
                                    gender: {
                                        type: "string",
                                        description: "User's gender",
                                        example: "M",
                                    },
                                    calendarColor: {
                                        type: 'string',
                                        description: 'The employee calendar color',
                                        example: 'yellow or #ffffff'
                                    },
                                    salonUuid: {
                                        type: "string",
                                        example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (required)"
                                    },
                                    employeeRoleId: {
                                        type: "integer",
                                        example: 1
                                    }
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        201: {
                            description: "Salon successfully registered", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 201
                                            },
                                            message: {
                                                type: "string"
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
            "/api/v1/change_password": {
                post: {
                    tags: ["Auth"],
                    description: "Change password api", 
                    operationId: "changePassword", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    "email": {
                                        type: "string",
                                        example: "testuser@example.com (required)"
                                    },
                                    "password": {
                                        type: "string",
                                        example: "******** (required)"
                                    },
                                    "newPassword": {
                                        type: "string",
                                        example: "******** (required)"
                                    }
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Password is changed successfully", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            message: {
                                                type: "string"
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
            "/api/v1/forgot_password": {
                post: {
                    tags: ["Auth"],
                    description: "API will send otp code on specified medium for password change process", 
                    operationId: "forgotPassword", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    "email": {
                                        type: "string",
                                        example: "testuser@example.com (required)"
                                    },
                                    "medium": {
                                        type: "string",
                                        example: "email|phone (required)"
                                    }
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Success", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            message: {
                                                type: "string"
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
            "/api/v1/forgot_password/otp_verify": {
                post: {
                    tags: ["Auth"],
                    description: "Forgot password otp verification api", 
                    operationId: "forgotPasswordOtpVerify", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    "email": {
                                        type: "string",
                                        example: "testuser@example.com (required)"
                                    },
                                    "medium": {
                                        type: "string",
                                        example: "email|phone (required)"
                                    },
                                    "otpCode": {
                                        type: "string",
                                        example: "1234 (required)"
                                    }
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Success", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            message: {
                                                type: "string"
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
                        403: {
                            description: "Forbidden request", 
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
            "/api/v1/forgot_password/otp_verify/update_password": {
                post: {
                    tags: ["Auth"],
                    description: "API end point will first verify the otp and then on success it will update user's password", 
                    operationId: "forgotPasswordOtpVerifyUpdatePassword", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    "email": {
                                        type: "string",
                                        example: "testuser@example.com (required)"
                                    },
                                    "medium": {
                                        type: "string",
                                        example: "email|phone (required)"
                                    },
                                    "otpCode": {
                                        type: "string",
                                        example: "1234 (required)"
                                    },
                                    "password": {
                                        type: "string",
                                        example: "string (required)"
                                    }
                                }
                            },
                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Success", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            message: {
                                                type: "string"
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
                        403: {
                            description: "Forbidden request", 
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
            "/api/v1/guest_user_token": {
                post: {
                    tags: ["Auth"],
                    description: "Get guest user auth token", 
                    operationId: "getGuestUserAuthToken", 
                    parameters: [],
                    requestBody: {
                        content: {
                          "application/json": {

                          },
                        },
                      },
                    responses: {
                        200: {
                            description: "Successfully get guest user auth token", 
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            statusCode: {
                                                type: "integer",
                                                example: 200
                                            },
                                            token: {
                                                type: "string",
                                                example: "token...",
                                                description: "Guest user auth token."
                                            }
                                        }
                                    },
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

module.exports = getAuthDocs()