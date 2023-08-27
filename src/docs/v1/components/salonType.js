function getSalonTypeDocs() {
    return {
        schemas: {
            SalonType: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "Salon type identifier",
                        example: "1",
                    },
                    name: {
                        type: "string",
                        description: "Type Name",
                        example: "Default",
                    },
                },
            }
        }
    }
}

module.exports = getSalonTypeDocs()