function getEmployeeRolesDocs() {
    return {
        schemas: {
            employeeRoles: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        description: 'The employee role id',
                        example: 1
                    },
                    name: {
                        type: 'string',
                        description: 'The employee role name',
                        example: 'Employee Role Name'
                    },
                    displayName: {
                        type: 'string',
                        description: 'The employee role display name',
                        example: 'Employee Role Name'
                    },
                    description: {
                        type: 'string',
                        description: 'The employee role description',
                        example: 'Employee Role Description'
                    },
                }
            },
        },
        paths: {
            '/api/v1/employee_roles': {
                get: {
                    tags: ['EmployeeRoles'],
                    summary: 'Get employee roles',
                    description: "" +
                        "### EmployeeRoles get collection api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "",
                    operationId: 'getEmployeeRoles',
                    parameters: [],
                    responses: {
                        200: {
                            description: 'Employee roles retrieved',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            statusCode: {
                                                type: 'integer',
                                                example: 200
                                            },
                                            employeeRoles: {
                                                type: 'array',
                                                items: {
                                                    $ref: '#/components/schemas/employeeRoles'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    }
                                            
                },
                post: {
                    tags: ['EmployeeRoles'],
                    summary: 'Create employee role',
                    description: "" +
                    "### EmployeeRoles post collection api.\n\n" +
                    "### Permissions\n" +
                    "   * Admin\n" +
                    "   * Salon\n" +
                    "",
                    operationId: 'createEmployeeRole',
                    parameters: [],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/employeeRoles'
                                },
                                example: {
                                    name: 'Employee Role Name',
                                    description: 'Employee Role Description'
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Employee role created',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/employeeRoles',
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/employee_roles/{id}': {
                get: {
                    tags: ['EmployeeRoles'],
                    summary: 'Get employee role',
                    description: "" +
                        "### EmployeeRoles get item api.\n\n" +
                        "### Permissions\n" +
                        "   * Admin\n" +
                        "   * Salon\n" +
                        "   * Employee\n" +
                        "",
                    operationId: 'getEmployeeRole',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: 'Employee role id',
                            required: true,
                            schema: {
                                type: 'integer',
                                format: 'int64',
                                example: 1,
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Employee role retrieved',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            statusCode: {
                                                type: 'integer',
                                                example: 200
                                            },
                                            employeeRole: {
                                                $ref: '#/components/schemas/employeeRoles'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    }
                },
                patch: {
                    tags: ['EmployeeRoles'],
                    summary: 'Update employee role',
                    description: "" +
                    "### EmployeeRoles patch collection api.\n\n" +
                    "### Permissions\n" +
                    "   * Admin\n" +
                    "   * Salon\n" +
                    "",
                    operationId: 'updateEmployeeRole',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: 'Employee role id',
                            required: true,
                            schema: {
                                type: 'integer',
                                format: 'int64',
                                example: 1,
                            }
                        }
                    ],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/employeeRoles'
                                },
                                example: {
                                    name: 'Employee Role Name',
                                    description: 'Employee Role Description',
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Employee role updated',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            statusCode: {
                                                type: 'integer',
                                                example: 200
                                            },
                                            employeeRole: {
                                                $ref: '#/components/schemas/employeeRoles'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } ,
                delete: {
                    tags: ['EmployeeRoles'],
                    summary: 'Delete employee role',
                    description: 'Delete employee role',
                    operationId: 'deleteEmployeeRole',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            description: 'Employee role id',
                            required: true,
                            schema: {
                                type: 'integer',
                                format: 'int64',
                                example: 1,
                            }
                        }
                    ],
                    responses: {
                        204: {
                            description: 'Employee role deleted',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            statusCode: {
                                                type: 'integer',
                                                example: 204
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            }
        }
    }
}

module.exports = getEmployeeRolesDocs()