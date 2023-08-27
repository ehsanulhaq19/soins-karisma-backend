const express = require('express');
const router = express.Router();
const QuestionOptionController = require('../../../controllers/v1/QuestionOptionController');

router.get('/', QuestionOptionController.getQuestionOptionCollection);
router.post('/', QuestionOptionController.createQuestionOptionItem);
router.get('/:uuid', QuestionOptionController.getQuestionOptionItem);
router.patch('/:uuid', QuestionOptionController.patchQuestionOptionItem);
router.delete('/:uuid', QuestionOptionController.deleteQuestionOptionItem);

module.exports = router;