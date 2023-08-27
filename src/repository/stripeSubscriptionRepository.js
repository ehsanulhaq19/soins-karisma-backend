const {StripeSubscription} = require("../models")
const StripeSubscriptionStatus = require("../models/values/StripeSubscriptionStatus")

const createStripeSubscription = async(data) => {
    const {stripeCustomerId, stripeSubscriptionId, subscriptionId, userId} = data
    let stripeSubscription = await StripeSubscription.findOne({
        where: {
            stripeSubscriptionId: stripeSubscriptionId,
            statusId: StripeSubscriptionStatus.ACTIVE.id
        }
    })

    if (!stripeSubscription) {
        stripeSubscription = await StripeSubscription.create({
                            stripeCustomerId,
                            stripeSubscriptionId,
                            subscriptionId,
                            userId,
                            statusId: StripeSubscriptionStatus.ACTIVE.id
                        })
    }
    return stripeSubscription
}

module.exports = {
    createStripeSubscription
}