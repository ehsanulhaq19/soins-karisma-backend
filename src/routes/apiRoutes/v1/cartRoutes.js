const express = require('express');
const router = express.Router();
const CartController = require('../../../controllers/v1/CartController');

router.get('/', CartController.getCartCollection);
router.post('/', CartController.createCartItem);
router.get('/:uuid', CartController.getCartItem);
router.patch('/:uuid', CartController.patchCartItem);
router.delete('/:uuid', CartController.deleteCartItem);

module.exports = router;