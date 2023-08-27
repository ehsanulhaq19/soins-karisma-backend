const {QuestionType} = require("../../models")
const QuestionTypeSerializer = require("../../serializers/v1/QuestionTypeSerializer")
const httpStatus = require('http-status');

/**
 * get question type collection
 * @param {*} req 
 * @param {*} res 
 */

const getQuestionTypeCollection = async(req, res) => {
    const questionTypes = await QuestionType.findAll()
    const questionTypeSerializer = new QuestionTypeSerializer()
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        questionTypes: await questionTypeSerializer.serializeBulk(questionTypes)
    } });
}

module.exports = {
    getQuestionTypeCollection
}