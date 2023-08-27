const express = require('express');
const router = express.Router();
const SubscriptionCollectionController = require('../../../controllers/v1/SubscriptionCollectionController');


router.get('/', SubscriptionCollectionController.getSubscriptionCollectionCollection);
router.post('/', SubscriptionCollectionController.createSubscriptionCollectionItem);
router.get('/:uuid', SubscriptionCollectionController.getSubscriptionCollectionItem);
router.patch('/:uuid', SubscriptionCollectionController.patchSubscriptionCollectionItem);
router.delete('/:uuid/subscriptions', SubscriptionCollectionController.deleteSubscriptionCollectionCollection);

module.exports = router;