const express = require('express');
const router = express.Router();
const UserAnswerController = require('../../../controllers/v1/UserAnswerController');

router.post('/', UserAnswerController.createUserAnswerItem);
router.delete('/:uuid', UserAnswerController.deleteUserAnswerItem);

module.exports = router;