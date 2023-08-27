const express = require('express');
const router = express.Router();
const SubscriptionController = require('../../../controllers/v1/SubscriptionController');
const reviewController = require('../../../controllers/v1/reviewController');


router.get('/', SubscriptionController.getSubscriptionCollection);
router.post('/', SubscriptionController.createSubscriptionItem);
router.get('/:uuid', SubscriptionController.getSubscriptionItem);
router.get('/:uuid/reviews', reviewController.getSubscriptionReviews);
router.post('/:uuid/reviews', reviewController.createSubscriptionReview);

module.exports = router;