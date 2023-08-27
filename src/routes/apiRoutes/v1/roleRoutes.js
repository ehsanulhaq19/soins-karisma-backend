const express = require('express');
const router = express.Router();
const RoleController = require('../../../controllers/v1/RoleController');

router.get('/', RoleController.getRoleCollection);

module.exports = router;