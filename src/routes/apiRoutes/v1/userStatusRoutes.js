const express = require('express');
const router = express.Router();
const UserStatusController = require('../../../controllers/v1/UserStatusController');

//User status
router.get('/', UserStatusController.getUserStatusCollection);

module.exports = router;