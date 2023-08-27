const {StripePaymentLog} = require("../models")

const createStripePaymentLog = async(data) => {
    const {response, typeId, statusId} = data

    const stripePaymentLog = await StripePaymentLog.create({
        response,
        typeId,
        statusId
    })

    return stripePaymentLog
}

module.exports = {
    createStripePaymentLog
}