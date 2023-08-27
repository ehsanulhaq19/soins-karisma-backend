const {QuestionOptionStatus} = require("../../models")
const QuestionOptionStatusSerializer = require("../../serializers/v1/QuestionOptionStatusSerializer")
const httpStatus = require('http-status');

/**
 * get question option status collection
 * @param {*} req 
 * @param {*} res 
 */

const getQuestionOptionStatusCollection = async(req, res) => {
    const questionOptionStatuses = await QuestionOptionStatus.findAll()
    const questionOptionStatusSerializer = new QuestionOptionStatusSerializer()
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        questionOptionStatuses: await questionOptionStatusSerializer.serializeBulk(questionOptionStatuses)
    } });
}

module.exports = {
    getQuestionOptionStatusCollection
}