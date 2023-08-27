const {UserSubscription, Subscription, UserSubscriptionStatus} = require("../models")
const UserSubscriptionStatusValues = require("../models/values/UserSubscriptionStatus")

const createUserSubscription = async(data) => {
    const {
        subscriptionId = null,
        userId = null,
        paymentTypeId = null,
        lastPaymentDate = null,
        totalAmount = null,
        subTotalAmount = null,
        taxGst = 0,
        taxQst = 0,
        taxPst = 0,
        taxHst = 0,
        statusId = null
    } = data
    let userSubscription = await UserSubscription.findOne({
        where: {
            userId: userId,
            subscriptionId: subscriptionId
        }
    })

    if (!userSubscription) {
        userSubscription = await UserSubscription.create({
            subscriptionId,
            userId,
            paymentTypeId,
            lastPaymentDate,
            totalAmount,
            subTotalAmount,
            taxGst,
            taxQst,
            taxPst,
            taxHst,
            lastPaymentDate,
            statusId
        })
    } else {
        await userSubscription.update({
            totalAmount,
            subTotalAmount,
            taxGst,
            taxHst,
            taxPst,
            taxQst,
            ...(lastPaymentDate && {lastPaymentDate}),
            ...(statusId && {statusId})
        })
    }

    return userSubscription
}

const getUserActiveSubscriptions = async(user) => {
    const userSubscriptions = await UserSubscription.findAll({
        include: [
            {
                model: Subscription
            }
        ],
        where: {
          userId: user.id,
          statusId: UserSubscriptionStatusValues.ACTIVE.id
        }
    })

    if (!userSubscriptions?.length) {
        return null;
    }

    const subscriptions = userSubscriptions.map(userSubscription => userSubscription.Subscription)
    return subscriptions
}

module.exports = {
    createUserSubscription,
    getUserActiveSubscriptions
}