const express = require('express');
const router = express.Router();
const QuestionTypeController = require('../../../controllers/v1/QuestionTypeController');

router.get('/', QuestionTypeController.getQuestionTypeCollection);

module.exports = router;