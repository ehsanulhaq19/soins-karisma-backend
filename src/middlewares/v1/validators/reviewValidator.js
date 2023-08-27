const statuses = require('../../../constants/statuses.json')
const httpStatus = require('http-status');
const { User } = require('../../../models');
const uuidService = require("../../../services/uuidService")
const { validateCreateReviewRequest } = require("../../../validations/v1/requestValidators/reviewRequest")

const validator = async (req, res, next) => {

    let validatorResponse = null;
    const requestUrl = req.baseUrl
    if (req.method === 'POST') {
        if (requestUrl === '/api/v1/review') {       
                 
            validatorResponse = await validateCreateReviewRequest(req.body)

        }

        if (validatorResponse) {
            if (validatorResponse.type === statuses.ERROR) {
                delete validatorResponse["type"]
                return res.status(httpStatus.BAD_REQUEST).json({
                    statusCode: httpStatus.BAD_REQUEST,
                    message: validatorResponse.message
                });
            }
        }
        
    }



    next()
}

module.exports = validator;