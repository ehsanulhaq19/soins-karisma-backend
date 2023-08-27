const express = require('express');
const router = express.Router();
const EmployeeScheduleController = require('../../../controllers/v1/EmployeeScheduleController');

router.get('/', EmployeeScheduleController.getEmployeeScheduleCollection);
router.post('/', EmployeeScheduleController.createEmployeeScheduleItem);

module.exports = router;