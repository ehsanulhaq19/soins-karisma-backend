const httpStatus = require('http-status');
const { UserSubscription, StripeSubscription, StripePaymentLog } = require('../../models');
const SubscriptionSerializer = require('../../serializers/v1/SubscriptionSerializer')
const UserSubscriptionStatusValues = require("../../models/values/UserSubscriptionStatus")
const PaymentTypeValues = require("../../models/values/PaymentType")
const { DateTime } = require("luxon");
const StripeSubscriptionStatusValues = require("../../models/values/StripeSubscriptionStatus")

/**
 * create user subscription item
 * @param {*} req 
 * @param {*} res 
 */

 const createUserSubscriptionItem = async (req, res) => {
    const user = req.user
    const subscription = req.subscription
    const currentDate = DateTime.now()

    //create userSubscription
    const newUserSubscription = await UserSubscription.create({
        userId: user.id,
        subscriptionId: subscription.id,
        statusId: UserSubscriptionStatusValues.ACTIVE.id,
        paymentTypeId:PaymentTypeValues.STRIPE.id,
        lastPaymentDate: currentDate.toISO()
    });

    const subscriptionSerializer = new SubscriptionSerializer()
    return res.status(httpStatus.CREATED).json({ ...{
        statusCode: httpStatus.CREATED,
        subscription: await subscriptionSerializer.serialize(subscription)
    } });
};

/**
 * Post user subscription charge success item api
 * Create and move user subscription to pending status if user subsctiption is not completed yet
 * @param {*} req 
 * @param {*} res 
 */

 const postUserSubscriptionChargeSuccessItem = async (req, res) => {
    const user = req.user
    const subscription = req.subscription
    const currentDate = DateTime.now()

    //create userSubscription
    const newUserSubscription = await UserSubscription.create({
        userId: user.id,
        subscriptionId: subscription.id,
        statusId: UserSubscriptionStatusValues.PENDING.id,
        paymentTypeId:PaymentTypeValues.STRIPE.id,
        lastPaymentDate: currentDate.toISO()
    });

    return res.status(httpStatus.CREATED).json({ ...{
        statusCode: httpStatus.CREATED,
        message: "User subscription is created with pending status"
    } });
};

const getUserSubscriptionCollection = async (req, res) => {
    const user = req.user
    const subscription = req.subscription
    const groups = req.query.groups ? req.query.groups.split(" ") : null

    //check user subscriptions
    let userSubscription
    try {
        userSubscription = await UserSubscription.findOne({
            where: {
                userId: user.id,
                subscriptionId: subscription.id
            }
        })
    } catch (error) {}
    
    if (!userSubscription) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{
            statusCode: httpStatus.NOT_FOUND,
            message: "UserSubscription not found"
        } });
    }

    const stripeSubscription = await StripeSubscription.findOne({
        include: [
            {
                model: StripePaymentLog
            }
        ],
        where: {
            subscriptionId: userSubscription.subscriptionId,
            userId: userSubscription.userId,
            statusId: StripeSubscriptionStatusValues.ACTIVE.id
        }
    })
    
    const subscriptionSerializer = new SubscriptionSerializer()
    const response = {
        subscription: await subscriptionSerializer.serialize(subscription)
    }

    if (groups.includes("paymentDetail")) {
        const paymentDetails = {}
        const stripePaymentLog = stripeSubscription?.StripePaymentLog
        if (stripePaymentLog) {
            const paymentLogResponse = stripePaymentLog?.response
            paymentDetails.id = paymentLogResponse?.id
            paymentDetails.card = paymentLogResponse?.source?.card || paymentLogResponse?.payment_method_details?.card
        }

        response.paymentDetails = paymentDetails
    }

    return res.status(httpStatus.CREATED).json({ ...{
        statusCode: httpStatus.CREATED,
        ...response
    } });
}

module.exports = {
    createUserSubscriptionItem,
    getUserSubscriptionCollection,
    postUserSubscriptionChargeSuccessItem
}