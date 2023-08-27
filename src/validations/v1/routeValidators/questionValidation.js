const httpStatus = require('http-status');
const questionRequest = require("../requestValidators/questionRequest")
const {Question, QuestionStatus, QuestionType} = require("../../../models")
const statuses = require('../../../constants/statuses.json')

const postQuestionItemRouteValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = questionRequest.validatePostQuestionItemRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    const questionStatus = await QuestionStatus.findOne({
        where: {
            id: data.statusId
        }
    })

    if (!questionStatus) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: "Invalid question status value"
        }
    }

    const questionType = await QuestionType.findOne({
        where: {
            id: data.typeId
        }
    })

    if (!questionType) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: "Invalid question type value"
        };
    }

    return {
        type: statuses.SUCCESS
    }
}

const patchQuestionItemRouteValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = questionRequest.validatePatchQuestionItemRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        };
    }

    if (data.statusId) {
        const questionStatus = await QuestionStatus.findOne({
            where: {
                id: data.statusId
            }
        })
          
        if (!questionStatus) {
            return {
                type: statuses.ERROR,
                statusCode: httpStatus.BAD_REQUEST,
                message: "Invalid question status value"
            };
        }
    }

    return {
        type: statuses.SUCCESS
    }
}

const getQuestionItemRouteValidator = async(req) => {
    const data = req.query
    //validate query data
    const validationResponse = questionRequest.validateGetQuestionItemRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        };
    }

    return {
        type: statuses.SUCCESS
    }
}

const getQuestionCollectionRouteValidator = async(req) => {
    const data = req.query
    //validate query data
    const validationResponse = questionRequest.validateGetQuestionCollectionRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        };
    }

    return {
        type: statuses.SUCCESS
    }
}

module.exports = {
    postQuestionItemRouteValidator,
    patchQuestionItemRouteValidator,
    getQuestionItemRouteValidator,
    getQuestionCollectionRouteValidator
}