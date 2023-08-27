const express = require('express');
const router = express.Router();
const StripeCustomerController = require('../../../controllers/v1/StripeCustomerController');

router.get('/payment_methods', StripeCustomerController.getStripeCustomerPaymentMethods);

module.exports = router;