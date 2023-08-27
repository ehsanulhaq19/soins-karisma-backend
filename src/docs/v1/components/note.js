function getNoteDocs() {
    return {
        schemas: {
            Note: {
                type: 'object',
                properties: {
                    uuid: {
                        type: 'string',
                        description: 'Unique identifier for the note',
                    },
                    title: {
                        type: 'string',
                        description: 'Title of the note',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the note',
                    },
                    user: {
                        type: 'object',
                        schema: {
                            $ref: '#/components/schemas/User',
                        },
                    },
                    salon: {
                        type: 'object',
                        schema: {
                            $ref: '#/components/schemas/Salon',
                        },
                    },
                },
            }
        },
        paths: {
            '/api/v1/salons/{uuid}/notes': {
                get: {
                    tags: ['Salon'],
                    description: 'Get all notes',
                    operationId: 'getNotes',
                    parameters: [
                        {
                            name: 'uuid',
                            in: 'path',
                            description: 'Salon UUID',
                            required: true,
                            schema: {
                                type: 'string',
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
                            name: "search",
                            in: "query",
                            description: "Search query",
                            required: false,
                            schema: {
                                type: "string",
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
                        {
                            name: "userUuid",
                            in: "query",
                            description: "User UUID",
                            required: false,
                            schema: {
                                type: "string",
                            },
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Notes retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Note',
                                        },
                                    },
                                },
                            },
                        },
                    }
                },
                post: {
                    tags: ['Salon'],
                    description: 'Create a note',
                    operationId: 'createNote',
                    parameters: [
                        {
                            name: 'uuid',
                            in: 'path',
                            description: 'Salon UUID',
                            required: true,
                            schema: {
                                type: 'string',
                            }
                        }
                    ],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            description: 'Title of the note',
                                        },
                                        description: {
                                            type: 'string',
                                            description: 'Description of the note',
                                        },
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: 'Note created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            statusCode: {
                                                type: 'integer',
                                                example: 201,
                                            },
                                            note: {
                                                $ref: '#/components/schemas/Note',
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/notes/{noteUuid}': {
                get: {
                    tags: ['Notes'],
                    summary: 'Get a note',
                    description: 'Get a note',
                    operationId: 'getNote',
                    parameters: [
                        {
                            name: 'noteUuid',
                            in: 'path',
                            description: 'Note UUID',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Note retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            statusCode: {
                                                type: 'integer',
                                                example: 200,
                                            },
                                            note: {
                                                $ref: '#/components/schemas/Note',
                                            },
                                        }
                                    },
                                },
                            },
                        },
                    }
                },
                patch: {
                    tags: ['Notes'],
                    summary: 'Update a note',
                    description: 'Update a note',
                    operationId: 'updateNote',
                    parameters: [
                        {
                            name: 'noteUuid',
                            in: 'path',
                            description: 'Note UUID',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            description: 'Title of the note',
                                        },
                                        description: {
                                            type: 'string',
                                            description: 'Description of the note',
                                        },
                                    }
                                }
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Note updated successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            statusCode: {
                                                type: 'integer',
                                                example: 200,
                                            },
                                            note: {
                                                $ref: '#/components/schemas/Note',
                                            },
                                        },
                                    },
                                }
                            }
                        }
                    }
                },
                delete: {
                    tags: ['Notes'],
                    summary: 'Delete a note',
                    description: 'Delete a note',
                    operationId: 'deleteNote',
                    parameters: [
                        {
                            name: 'noteUuid',
                            in: 'path',
                            description: 'Note UUID',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    responses: {
                        204: {
                            description: 'Note deleted successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Note',
                                    },
                                }
                            }
                        }
                    }
                },
            },
        }
    }
}

module.exports = getNoteDocs();