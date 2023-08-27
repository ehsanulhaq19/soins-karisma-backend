const express = require('express');
const router = express.Router();
const BusinessServiceEmployeeController = require('../../../controllers/v1/BusinessServiceEmployeeController');

router.get('/', BusinessServiceEmployeeController.getBusinessServiceEmployeeCollection);
router.post('/', BusinessServiceEmployeeController.createBusinessServiceEmployeeItem);

module.exports = router;