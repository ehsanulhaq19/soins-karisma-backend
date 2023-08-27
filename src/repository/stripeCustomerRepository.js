const {StripeCustomer} = require("../models")
const StripeCustomerStatus = require("../models/values/StripeCustomerStatus")

const createStripeCustomer = async(data) => {
    const {stripeCustomerId, userId} = data
    let stripeCustomer = await StripeCustomer.findOne({
        where: {
            stripeCustomerId: stripeCustomerId
        }
    })

    if (!stripeCustomer) {
        stripeCustomer = await StripeCustomer.create({
                            stripeCustomerId,
                            userId,
                            statusId: StripeCustomerStatus.ACTIVE.id
                        })
    }
    return stripeCustomer
}

module.exports = {
    createStripeCustomer
}