const express = require('express');
const router = express.Router();
const OrderController = require('../../../controllers/v1/OrderController');

router.get('/:uuid', OrderController.getOrderItem);
router.post('/:uuid/charge/success', OrderController.postOrderChargeSuccessItem);

module.exports = router;