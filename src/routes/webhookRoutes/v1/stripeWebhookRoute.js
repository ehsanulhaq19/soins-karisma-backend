const express = require('express');
const router = express.Router();
const StripeSubscriptionWebhook = require('../../../webhooks/v1/StripeSubscriptionWebhook');
const StripePaymentWebhook = require('../../../webhooks/v1/StripePaymentWebhook');

router.post('/subscription', StripeSubscriptionWebhook.stripeSubscription);
router.post('/payment', StripePaymentWebhook.stripeSubscription);

module.exports = router;