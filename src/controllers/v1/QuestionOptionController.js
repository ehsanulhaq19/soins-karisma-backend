const httpStatus = require('http-status');
const { Question, QuestionOption, QuestionOptionStatus } = require('../../models');
const uuidService = require('../../services/uuidService')
const QuestionOptionSerializer = require('../../serializers/v1/QuestionOptionSerializer')
const apiDataJson = require("../../constants/apiConfig.json");
const QuestionTypeValues = require("../../models/values/QuestionOptionType");

/**
 * get question option item
 * @param {*} req 
 * @param {*} res 
 */

const getQuestionOptionItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    const group = req.query.group

    await QuestionOption.findOne({ 
        where: { uuid },
        include: [
            {
                model: Question
            },
            {
                model: QuestionOptionStatus
            }
        ]
    }).then(async(question) => {
        if (question) {
            const groups = ["read", group]
            const questionOptionSerializer = new QuestionOptionSerializer(groups)
            return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, questionOption: await questionOptionSerializer.serialize(question)} });
        }
        
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "QuestionOption not found"} });
    })
    .catch(error => {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "QuestionOption not found"} });
    });
};

/**
 * patch question option item
 * @param {*} req
 * @param {*} res 
 */

 const patchQuestionOptionItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    let questionOption;
    try {
        questionOption = await QuestionOption.findOne({ where: { uuid } })
    } catch (error) {
        questionOption = null
    }
    
    if (!questionOption) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "QuestionOption not found"} });
    }
    
    const data = req.body
    await questionOption.update({
        ...(data.content && {content: data.content}),
        ...(data.statusId && {statusId: data.statusId})
    })

    const questionOptionData = await QuestionOption.findOne({
        include: [
            {
                model: QuestionOptionStatus
            },
            {
                model: Question
            }
        ],
        where: {
            id: questionOption.id
        }
    })

    const questionOptionSerializer = new QuestionOptionSerializer()
    res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, questionOption: await questionOptionSerializer.serialize(questionOptionData)} });
 };

/**
 * create question option item
 * @param {*} req 
 * @param {*} res 
 */

 const createQuestionOptionItem = async (req, res) => {
    const data = req.body
    const question = req.question

    //create question
    const newQuestionOption = await QuestionOption.build({
        content: data.content,
        questionId: question.id,
        statusId: data.statusId,
        typeId: QuestionTypeValues.DEFAULT.id
    });

    //send response
    await newQuestionOption.save()
    .then(async(questionOption) => {
        const questionOptionSerializer = new QuestionOptionSerializer()
        return res.status(httpStatus.CREATED).json({ ...{
            statusCode: httpStatus.CREATED,
            questionOption: await questionOptionSerializer.serialize(questionOption)
        } });
    })
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "QuestionOption is not created"
        } });
    });
};

/**
 * get question option collection
 * @param {*} req 
 * @param {*} res 
 */

 const getQuestionOptionCollection = async (req, res) => {
    const data = req.query
    const question = req.question
    const group = req.query.group

    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    const questionOptions = await QuestionOption.findAll({
        where: {
            questionId: question.id
        },
        include: [
            {
                model: Question,
            },
            {
                model: QuestionOptionStatus
            }
        ],
        order: [
            ['id', 'ASC']
        ],
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })
    
    const groups = ["read", group]
    const questionOptionSerializer = new QuestionOptionSerializer(groups)
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        questionOptions: await questionOptionSerializer.serializeBulk(questionOptions)
    } });
};

/**
 * delete question option
 * @param {*} req
 * @param {*} res 
 */

 const deleteQuestionOptionItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    let questionOption;
    try {
        questionOption = await QuestionOption.findOne({ where: { uuid } })
    } catch (error) {
        questionOption = null
    }
    
    if (!questionOption) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Question option not found"} });
    }
    
    await questionOption.destroy()
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: "Question option is not deleted"} });
    })

    res.status(httpStatus.NO_CONTENT).json({ ...{statusCode: httpStatus.NO_CONTENT}});
 };

module.exports = {
    getQuestionOptionItem,
    patchQuestionOptionItem,
    createQuestionOptionItem,
    getQuestionOptionCollection,
    deleteQuestionOptionItem
}