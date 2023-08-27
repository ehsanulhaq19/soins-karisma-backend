const {StripeCustomerPaymentSource} = require("../models")
const StripeCustomerPaymentSourceStatusValues = require("../models/values/StripeCustomerPaymentSourceStatus")
const StripeCustomerPaymentSourceTypeValues = require("../models/values/StripeCustomerPaymentSourceType")

const getOrCreateStripeCustomerPaymentSource = async(stripeCustomer, paymentSourceId) => {
    if (!stripeCustomer || !stripeCustomer.id) {
        return null
    }
    let stripeCustomerPaymentSource = await StripeCustomerPaymentSource.findOne({
        where: {
            stripeCustomerId: stripeCustomer.id,
            stripePaymentSourceId: paymentSourceId,
            statusId: StripeCustomerPaymentSourceStatusValues.ACTIVE.id
        }
    })

    if (!stripeCustomerPaymentSource) {
        stripeCustomerPaymentSource = await StripeCustomerPaymentSource.create({
            stripeCustomerId: stripeCustomer.id,
            stripePaymentSourceId: paymentSourceId,
            statusId: StripeCustomerPaymentSourceStatusValues.ACTIVE.id,
            typeId: StripeCustomerPaymentSourceTypeValues.DEFAULT.id
        })
    }

    return stripeCustomerPaymentSource
}

module.exports = {
    getOrCreateStripeCustomerPaymentSource
}