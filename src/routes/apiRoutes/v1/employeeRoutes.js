const express = require('express');
const router = express.Router();
const EmployeeController = require('../../../controllers/v1/EmployeeController');

router.get('/', EmployeeController.getEmployeeCollection);
router.get('/:uuid', EmployeeController.getEmployeeItem);
router.post('/role', EmployeeController.assignRoleToEmployee);
router.patch('/:uuid', EmployeeController.patchEmployeeItem);

module.exports = router;