const express = require('express');
const router = express.Router();
const StripePaymentController = require('../../../controllers/v1/payment/StripePaymentController');

router.post('/subscription/checkout', StripePaymentController.createSubscriptionPayment);
router.post('/subscription/checkout_session', StripePaymentController.createSubscriptionCheckoutSession);
router.post('/subscription/payment_intent', StripePaymentController.createSubscriptionPaymentIntent);
router.post('/subscription/charge', StripePaymentController.createSubscriptionChargeItem);
router.post('/subscription/payment_sheet', StripePaymentController.createSubscriptionPaymentSheet);
router.post('/order/checkout', StripePaymentController.createOrderCheckoutPayment);
router.post('/order/payment_intent', StripePaymentController.createOrderPaymentIntent);
router.post('/order/charge', StripePaymentController.createOrderChargeItem);

module.exports = router;