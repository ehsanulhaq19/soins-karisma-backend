const express = require('express');
const router = express.Router();
const CartItemController = require('../../../controllers/v1/CartItemController');

router.get('/', CartItemController.getCartItemCollection);
router.post('/', CartItemController.createCartItemItem);
router.get('/:uuid', CartItemController.getCartItemItem);
router.patch('/:uuid', CartItemController.patchCartItemItem);
router.delete('/:uuid', CartItemController.deleteCartItemItem);

module.exports = router;