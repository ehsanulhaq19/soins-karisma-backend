const httpStatus = require('http-status');
const statuses = require('../../../constants/statuses.json')
const uuidService = require("../../../services/uuidService")
const noteRequest = require("../../../validations/v1/requestValidators/noteRequest")

const validator = async (req, res, next) => {

    const method = req.method
    if (method === 'POST' || method === 'PATCH') {
        const data = req.body
        //validate query data
        const validationResponse = noteRequest.validatePostNoteRequest(data)
        if (validationResponse.type === statuses.ERROR) {
            return res.status(httpStatus.BAD_REQUEST).json({
                ...{
                    statusCode: httpStatus.BAD_REQUEST,
                    message: validationResponse.message
                }
            });
        }
    }
    next()
}

module.exports = validator;