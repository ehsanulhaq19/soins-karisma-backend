const express = require('express');
const router = express.Router();
const QuestionStatusController = require('../../../controllers/v1/QuestionStatusController');

router.get('/', QuestionStatusController.getQuestionStatusCollection);

module.exports = router;