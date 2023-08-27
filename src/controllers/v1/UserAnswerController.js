const httpStatus = require('http-status');
const { UserAnswer, User, Question, QuestionOption } = require('../../models');
const uuidService = require('../../services/uuidService')
const UserAnswerSerializer = require('../../serializers/v1/UserAnswerSerializer')
const apiDataJson = require("../../constants/apiConfig.json");
const UserAnswerStatusValues = require("../../models/values/UserAnswerStatus")
const UserAnswerTypeValues = require("../../models/values/UserAnswerType")

/**
 * create user answer item
 * @param {*} req 
 * @param {*} res 
 */

 const createUserAnswerItem = async (req, res) => {
    const user = req.user
    const question = req.question
    const questionOption = req.questionOption

    //create userAnswer
    const newUserAnswer = await UserAnswer.build({
        userId: user.id,
        questionId: question.id,
        questionOptionId: questionOption.id,
        statusId: UserAnswerStatusValues.ACTIVE.id,
        typeId: UserAnswerTypeValues.DEFAULT.id
    });

    //send response
    await newUserAnswer.save()
    .then(async(userAnswerResponse) => {
        const userAnswer = await UserAnswer.findOne({
            include: [
                {
                    model: User
                },
                {
                    model: Question
                },
                {
                    model: QuestionOption
                }
            ],
            where: {
                id: userAnswerResponse.id
            }
        })
        const userAnswerSerializer = new UserAnswerSerializer()
        return res.status(httpStatus.CREATED).json({ ...{
            statusCode: httpStatus.CREATED,
            userAnswer: await userAnswerSerializer.serialize(userAnswer)
        } });
    })
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "UserAnswer is not created"
        } });
    });
};


/**
 * delete question
 * @param {*} req
 * @param {*} res 
 */

 const deleteUserAnswerItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    let userAnswer;
    
    try {
        userAnswer = await UserAnswer.findOne({ where: { uuid } })
    } catch (error) {
        userAnswer = null
    }
    
    if (!userAnswer) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "UserAnswer not found"} });
    }

    await userAnswer.destroy()
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: "UserAnswer is not deleted"} });
    })

    res.status(httpStatus.NO_CONTENT).json({ ...{statusCode: httpStatus.NO_CONTENT}});
 };

module.exports = {
    createUserAnswerItem,
    deleteUserAnswerItem
}