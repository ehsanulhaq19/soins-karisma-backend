const express = require('express');
const router = express.Router();
const UserProductController = require('../../../controllers/v1/UserProductController');

router.get('/', UserProductController.getUserProductCollection);

module.exports = router;