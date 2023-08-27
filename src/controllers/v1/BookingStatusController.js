const httpStatus = require('http-status');
const { BookingStatus } = require('../../models');
const BookingStatusSerializer = require('../../serializers/v1/BookingStatusSerializer')

/**
 * get booking status collection
 * @param {*} req 
 * @param {*} res 
 */

const getBookingStatusCollection = async (req, res) => {
    const bookingStatuses = await BookingStatus.findAll()
    const bookingStatusSerializer = new BookingStatusSerializer()
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        bookingStatuses: await bookingStatusSerializer.serializeBulk(bookingStatuses)
    } });
};


module.exports = {
    getBookingStatusCollection
}