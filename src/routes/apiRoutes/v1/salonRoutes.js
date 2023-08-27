const express = require('express');
const router = express.Router();
const SalonController = require('../../../controllers/v1/SalonController');
const reviewController = require('../../../controllers/v1/reviewController');
const NoteController = require('../../../controllers/v1/noteController');


router.get('/', SalonController.getSalonCollection);
router.post('/', SalonController.createSalonItem);
router.get('/locations', SalonController.getSalonLocationCollection);
router.get('/:uuid', SalonController.getSalonItem);
router.patch('/:uuid', SalonController.patchSalonItem);
router.get('/:uuid/stats', SalonController.getSalonStatsItem);
router.get('/:uuid/customers', SalonController.getSalonCustomers);
router.delete('/:uuid/images', SalonController.deleteSalonImagesCollection);

router.get('/:uuid/reviews', reviewController.getSalonReviews);
router.post('/:uuid/reviews', reviewController.createSalonReview);
router.post('/:uuid/notes', NoteController.createNote);
router.get('/:uuid/notes', NoteController.getNotes);

module.exports = router;