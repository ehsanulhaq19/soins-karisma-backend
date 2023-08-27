const {Salon, User, SalonCustomer} = require("../models")
const SalonCustomerStatusValues = require("../models/values/SalonCustomerStatus")
const SalonCustomerTypeValues = require("../models/values/SalonCustomerType")

const createOrUpdateSalonCustomer = async(salon, user) => {
    let salonCustomer;
    salonCustomer = await SalonCustomer.findOne({
        where: {
            userId: user.id,
            statusId: SalonCustomerStatusValues.ACTIVE.id
        }
    })

    if (!salonCustomer) {
        salonCustomer = await SalonCustomer.create({
            userId: user.id,
            salonId: salon.id,
            statusId: SalonCustomerStatusValues.ACTIVE.id,
            typeId: SalonCustomerTypeValues.DEFAULT.id
        })
    } else {
        await salonCustomer.update({
            salonId: salon.id
        })
    }

    return salonCustomer
}

module.exports = {
    createOrUpdateSalonCustomer
}