const {StripeSubscription, UserSubscription, Subscription} = require("../../../models")
const SubscriptionStatus = require("../../../models/values/SubscriptionStatus")
const statuses = require("../../../constants/statuses.json")

const getSubscriptionsData = async(invoice) => {
    const {subscription: subscriptionId} = invoice
    const stripeSubscription = await StripeSubscription.findOne({
        where: {
            stripeSubscriptionId: subscriptionId
        },
        include: [
            {
                model: Subscription
            }
        ]
    })
    
    if (!stripeSubscription) {
        return {
            type: statuses.ERROR,
            message: "stripeSubscription not found"
        }
    }

    const subscription = stripeSubscription.Subscription
    if (!subscription || subscription.statusId !== SubscriptionStatus.ACTIVE.id) {
        return {
            type: statuses.ERROR,
            message: "Subscription status is not active"
        }
    }
    
    const userSubscription = await UserSubscription.findOne({
        where: {
        userId: stripeSubscription.userId,
        subscriptionId: stripeSubscription.subscriptionId,
        }
    })
    
    if (!userSubscription) {
        return {
            type: statuses.ERROR,
            message: "userSubscription is not found"
        }
    }

    return {
        type: statuses.SUCCESS,
        stripeSubscription,
        userSubscription
    }
}


const stripeChargeSuccessHandler = async(chargeSucceeded) => {
    // console.log("chargeSucceeded = ", chargeSucceeded)
    // const {metadata: {orderUuid = null, subscriptionUuid = null, userUuid = null}, customer} = chargeSucceeded
    // if (orderUuid) {
    //     // 1- update order status
    //     const order = await Order.findOne({
    //         where: {
    //             uuid: uuidService.decodeUuid(orderUuid)
    //         }
    //     })
        
    //     if (!order) {
    //         return
    //     }
        
    //     await order.update({
    //         statusId: OrderStatusValues.COMPLETE.id
    //     })

    //     // 2- Update cart status
    //     await updateCartStatus(order.cartId, CartStatusValues.CHECKOUT.id)

    //     // 3- Create payment log
    //     const stripePaymentLog = await createStripePaymentLog({
    //         response: chargeSucceeded, 
    //         typeId: StripePaymentLogTypeValues.ORDER.id, 
    //         statusId: StripePaymentLogStatusValues.SUCCESS.id
    //     })

    //     //4- Save payment log against checkout order
    //     await createStripeCheckoutOrder({
    //         orderId: order.id, 
    //         stripePaymentLogId: stripePaymentLog.id, 
    //         stripeChargeId: chargeSucceeded.id, 
    //         statusId: StripeCheckoutOrderStatusValues.SUCCESS.id
    //     })
    // } else {
    //     // 1- get subscription and user
    //     const subscription = await Subscription.findOne({
    //         where: {
    //             uuid: uuidService.decodeUuid(subscriptionUuid)
    //         }
    //     })
        
    //     if (!subscription) {
    //         return
    //     }

    //     const user = await User.findOne({
    //         where: {
    //             uuid: uuidService.decodeUuid(userUuid)
    //         }
    //     })
        
    //     if (!user) {
    //         return
    //     }

    //     const stripeCustomer = await StripeCustomer.findOne({
    //         where: {
    //             [Sequelize.Op.or]: {
    //                 stripeCustomerId: customer,
    //                 userId: user.id
    //             }
    //         }
    //     })

    //     // 2- Update user subsscription status
    //     let userSubscription = await UserSubscription.findOne({
    //         where: {
    //             userId: user.id,
    //             subscriptionId: subscription.id
    //         }
    //     })
        
    //     const currentDate = DateTime.now()

    //     if (!userSubscription) {
    //         userSubscription = await userSubscriptionRepository.createUserSubscription({
    //             subscriptionId: subscription.id,
    //             userId: user.id,
    //             paymentTypeId: PaymentTypeValues.STRIPE.id,
    //             lastPaymentDate: currentDate.toISO()
    //         })
    //     } else {
    //         userSubscription.update({
    //             statusId: UserSubscriptionStatusValues.ACTIVE.id,
    //             lastPaymentDate: currentDate.toISO()
    //         })
    //     }

    //     // 3- Create payment log
    //     const stripePaymentLog = await createStripePaymentLog({
    //         response: chargeSucceeded, 
    //         typeId: StripePaymentLogTypeValues.SUBSCRIPTION.id, 
    //         statusId: StripePaymentLogStatusValues.SUCCESS.id
    //     })

    //     //4- Save payment log against checkout subscription
    //     await createStripeSubscription({
    //         subscriptionId: subscription.id,
    //         stripePaymentLogId: stripePaymentLog.id, 
    //         stripeChargeId: chargeSucceeded.id, 
    //         statusId: StripeSubscriptionStatus.ACTIVE.id,
    //         stripeSubscriptionId: "none",
    //         userId: user.id,
    //         stripeCustomerId: stripeCustomer.id
    //     })
    // }
} 


module.exports = {
    getSubscriptionsData,
    stripeChargeSuccessHandler
}