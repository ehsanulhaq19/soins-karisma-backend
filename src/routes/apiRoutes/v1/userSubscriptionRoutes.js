const express = require('express');
const router = express.Router();
const UserSubscriptionController = require('../../../controllers/v1/UserSubscriptionController');

router.post('/', UserSubscriptionController.createUserSubscriptionItem);
router.post('/charge/success', UserSubscriptionController.postUserSubscriptionChargeSuccessItem);
router.get('/', UserSubscriptionController.getUserSubscriptionCollection);

module.exports = router;