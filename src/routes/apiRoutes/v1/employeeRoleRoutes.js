const express = require('express');
const router = express.Router();
const EmployeeRoleController = require('../../../controllers/v1/EmployeeRoleController');

router.get('/', EmployeeRoleController.getEmployeeRoles);
router.post('/', EmployeeRoleController.createEmployeeRole);
router.get('/:id', EmployeeRoleController.getEmployeeRole);
router.patch('/:id', EmployeeRoleController.updateEmployeeRole);
router.delete('/:id', EmployeeRoleController.deleteEmployeeRole);

module.exports = router;
