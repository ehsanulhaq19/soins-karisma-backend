const httpStatus = require('http-status');
const { Question, QuestionOption, UserAnswer } = require('../../models');
const uuidService = require('../../services/uuidService')
const QuestionSerializer = require('../../serializers/v1/QuestionSerializer')
const apiDataJson = require("../../constants/apiConfig.json");

/**
 * get question item
 * @param {*} req 
 * @param {*} res 
 */

const getQuestionItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    const group = req.query.group
    const include = (
        group && {
            include: [
                {
                    model: QuestionOption,
                }
            ],
        }
    )
    
    await Question.findOne({
        ...include,
        where: { uuid }
    }).then(async(question) => {
        const groups = ["read", group]
        const questionSerializer = new QuestionSerializer(groups)
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, question: await questionSerializer.serialize(question)} });
    })
    .catch(error => {
        console.log(error)
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Question not found"} });
    });
};

/**
 * patch question item
 * @param {*} req
 * @param {*} res 
 */

 const patchQuestionItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)

    let question;
    try {
        question = await Question.findOne({ where: { uuid } })
    } catch (error) {
        question = null
    }
    
    if (!question) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Question not found"} });
    }
    
    const data = req.body
    await question.update({
        ...(data.heading && {heading: data.heading}),
        ...(data.position && {position: data.position}),
        ...(data.statusId && {statusId: data.statusId})
    })

    const questionSerializer = new QuestionSerializer()
    res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, question: await questionSerializer.serialize(question)} });
 };

/**
 * create question item
 * @param {*} req 
 * @param {*} res 
 */

 const createQuestionItem = async (req, res) => {
    const data = req.body

    //create question
    const newQuestion = await Question.build({
        heading: data.heading,
        position: data.position,
        statusId: data.statusId,
        typeId: data.typeId
    });

    //send response
    await newQuestion.save()
    .then(async(question) => {
        const questionSerializer = new QuestionSerializer()
        return res.status(httpStatus.CREATED).json({ ...{
            statusCode: httpStatus.CREATED,
            question: await questionSerializer.serialize(question)
        } });
    })
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "Question is not created"
        } });
    });
};

/**
 * get question collection
 * @param {*} req 
 * @param {*} res 
 */

 const getQuestionCollection = async (req, res) => {
    const data = req.query
    const groups = req?.query?.groups && req.query.groups.split(",")
    const include = (
        groups?.length && {
            include: [
                (
                    (groups.includes("questionOptions") || groups.includes("userAnswers")) && {
                        model: QuestionOption,
                        include: [
                            (
                                groups.includes("userAnswers") && {
                                    model: UserAnswer,
                                }
                            )
                        ].filter(data => data !== false)
                    }
                ),
            ].filter(data => data !== false),
        }
    )

    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    console.log(":include = ", include)
    const questions = await Question.findAll({
        ...(include && {...include}),
        order: [
            ['position', 'ASC']
        ],
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })

    const questionSerializer = new QuestionSerializer(["read", ...groups])
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        questions: await questionSerializer.serializeBulk(questions)
    } });
};

/**
 * delete question
 * @param {*} req
 * @param {*} res 
 */

 const deleteQuestionItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    let question;
    
    try {
        question = await Question.findOne({ where: { uuid } })
    } catch (error) {
        question = null
    }
    
    if (!question) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Question not found"} });
    }

    await question.destroy()
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: "Question is not deleted"} });
    })

    res.status(httpStatus.NO_CONTENT).json({ ...{statusCode: httpStatus.NO_CONTENT}});
 };

module.exports = {
    getQuestionItem,
    patchQuestionItem,
    createQuestionItem,
    getQuestionCollection,
    deleteQuestionItem
}