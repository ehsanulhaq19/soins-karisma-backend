const express = require('express');
const router = express.Router();
const BookingStatusController = require('../../../controllers/v1/BookingStatusController');

//Booking status
router.get('/', BookingStatusController.getBookingStatusCollection);

module.exports = router;