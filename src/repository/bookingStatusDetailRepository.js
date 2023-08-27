const {BookingStatusDetail} = require("../models")
const sequelize = require('sequelize');
const BookingStatusValues = require("../models/values/BookingStatus")
const BookingStatusDetailStatus = require("../models/values/BookingStatusDetailStatus")
const BookingStatusDetailType = require("../models/values/BookingStatusDetailType")

const setBookingCancelStatus = async({booking, cancelDescription, user}) => {
    await booking.update({
        statusId: BookingStatusValues.CANCEL.id
    })

    let bookingStatusDetail = await BookingStatusDetail.findOne({
        where: {
            bookingId: booking.id,
            typeId: BookingStatusDetailType.CANCEL.id,
        }
    })

    if (!bookingStatusDetail) {
        bookingStatusDetail = await BookingStatusDetail.create({
            bookingId: booking.id,
            userId: user.id,
            description: cancelDescription,
            typeId: BookingStatusDetailType.CANCEL.id,
            statusId: BookingStatusDetailStatus.ACTIVE.id
        })
    } else {
        await bookingStatusDetail.update({
            description: cancelDescription,
            userId: user.id,
            statusId: BookingStatusDetailStatus.ACTIVE.id
        })
    }


    return {
        booking,
        bookingStatusDetail
    }
}

module.exports = {
    setBookingCancelStatus
}