const httpStatus = require('http-status');
const userAnswerRequest = require("../requestValidators/userAnswerRequest")
const {UserAnswer, Question, QuestionOption} = require("../../../models")
const statuses = require('../../../constants/statuses.json')
const uuidService = require("../../../services/uuidService")

const postUserAnswerItemRouteValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = userAnswerRequest.validatePostUserAnswerItemRequest(data)
    if (validationResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    let question
    try{
        const questionUuid = uuidService.decodeUuid(data.questionUuid)
        question = await Question.findOne({
            where: {
                uuid: questionUuid
            }
        })
    } catch(error) {}
    
    if (!question) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.NOT_FOUND,
            message: "Question not found"
        }
    }

    req.question = question

    let questionOption;
    try {
        const questionOptionUuid = uuidService.decodeUuid(data.questionOptionUuid)
        questionOption = await QuestionOption.findOne({
            where: {
                uuid: questionOptionUuid
            }
        })
    } catch(e) {}
    
    if (!questionOption) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.NOT_FOUND,
            message: "QuestionOption not found"
        }
    }

    if (questionOption.questionId !== question.id) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.CONFLICT,
            message: "QuestionOption is not related with Question"
        }
    }

    req.questionOption = questionOption
    
    const user = req.user
    const userAnswer = await UserAnswer.findOne({
        where: {
            userId: user.id,
            questionId: question.id,
            questionOptionId: questionOption.id
        }
    })

    if (userAnswer) {
        return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: "userAnswer already exists"
        }
    }

    return {
        type: statuses.SUCCESS
    }
}

module.exports = {
    postUserAnswerItemRouteValidator
}