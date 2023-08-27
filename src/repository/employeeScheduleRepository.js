const {EmployeeSchedule, Employee, Booking, BusinessServiceEmployee} = require("../models")
const { Op } = require("sequelize");
const { DateTime } = require("luxon");

const getEmployeeAvailableSlots = async (employeeId, startDateTime, endDateTime, durationInMinutes = 30) => {
    startDateTimeObj = new Date(startDateTime);
    endDateTimeObj = new Date(endDateTime);
    
    const employee = await Employee.findOne({
        where: {
            id: employeeId
        },
        include: {
            model: EmployeeSchedule
        }
    })
    
    const bookings = await Booking.findAll({
        include: {
            model: BusinessServiceEmployee,
            where: {
                employeeId: employee.id
            }
        },
        where: {
            [Op.or]: {
              startDateTime: {
                [Op.between]: [startDateTimeObj, endDateTimeObj]
              },
              endDateTime: {
                [Op.between]: [startDateTimeObj, endDateTimeObj]
              }
            }
        },
        order: [
            ['startDateTime', 'ASC'],
            ['endDateTime', 'ASC'],
        ],
    })

    const slots = []
    let slotStartDateTimeObj = DateTime.fromISO(startDateTime)
    let slotEndDateTimeObj = DateTime.fromISO(endDateTime)

    let employeeScheduleStartTime = DateTime.fromFormat(employee.EmployeeSchedule.startTime, "hh:mm:ss");
    let employeeScheduleEndTime = DateTime.fromFormat(employee.EmployeeSchedule.endTime, "hh:mm:ss");

    while(slotStartDateTimeObj < slotEndDateTimeObj) {
        const start = slotStartDateTimeObj
        const end = slotStartDateTimeObj.plus({ minutes: durationInMinutes })
        employeeScheduleStartTime = employeeScheduleStartTime.set({
            year: start.toFormat("yyyy"),
            month: start.toFormat("MM"),
            day: start.toFormat("dd")
        })
        employeeScheduleEndTime = employeeScheduleEndTime.set({
            year: start.toFormat("yyyy"),
            month: start.toFormat("MM"),
            day: start.toFormat("dd")
        })

        if (start >= employeeScheduleStartTime && end <= employeeScheduleEndTime) {
            slots.push({
                start: start.toISO(), 
                end: end.toISO()
            })
        }
        slotStartDateTimeObj = slotStartDateTimeObj.plus({ minutes: durationInMinutes })
    }
    
    if (bookings.length) {
        const bookingSlots = []
        bookings.map((booking) => {
            bookingSlots.push({
                start: booking.startDateTime,
                end: booking.endDateTime
            })
        })
        
        bookingSlots.forEach(bookingSlot => {
            let isBetweenSlotTaken = false
            slots.forEach((slot, index) => {
                if (
                    DateTime.fromMillis(bookingSlot.start.getTime()) <= DateTime.fromISO(slot.start) &&
                    DateTime.fromISO(slot.end) <= DateTime.fromMillis(bookingSlot.end.getTime())
                ) {
                    delete slots[index]
                } else if (
                    !isBetweenSlotTaken &&
                    DateTime.fromMillis(bookingSlot.end.getTime()) > DateTime.fromISO(slot.start) &&
                    DateTime.fromMillis(bookingSlot.end.getTime()) < DateTime.fromISO(slot.end)
                ) {
                    isBetweenSlotTaken = true
                    delete slots[index]
                }
            })
        })
    }

    return slots.filter(() => true)
}

module.exports = {
    getEmployeeAvailableSlots
}