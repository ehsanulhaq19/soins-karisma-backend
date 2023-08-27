const { Employee, BusinessServiceEmployee, Booking } = require("../models")
const BookingStatusValues = require("../models/values/BookingStatus")
const sequelize = require("sequelize");

const isEmployeeAvailableForBooking = async(employee, startDateTime, endDateTime) => {

    const booking = await Booking.findOne({
        include: [
            {
                model: BusinessServiceEmployee,
                include: [
                    {
                        model: Employee
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
          where: sequelize.where(sequelize.col('BusinessServiceEmployee.Employee.id'), '=',  employee.id)
        }
    })
    
    return booking ? false : true
}

module.exports = {
    isEmployeeAvailableForBooking
}