const express = require('express');
const router = express.Router();
const ProductController = require('../../../controllers/v1/ProductController');
const reviewController = require('../../../controllers/v1/reviewController');


router.get('/', ProductController.getProductCollection);
router.post('/', ProductController.createProductItem);
router.get('/:uuid', ProductController.getProductItem);
router.patch('/:uuid', ProductController.patchProductItem);
router.delete('/:uuid', ProductController.deleteProductItem);
router.get('/:uuid/reviews', reviewController.getProductReviews);
router.post('/:uuid/reviews', reviewController.createProductReview);

module.exports = router;