const {Booking, BusinessService, Salon, BusinessServiceEmployee, User, Subscription} = require("../models")
const sequelize = require('sequelize');
const BookingStatusValues = require("../models/values/BookingStatus")

const getBookingsStats = async(params) => {
    const {fromDate=null, toDate=null, salon} = params

    const bookings = await Booking.findAll({
        include: [
            {
                model: BusinessServiceEmployee,
                include: [
                    {
                        model: BusinessService,
                        include: {
                            model: Salon
                        }
                    }
                ]
            },
            {
                model: User,
                as: 'Booker',
                include: [
                    {
                        model: Subscription
                    }
                ]
            }
        ],
        where: {
            ...(
                salon && {
                    where: sequelize.where(sequelize.col('BusinessServiceEmployee.BusinessService.Salon.id'), '=',  salon.id)
                }
            ),
            ...(
                fromDate && toDate && {
                    startDateTime: {
                        [sequelize.Op.between]: [fromDate, toDate]
                    }
                }
            )
        }
    })

    const salonStats = {
        "totalBookings": bookings.length,
        "completedBookings": 0,
        "pendingBookings": 0,
        "cancelledBookings": 0,
        "bookingsRequests": 0,
        "weeksWorkload": 0,
        "totalCustomers": 0,
        "totalEarnings": 0
    }

    const customersIdsObject = {}
    const totalEarningObject = {}
    for(let i = 0; i < bookings.length; i++) {
        const booking = bookings[i]
        customersIdsObject[booking.bookerId] = true

        if (booking.statusId === BookingStatusValues.COMPLETED.id) {
            salonStats["completedBookings"] += 1

        } else if (booking.statusId === BookingStatusValues.PENDING.id) {
            salonStats["pendingBookings"] += 1
        } else if (booking.statusId === BookingStatusValues.DELETE.id) {
            salonStats["cancelledBookings"] += 1
        } else if (booking.statusId === BookingStatusValues.APPROVED.id) {
            salonStats["bookingsRequests"] += 1
        }

        const subscription = booking?.Booker?.Subscriptions[0]
        if (subscription) {
            totalEarningObject[booking.bookerId] = subscription?.price ? subscription?.price : 0
        }
    }
    
    const userSubscriptionAmountArray = Object.values(totalEarningObject)
    salonStats["totalEarnings"] = userSubscriptionAmountArray.length ? userSubscriptionAmountArray.reduce((prev, next) => prev + next) : 0
    salonStats["totalCustomers"] = Object.keys(customersIdsObject).length

    return salonStats
}

module.exports = {
    getBookingsStats
}