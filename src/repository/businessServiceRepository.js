const { BusinessService, BusinessServiceEmployee, BusinessServiceRoom, BusinessServiceRoomChair, Booking } = require("../models")
const BookingStatusValues = require("../models/values/BookingStatus")
const BusinessServiceRoomStatusValues = require("../models/values/BusinessServiceRoomStatus")
const BusinessServiceRoomChairStatusValues = require("../models/values/BusinessServiceRoomChairStatus")
const sequelize = require("sequelize");

const getAvailableBusinessServiceRoomChair = async(businessService, startDateTime, endDateTime) => {

    // 1- Find all business service room and chairs
    const businessServiceRooms = await BusinessServiceRoom.findAll({
        include: [
            {
                model: BusinessServiceRoomChair,
                where: {
                    statusId: BusinessServiceRoomChairStatusValues.ACTIVE.id
                }
            }
        ],
        where: {
            businessServiceId: businessService.id,
            statusId: BusinessServiceRoomStatusValues.ACTIVE.id,
        }
    })

    const allBusinessServiceRoomChairIds = []
    if (businessServiceRooms?.length) {
        businessServiceRooms.forEach(businessServiceRoom => {
            const bsRoomChairs = businessServiceRoom.BusinessServiceRoomChairs
            if (bsRoomChairs?.length) {
                bsRoomChairs.forEach(bsRoomChair => {
                    allBusinessServiceRoomChairIds.push(bsRoomChair.id)
                })
            }
        });
    }

    if (!allBusinessServiceRoomChairIds?.length) {
        return null
    }

    // 2- Find all the business service related bookings that are placed on the same time
    const bookings = await Booking.findAll({
        include: [
            {
                model: BusinessServiceEmployee,
                include: [
                    {
                        model: BusinessService
                    }
                ]
            }
        ],
        where: {
          [sequelize.Op.or]: {
            startDateTime: {
              [sequelize.Op.between]: [(new Date(startDateTime)), (new Date(endDateTime))]
            },
            endDateTime: {
              [sequelize.Op.between]: [(new Date(startDateTime)), (new Date(endDateTime))]
            },
          },
          statusId: BookingStatusValues.APPROVED.id,
          where: sequelize.where(sequelize.col('BusinessServiceEmployee.BusinessService.id'), '=',  businessService.id)
        }
    })
    
    //3- Get available business service room chair
    let availableBusinessServiceRoomId = allBusinessServiceRoomChairIds[0];
    const bookedBusinessServiceRooms = []
    if (bookings?.length) {
        bookings.forEach(booking => {
            bookedBusinessServiceRooms.push(booking.businessServiceRoomChairId)
        })
        
        const availableBookingRoomChairs = bookedBusinessServiceRooms
                            .filter(x => !allBusinessServiceRoomChairIds.includes(x))
                            .concat(allBusinessServiceRoomChairIds.filter(x => !bookedBusinessServiceRooms.includes(x)));
        
        if (!availableBookingRoomChairs?.length) {
            return null
        }

        availableBusinessServiceRoomId = availableBookingRoomChairs[0]
    }

    // 4- Fetch business service room chair data and return it in response
    const availableBusinessServiceRoom = await BusinessServiceRoomChair.findOne({
        include: [
            {
                model: BusinessServiceRoom
            }
        ],
        where: {
            id: availableBusinessServiceRoomId,
            statusId: BusinessServiceRoomChairStatusValues.ACTIVE.id
        }
    })
    
    return availableBusinessServiceRoom
}

module.exports = {
    getAvailableBusinessServiceRoomChair
}