const express = require('express');
const router = express.Router();
const CustomerController = require('../../../controllers/v1/CustomerController');

router.get('/', CustomerController.getCustomerCollection);

module.exports = router;