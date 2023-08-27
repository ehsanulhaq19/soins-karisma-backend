const {QuestionStatus} = require("../../models")
const QuestionStatusSerializer = require("../../serializers/v1/QuestionStatusSerializer")
const httpStatus = require('http-status');

/**
 * get question status collection
 * @param {*} req 
 * @param {*} res 
 */

const getQuestionStatusCollection = async(req, res) => {
    const questionStatuses = await QuestionStatus.findAll()
    const questionStatusSerializer = new QuestionStatusSerializer()
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        questionStatuses: await questionStatusSerializer.serializeBulk(questionStatuses)
    } });
}

module.exports = {
    getQuestionStatusCollection
}