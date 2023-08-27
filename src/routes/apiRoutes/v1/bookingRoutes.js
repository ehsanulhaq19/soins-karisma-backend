const express = require('express');
const router = express.Router();
const BookingController = require('../../../controllers/v1/BookingController');

router.post('/', BookingController.createBookingItem);
router.post('/:uuid/cancel', BookingController.postBookingCancelItem);
router.get('/', BookingController.getBookingCollection);
router.get('/:uuid', BookingController.getBookingItem);
router.patch('/:uuid', BookingController.patchBookingItem);
router.delete('/:uuid', BookingController.deleteBookingItem);

module.exports = router;