
const { DateTime } = require("luxon");
const Sequelize = require("sequelize");
const {Order, Subscription, UserSubscription, User, StripeCustomer, StripeSubscription, SubscriptionDuration} = require("../../../models")
const uuidService = require("../../../services/uuidService")
const OrderStatusValues = require("../../../models/values/OrderStatus")
const UserSubscriptionStatusValues = require("../../../models/values/UserSubscriptionStatus")
const {createStripePaymentLog} = require("../../../services/stripePaymentLogService")
const {createStripeCheckoutOrder} = require("../../../services/stripeOrderService")
const {createStripeSubscription} = require("../../../services/stripeSubscriptionService")
const StripePaymentLogStatusValues = require("../../../models/values/StripePaymentLogStatus")
const StripePaymentLogTypeValues = require("../../../models/values/StripePaymentLogType")
const StripeCheckoutOrderStatusValues = require("../../../models/values/StripeCheckoutOrderStatus")
const CartStatusValues = require("../../../models/values/CartStatus")
const {updateCartStatus} = require("../../../services/cartService")
const {retrievePaymentMethod} = require("../../../services/payment/stripePaymentService")
const StripeSubscriptionStatus = require("../../../models/values/StripeSubscriptionStatus")
const userSubscriptionRepository = require("../../../repository/userSubscriptionRepository")
const PaymentTypeValues = require("../../../models/values/PaymentType")
const orderEmailService = require("../../../services/email/orderEmailService")
const subscriptionEmailService = require("../../../services/email/subscriptionEmailService")

const stripeChargeSuccessHandler = async(chargeSucceeded) => {
    const {metadata: {
            orderUuid = null, 
            subscriptionUuid = null, 
            stripeCustomer = null
        }, customer
    } = chargeSucceeded
    // const orderUuid = "TlRZek1UUXhOR0V3WmpjNExUUmxPRGd0WkdNM05DMHhPVGsxTFdNd01UbGpZelJq"
    // const subscriptionUuid = "Wm1RMk5XVmpZell5TnpRMExUaGlNemd0T1RkaU5DMWlaR1F3TFdOa01qSm1ObU0z"
    // const stripeCustomer = "cus_Nfh8yru5eecOhn"
    if (orderUuid) {

        const stripeCustomerObject = await StripeCustomer.findOne({
            where: {
                stripeCustomerId: stripeCustomer
            },
            include: [
                {
                    model: User
                }
            ]
        })

        if (!stripeCustomerObject || !stripeCustomerObject.User) {
            return
        }
        const user = stripeCustomerObject.User

        // 1- update order status
        const order = await Order.findOne({
            where: {
                uuid: uuidService.decodeUuid(orderUuid)
            }
        })
        
        if (!order) {
            return
        }
        
        await order.update({
            statusId: OrderStatusValues.COMPLETE.id
        })

        // 2- Update cart status
        await updateCartStatus(order.cartId, CartStatusValues.CHECKOUT.id)

        // 3- Create payment log
        const stripePaymentLog = await createStripePaymentLog({
            response: chargeSucceeded, 
            typeId: StripePaymentLogTypeValues.ORDER.id, 
            statusId: StripePaymentLogStatusValues.SUCCESS.id
        })

        //4- Save payment log against checkout order
        await createStripeCheckoutOrder({
            orderId: order.id, 
            stripePaymentLogId: stripePaymentLog.id, 
            stripeChargeId: chargeSucceeded.id, 
            statusId: StripeCheckoutOrderStatusValues.SUCCESS.id
        })

        //5- Send order checkout success email
        orderEmailService.sendOrderCheckoutSuccessEmail(user, order)
    } else if (subscriptionUuid) {
        // 1- get subscription and user
        const subscription = await Subscription.findOne({
            where: {
                uuid: uuidService.decodeUuid(subscriptionUuid)
            }
        })
        
        if (!subscription) {
            return
        }

        const stripeCustomerObject = await StripeCustomer.findOne({
            where: {
                stripeCustomerId: stripeCustomer
            },
            include: [
                {
                    model: User
                }
            ]
        })

        if (!stripeCustomerObject || !stripeCustomerObject.User) {
            return
        }

        const user = stripeCustomerObject.User

        // 2- Update user subsscription status
        let userSubscription = await UserSubscription.findOne({
            include: [
                {
                    model: Subscription,
                    include: [
                        {
                            model: SubscriptionDuration
                        }
                    ]
                }
            ],
            where: {
                userId: user.id,
                subscriptionId: subscription.id
            }
        })
        
        const currentDate = DateTime.now()

        if (!userSubscription) {
            /**TODO: Case when user subscription is not first created from backend */
            // userSubscription = await userSubscriptionRepository.createUserSubscription({
            //     subscriptionId: subscription.id,
            //     userId: user.id,
            //     paymentTypeId: PaymentTypeValues.STRIPE.id,
            //     lastPaymentDate: currentDate.toISO(),
            //     statusId: UserSubscriptionStatusValues.ACTIVE.id
            // })
            return
        } else {
            userSubscription.update({
                statusId: UserSubscriptionStatusValues.ACTIVE.id,
                lastPaymentDate: currentDate.toISO()
            })
        }

        // 3- Create payment log
        const stripePaymentLog = await createStripePaymentLog({
            response: chargeSucceeded, 
            typeId: StripePaymentLogTypeValues.SUBSCRIPTION.id, 
            statusId: StripePaymentLogStatusValues.SUCCESS.id
        })

        //4- Save payment log against checkout subscription
        await createStripeSubscription({
            subscriptionId: subscription.id,
            stripePaymentLogId: stripePaymentLog.id, 
            stripeChargeId: chargeSucceeded.id, 
            statusId: StripeSubscriptionStatus.ACTIVE.id,
            stripeSubscriptionId: "none",
            userId: user.id,
            stripeCustomerId: stripeCustomerObject.id
        })

        //5- Send subscription checkout success email
        subscriptionEmailService.sendSubscriptionCheckoutSuccessEmail(user, userSubscription)
    }
} 

const stripePaymentIntentSuccessHandler = async(paymentDetail) => {
    const {payment_method, metadata} = paymentDetail;
}

module.exports = {
    stripeChargeSuccessHandler,
    stripePaymentIntentSuccessHandler
}