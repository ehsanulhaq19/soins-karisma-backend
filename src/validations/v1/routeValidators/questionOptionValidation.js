const httpStatus = require('http-status');
const questionOptionRequest = require("../requestValidators/questionOptionRequest")
const {Question, QuestionOptionStatus} = require("../../../models")
const QuestionStatusValues = require("../../../models/values/QuestionStatus")
const statuses = require('../../../constants/statuses.json')
const uuidService = require("../../../services/uuidService")

const postQuestionOptionItemRouteValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = questionOptionRequest.validatePostQuestionOptionItemRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    const questionOptionStatus = await QuestionOptionStatus.findOne({
        where: {
            id: data.statusId
        }
    })

    if (!questionOptionStatus) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: "Invalid question option status value"
        }
    }

    let question;
    try {
      question = await Question.findOne({
        where: {
          uuid: uuidService.decodeUuid(data.questionUuid),
          statusId: QuestionStatusValues.ACTIVE.id
        }
      })
    } catch (error) {}

    if (!question) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.NOT_FOUND,
        message: "Question not found"
      };
    }

    req.question = question

    return {
        type: statuses.SUCCESS
    }
}

const patchQuestionOptionItemRouteValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = questionOptionRequest.validatePatchQuestionOptionItemRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        };
    }

    if (data?.statusId) {
        const questionOptionStatus = await QuestionOptionStatus.findOne({
            where: {
                id: data.statusId
            }
        })
    
        if (!questionOptionStatus) {
            return {
                type: statuses.ERROR,
                statusCode: httpStatus.BAD_REQUEST,
                message: "Invalid question option status value"
            }
        }
    }

    return {
        type: statuses.SUCCESS
    }
}

const getQuestionOptionItemRouteValidator = async(req) => {
    const data = req.query
    //validate query data
    const validationResponse = questionOptionRequest.validateGetQuestionOptionItemRequest(data)
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

const getQuestionOptionCollectionRouteValidator = async(req) => {
    const data = req.query
    //validate query data
    const validationResponse = questionOptionRequest.validateGetQuestionOptionCollectionRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        };
    }

    let question;
    try {
      question = await Question.findOne({
        where: {
          uuid: uuidService.decodeUuid(data.questionUuid),
          statusId: QuestionStatusValues.ACTIVE.id
        }
      })
    } catch (error) {}

    if (!question) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.NOT_FOUND,
        message: "Question not found"
      };
    }

    req.question = question

    return {
        type: statuses.SUCCESS
    }
}

module.exports = {
    postQuestionOptionItemRouteValidator,
    patchQuestionOptionItemRouteValidator,
    getQuestionOptionItemRouteValidator,
    getQuestionOptionCollectionRouteValidator
}