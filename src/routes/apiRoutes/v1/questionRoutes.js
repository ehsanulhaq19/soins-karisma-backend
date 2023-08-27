const express = require('express');
const router = express.Router();
const QuestionController = require('../../../controllers/v1/QuestionController');

router.get('/', QuestionController.getQuestionCollection);
router.post('/', QuestionController.createQuestionItem);
router.get('/:uuid', QuestionController.getQuestionItem);
router.patch('/:uuid', QuestionController.patchQuestionItem);
router.delete('/:uuid', QuestionController.deleteQuestionItem);

module.exports = router;