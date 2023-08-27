function getMediaDocs() {
    return {
        schemas: {
            Media: {
                type: 'object',
                properties: {
                    reference: {
                        type: 'string',
                        description: 'The reference of the media',
                    },
                    url: {
                        type: 'string',
                        description: 'The url of the media',
                    },
                }
            }
        },
        paths: {
            '/api/v1/media': {
                post: {
                    tags: ['Media'],
                    summary: 'Upload a media',
                    description: 'Upload a media',
                    operationId: 'uploadMedia',
                    consumes: [
                        'multipart/form-data'
                    ],
                    parameters: [
                        {
                            name: 'contentType',
                            in: 'query',
                            description: 'The content type of the media',
                            required: false,
                            schema: {
                                type: 'string',
                            },
                        },
                        {
                            name: 'extension',
                            in: 'query',
                            description: 'The extension of the media',
                            required: false,
                            schema: {
                                type: 'string',
                            },
                        },
                        {
                            name: 'directory',
                            in: 'query',
                            description: 'The directory of the media',
                            required: false,
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        file: {
                                            type: 'string',
                                            format: 'binary',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Media uploaded',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Media',
                                    },
                                },
                            },
                        },
                    }
                }
            }
        }
    }
}

module.exports = getMediaDocs();