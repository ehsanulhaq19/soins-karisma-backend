const {createPaymentIntent, createCharge} = require("./payment/stripePaymentService")
const {StripeSubscription} = require("../models")

const createStripeSubscriptionPaymentIntent = async(data) => {
    const {amount, currency, customer = null, automatic_payment_methods = null, shipping, metadata} = data
    
    const paymentIntent = await createPaymentIntent({
        amount,
        currency,
        ...(
            shipping &&
            {
                shipping: {
                    name: shipping.name,
                    phone: shipping.phone,
                    address: {
                        city: shipping.address.city,
                        country: shipping.address.country,
                        line1: shipping.address.line1,
                        line2: shipping.address.line2,
                        postal_code: shipping.address.postal_code,
                        state: shipping.address.state,
                    }
                }
            }
        ),
        ...(
            customer && {
                customer
            }
        ),
        automatic_payment_methods,
        metadata
    })

    return paymentIntent
}

const createStripeSubscriptionCharge = async(data) => {
    const {amount, currency, source, customer, description, metadata} = data
    const orderCharge = await createCharge({
        amount,
        currency,
        ...(
            source && {source}
        ),
        description,
        customer,
        metadata
    })

    return orderCharge
}

const createStripeSubscription = async(data) => {
    const {subscriptionId, stripePaymentLogId, stripeChargeId, statusId, stripeSubscriptionId, userId, stripeCustomerId} = data
    const stripeSubscription = await StripeSubscription.create({
        subscriptionId,
        stripePaymentLogId,
        stripeChargeId,
        statusId,
        stripeSubscriptionId,
        userId,
        stripeCustomerId
    })

    return stripeSubscription
}

module.exports = {
    createStripeSubscriptionPaymentIntent,
    createStripeSubscriptionCharge,
    createStripeSubscription
}