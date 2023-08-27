function getMeta() {
    return {
        "openapi": "3.0.3",
        "info": {
            "title": "Soins Karisma API",
            "description": "Soins Karisma APIs endpoints, payloads and responses ",
            "version": "1.0.0",
            "contact": {
            "name": "------",
            "email": "-------",
            "url": "------"
            }
        },
        "servers": [
            {
                "url": process.env.API_BASE_URL,
                "description": "Soins Karisma Apis"
            }
        ]
    }
}

module.exports = getMeta()