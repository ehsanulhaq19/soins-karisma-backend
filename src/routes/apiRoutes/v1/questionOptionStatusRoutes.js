const express = require('express');
const router = express.Router();
const QuestionOptionStatusController = require('../../../controllers/v1/QuestionOptionStatusController');

router.get('/', QuestionOptionStatusController.getQuestionOptionStatusCollection);

module.exports = router;