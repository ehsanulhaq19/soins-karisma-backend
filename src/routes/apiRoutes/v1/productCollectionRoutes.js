const express = require('express');
const router = express.Router();
const ProductCollectionController = require('../../../controllers/v1/ProductCollectionController');

router.get('/', ProductCollectionController.getProductCollectionCollection);
router.post('/', ProductCollectionController.createProductCollectionItem);
router.get('/:uuid', ProductCollectionController.getProductCollectionItem);
router.delete('/:uuid', ProductCollectionController.deleteProductCollectionItem);

module.exports = router;