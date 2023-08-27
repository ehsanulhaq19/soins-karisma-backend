const {StripeCheckoutOrder} = require("../models")
const {createStripePaymentLog} = require("./stripePaymentLogService")
const StripePaymentLogStatus = require("../models/values/StripePaymentLogStatus")
const StripePaymentLogType = require("../models/values/StripePaymentLogType")
const StripeCheckoutOrderStatus = require("../models/values/StripeCheckoutOrderStatus")
const statuses = require("../constants/statuses.json")
const {createPaymentIntent, createCharge} = require("./payment/stripePaymentService")

const createStripeCheckoutOrder = async(data) => {
    const {orderId, stripePaymentLogId, stripeChargeId, statusId} = data

    const stripeCheckoutOrder = await StripeCheckoutOrder.create({
        orderId,
        stripePaymentLogId,
        stripeChargeId,
        statusId
    })

    return stripeCheckoutOrder
}

const createStripeCheckoutOrderInformation = async(data) => {
    const {order, stripeChargeId, paymentResponse, type} = data
    const stripePaymentLog = await createStripePaymentLog({
        response: paymentResponse,
        statusId: type === statuses.SUCCESS ? StripePaymentLogStatus.SUCCESS.id : StripePaymentLogStatus.ERROR.id,
        typeId: StripePaymentLogType.ORDER.id
    })

    const stripeCheckoutOrder = await createStripeCheckoutOrder({
        orderId: order.id,
        stripePaymentLogId: stripePaymentLog.id,
        stripeChargeId,
        statusId: type === statuses.SUCCESS ? StripeCheckoutOrderStatus.SUCCESS.id : StripeCheckoutOrderStatus.ERROR.id
    })

    return {
        stripeCheckoutOrder,
        stripePaymentLog
    }
}

const createStripeOrderPaymentIntent = async(data) => {
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

const createStripeOrderCharge = async(data) => {
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

module.exports = {
    createStripeCheckoutOrder,
    createStripeCheckoutOrderInformation,
    createStripeOrderPaymentIntent,
    createStripeOrderCharge
}