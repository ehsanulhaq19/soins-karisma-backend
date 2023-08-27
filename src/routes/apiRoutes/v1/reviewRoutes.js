const express = require('express');
const router = express.Router();
const reviewController = require('../../../controllers/v1/reviewController');

router.get('/:uuid', reviewController.getReview);
router.patch('/:uuid', reviewController.patchReview);
router.delete('/:uuid', reviewController.deleteReview);



module.exports = router;