const { DateTime } = require("luxon");
const httpStatus = require("http-status")
const subscriptionService = require("../../../services/subscriptionService")
const statuses = require("../../../constants/statuses.json")
const userSubscriptionRepository = require("../../../repository/userSubscriptionRepository")
const stripeSubscriptionRepository = require("../../../repository/stripeSubscriptionRepository")
const stripeCustomerRepository = require("../../../repository/stripeCustomerRepository")
const PaymentType = require("../../../models/values/PaymentType")
const OrderStatusValues = require("../../../models/values/OrderStatus")
const {Order, Address} = require("../../../models")
const {getOrderAmountFromCart, chargeOrderWithStripe, addOrUpdateOrderAddress} = require("../../../services/orderService")
const uuidService = require("../../../services/uuidService")
const {updateCartStatus} = require("../../../services/cartService")
const {createStripeCheckoutOrderInformation, createStripeOrderPaymentIntent, createStripeOrderCharge} = require("../../../services/stripeOrderService")
const {createStripeSubscriptionPaymentIntent, createStripeSubscriptionCharge} = require("../../../services/stripeSubscriptionService")
const {
    getOrCreateStripeCustomer, 
    createStripeEphemeralKey,
    createStripeSetupIntent
} = require("../../../services/stripePaymentService")
const {getOrCreateStripeCustomerPaymentSource} = require("../../../repository/stripeCustomerPaymentSourceRepository")
const OrderSerializer = require("../../../serializers/v1/OrderSerializer")
const SubscriptionSerializer = require("../../../serializers/v1/SubscriptionSerializer")
const PaymentTypeValues = require("../../../models/values/PaymentType")
const UserSubscriptionStatusValues = require("../../../models/values/UserSubscriptionStatus")
const UserSubscriptionSerializer = require('../../../serializers/v1/UserSubscriptionSerializer')

/**
 * Create subscription payment
 * @param {*} req 
 * @param {*} res 
 */

const createSubscriptionPayment = async (req, res) => {
    const {cardNumber, month, year, cvc} = req.body
    const subscription = req.subscription
    const user = req.user
    const paymentDetails = {
        number: cardNumber,
        expMonth: month,
        expYear: year,
        cvc
    }

    const subscriptionCheckoutResponse = await subscriptionService.createStripeSubscriptionCheckout(subscription, user, paymentDetails)
    if (
        subscriptionCheckoutResponse.type == statuses.ERROR ||
        subscriptionCheckoutResponse.subscription.status !== 'active') 
    {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: "Subscription creation is failed"
        } });
    }
    let message = "User is subscribed successfully"

    const currentDate = DateTime.now()
    const userSubscription = await userSubscriptionRepository.createUserSubscription({
                                        subscriptionId: subscription.id,
                                        userId: user.id,
                                        paymentTypeId: PaymentType.STRIPE.id,
                                        lastPaymentDate: currentDate.toISO()
                                    })

    const stripeCustomer = subscriptionCheckoutResponse.customer
    const stripeSubscription = subscriptionCheckoutResponse.subscription
    try {
        const newStripeCustomer = await stripeCustomerRepository.createStripeCustomer({
                                        stripeCustomerId: stripeCustomer.id, 
                                        userId: user.id
                                    })

                                    await updateCartStatus(cart.id, 1)
                                    await createStripeCheckoutOrderInformation({
                                        ...paymentInfoLogResponse, ...{stripeChargeId: chargeOrderResponse?.charge?.id}
                                    });
        const newStripeSubscription = await stripeSubscriptionRepository.createStripeSubscription({
                                        stripeCustomerId: newStripeCustomer.id, 
                                        stripeSubscriptionId: stripeSubscription.id, 
                                        subscriptionId: subscription.id,
                                        userId: user.id
                                    })
    } catch(e) {
        message = `${message}, but subscription payment data is not saved`
    }

    return res.status(httpStatus.CREATED).json({ ...{
        statusCode: httpStatus.CREATED,
        message
    } });
};

/**
 * Create subscription checkout session
 * @param {*} req 
 * @param {*} res 
 */

 const createSubscriptionCheckoutSession = async (req, res) => {
    const subscription = req.subscription
    const user = req.user
    const subscriptionCheckoutResponse = await subscriptionService.createStripeSubscriptionCheckoutSession(subscription, user)
    
    if (subscriptionCheckoutResponse.type == statuses.ERROR) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{
            statusCode: httpStatus.BAD_REQUEST,
            message: "Subscription session is failed"
        } });
    }

    const subscriptionSession = subscriptionCheckoutResponse.subscriptionSession
    return res.status(httpStatus.CREATED).json({ ...{
        statusCode: httpStatus.CREATED,
        url: subscriptionSession.url
    } });
 }

/**
 * Create order checkout payment
 * @param {*} req 
 * @param {*} res 
 */

 const createOrderCheckoutPayment = async (req, res) => {
    const {cardNumber, month, year, cvc, shippingAddress, billingAddress} = req.body
    const cart = req.cart
    const user = req.user
    
    let order = await Order.findOne({
        where: {
            cartId: cart.id,
            statusId: OrderStatusValues.PENDING.id
        },
        include: [
            {
                model: Address,
                as: 'ShippingAddress',
            },
            {
                model: Address,
                as: 'BillingAddress',
            }
        ]
    })
    
    if (!order) {
        order = await Order.create({
            cartId: cart.id,
            userId: user.id,
            statusId: OrderStatusValues.PENDING.id
        })
    }
    
    const {totalAmount, subTotalAmount, taxGST = 0, taxQST = 0, taxPST = 0, taxHST = 0} = getOrderAmountFromCart(cart, shippingAddress?.state)
    await order.update({
        totalAmount:totalAmount,
        subTotalAmount: subTotalAmount,
        taxQst: taxQST,
        taxGst: taxGST,
        taxPst: taxPST,
        taxHst: taxHST,
    })

    await addOrUpdateOrderAddress({order, shippingAddress, billingAddress})

    const paymentDetails = {
        number: cardNumber,
        expMonth: month,
        expYear: year,
        cvc
    }

    const chargeOrderResponse = await chargeOrderWithStripe(
        order,
        user,
        paymentDetails
    )

    const paymentInfoLogResponse = {
        order,
        paymentResponse: chargeOrderResponse, 
        type: chargeOrderResponse.type
    }

    if (chargeOrderResponse.type === statuses.ERROR) {
        await createStripeCheckoutOrderInformation({
            ...paymentInfoLogResponse, ...{stripeChargeId: null}
        });
        return res.status(httpStatus.CONFLICT).json({ ...{
            statusCode: httpStatus.CONFLICT,
            message: "Order payment failed"
        } });
    }

    await order.update({
        statusId: OrderStatusValues.PAYMENT_SUCCESS.id
    })

    await updateCartStatus(cart.id, 1)
    await createStripeCheckoutOrderInformation({
        ...paymentInfoLogResponse, ...{stripeChargeId: chargeOrderResponse?.charge?.id}
    });

    return res.status(httpStatus.OK).json({ ...{
        statusCode: httpStatus.OK,
        orderUuid: uuidService.encodeUuid(order.uuid)
    } });
};


/**
 * Create order payment intent
 * @param {*} req 
 * @param {*} res 
 */
const createOrderPaymentIntent = async(req, res) => {
    const {shippingAddress, billingAddress} = req.body
    const cart = req.cart
    const user = req.user
    
    const stripeCustomer = await getOrCreateStripeCustomer({
        userName: user.userName, 
        email: user.email, 
        phone: user.phone, 
        roleId: user.Roles[0].id
    })

    const ephemeralKey = await createStripeEphemeralKey({
        customerId: stripeCustomer.stripeCustomerId,
        apiVersion: '2022-11-15'
    })
    const setupIntent = await createStripeSetupIntent({
        customerId: stripeCustomer.stripeCustomerId
    })
        
    
    let order = await Order.findOne({
        where: {
            cartId: cart.id,
            statusId: OrderStatusValues.PENDING.id
        },
        include: [
            {
                model: Address,
                as: 'ShippingAddress',
            },
            {
                model: Address,
                as: 'BillingAddress',
            }
        ]
    })
    
    if (!order) {
        order = await Order.create({
            cartId: cart.id,
            userId: user ? user.id : null,
            statusId: OrderStatusValues.PENDING.id
        })
    }
    
    const {totalAmount, subTotalAmount, taxGST = 0, taxQST = 0, taxPST = 0, taxHST = 0} = getOrderAmountFromCart(cart, shippingAddress?.state)
    await order.update({
        totalAmount:totalAmount,
        subTotalAmount: subTotalAmount,
        taxQst: taxQST,
        taxGst: taxGST,
        taxPst: taxPST,
        taxHst: taxHST,
    })

    await addOrUpdateOrderAddress({order, shippingAddress, billingAddress})
    const paymentIntentResponse = await createStripeOrderPaymentIntent({
        amount: parseInt(totalAmount * 100),
        currency: 'cad',
        shipping: {
            name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
            phone: shippingAddress.phoneNumber,
            address: {
                city: shippingAddress.city,
                // country,
                line1: shippingAddress.address,
                postal_code: shippingAddress.postCode,
                state: shippingAddress.state,
            }
        },
        customer: stripeCustomer.stripeCustomerId,
        automatic_payment_methods: {enabled: true},
        metadata: {
            orderUuid: uuidService.encodeUuid(order.uuid),
            stripeCustomer: stripeCustomer.stripeCustomerId
        }
    })
    
    const {type} = paymentIntentResponse
    if (type === statuses.ERROR) {
        return res.status(httpStatus.CONFLICT).json({ ...{
            statusCode: httpStatus.CONFLICT,
            message: "Payment intent is not created",
            error: JSON.stringify(paymentIntentResponse)
        } });
    }

    const {paymentIntent: {id: paymentIntentId, client_secret: clientSecret}} = paymentIntentResponse
    const orderSerializer = new OrderSerializer()

    return res.status(httpStatus.OK).json({ ...{
        statusCode: httpStatus.OK,
        paymentIntentId,
        clientSecret,
        customerId: stripeCustomer.stripeCustomerId,
        setupIntent: setupIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        orderUuid: uuidService.encodeUuid(order.uuid),
        order: await orderSerializer.serialize(order)
    } });
}

/**
 * Create order charge item
 * @param {*} req 
 * @param {*} res 
 */
 const createOrderChargeItem = async(req, res) => {
    const data = req.body
    const order = req.order
    const user = req.user
    const cart = req.cart
    const stripePaymentSourceId = data.stripePaymentSourceId
    
    const stripeCustomer = await getOrCreateStripeCustomer({
        userName: user.userName, 
        email: user.email, 
        phone: user.phone, 
        roleId: user.Roles[0].id,
        stripePaymentSourceId: stripePaymentSourceId
    })
    const {totalAmount} = getOrderAmountFromCart(cart, order?.ShippingAddress?.state)

    // createStripeOrderCharge
    const orderChargeResponse = await createStripeOrderCharge({
        amount: parseInt(totalAmount * 100),
        currency: 'cad',
        source: stripePaymentSourceId,
        customer: stripeCustomer.stripeCustomerId,
        description: "",
        metadata: {
            orderUuid: uuidService.encodeUuid(order.uuid)
        }
    })
    
    if (orderChargeResponse.type === statuses.ERROR) {
        return res.status(httpStatus.CONFLICT).json({ ...{
            statusCode: httpStatus.CONFLICT,
            message: "Order charge operation is failed"
        } });
    }

    await order.update({
        statusId: OrderStatusValues.COMPLETE.id
    })

    await getOrCreateStripeCustomerPaymentSource(stripeCustomer, stripePaymentSourceId)

    const orderSerializer = new OrderSerializer()

    return res.status(httpStatus.OK).json({ ...{
        statusCode: httpStatus.OK,
        order: await orderSerializer.serialize(order)
    } });
}

/**
 * Create subscription payment intent
 * @param {*} req 
 * @param {*} res 
 */
 const createSubscriptionPaymentIntent = async(req, res) => {
    const subscription = req.subscription
    const user = req.user
    
    const stripeCustomer = await getOrCreateStripeCustomer({
        userName: user.userName, 
        email: user.email, 
        phone: user.phone, 
        roleId: user.Roles[0].id
    })

    const {totalAmount} = subscriptionService.getSubscriptionTotalPrice(subscription)
    const paymentIntentResponse = await createStripeSubscriptionPaymentIntent({
        amount: parseInt(totalAmount * 100),
        currency: 'cad',
        customer: stripeCustomer.stripeCustomerId,
        automatic_payment_methods: {enabled: true},
        metadata: {
            subscriptionUuid: uuidService.encodeUuid(subscription.uuid),
            stripeCustomer: stripeCustomer.stripeCustomerId
        }
    })
    
    const {type} = paymentIntentResponse
    if (type === statuses.ERROR) {
        return res.status(httpStatus.CONFLICT).json({ ...{
            statusCode: httpStatus.CONFLICT,
            message: "Payment intent is not created",
            error: JSON.stringify(paymentIntentResponse)
        } });
    }

    const {paymentIntent: {id: paymentIntentId, client_secret: clientSecret}} = paymentIntentResponse
    
    return res.status(httpStatus.OK).json({ ...{
        statusCode: httpStatus.OK,
        paymentIntentId,
        clientSecret,
        subscriptionUuid: uuidService.encodeUuid(subscription.uuid)
    } });
}

/**
 * Create subscription charge item
 * @param {*} req 
 * @param {*} res 
 */
 const createSubscriptionChargeItem = async(req, res) => {
    const data = req.body
    const subscription = req.subscription
    const user = req.user
    const stripePaymentSourceId = data.stripePaymentSourceId
    
    const stripeCustomer = await getOrCreateStripeCustomer({
        userName: user.userName, 
        email: user.email, 
        phone: user.phone, 
        roleId: user.Roles[0].id,
        stripePaymentSourceId: stripePaymentSourceId
    })

    // charge subscription amount
    const {totalAmount} = subscriptionService.getSubscriptionTotalPrice(subscription)
    const subscriptionChargeResponse = await createStripeSubscriptionCharge({
        amount: parseInt(totalAmount * 100),
        currency: 'cad',
        source: stripePaymentSourceId,
        customer: stripeCustomer.stripeCustomerId,
        description: "",
        metadata: {
            subscriptionUuid: uuidService.encodeUuid(subscription.uuid),
            userUuid: uuidService.encodeUuid(user.uuid)
        }
    })
    
    if (subscriptionChargeResponse.type === statuses.ERROR) {
        return res.status(httpStatus.CONFLICT).json({ ...{
            statusCode: httpStatus.CONFLICT,
            message: "Subscription charge operation is failed"
        } });
    }

    const subscriptionSerializer = new SubscriptionSerializer()

    return res.status(httpStatus.OK).json({ ...{
        statusCode: httpStatus.OK,
        subscription: await subscriptionSerializer.serialize(subscription)
    } });
}

/**
 * Create subscription payment sheet
 * @param {*} req 
 * @param {*} res 
 */
 const createSubscriptionPaymentSheet = async(req, res) => {
    const subscription = req.subscription
    const user = req.user

    const data = req.body
    const billingAddress = data?.billingAddress
console.log("billingAddress = ", billingAddress)
    //Calculate subscription prices for user
    const {totalAmount, subTotalAmount, taxGST = 0, taxQST = 0, taxHST = 0, taxPST = 0} = subscriptionService.getSubscriptionTotalPrice(subscription, billingAddress?.state)

    //Create user subscription
    const userSubscription = await userSubscriptionRepository.createUserSubscription({
        totalAmount,
        subTotalAmount,
        taxGst: taxGST,
        taxQst: taxQST,
        taxPst: taxPST,
        taxHst: taxHST,
        subscriptionId: subscription.id,
        userId: user.id,
        paymentTypeId: PaymentTypeValues.STRIPE.id,
        statusId: UserSubscriptionStatusValues.PENDING.id
    })

    //Get or creat euser stripe customer
    const stripeCustomer = await getOrCreateStripeCustomer({
        "userName": user.userName,
        "email": user.email,
        "phone": user.phone,
        "roleId": user.Roles[0].id,
        "stripePaymentSourceId": null
    })
    
    //Prepare ephemeralKey and setupIntent keys
    const ephemeralKey = await createStripeEphemeralKey({
        customerId: stripeCustomer.stripeCustomerId,
        apiVersion: '2022-11-15'
    })
    const setupIntent = await createStripeSetupIntent({
        customerId: stripeCustomer.stripeCustomerId
    })
    
    //Create payment intent
    const paymentIntentResponse = await createStripeSubscriptionPaymentIntent({
        amount: parseInt(totalAmount * 100),
        currency: 'cad',
        customer: stripeCustomer.stripeCustomerId,
        automatic_payment_methods: {enabled: true},
        metadata: {
            subscriptionUuid: uuidService.encodeUuid(subscription.uuid),
            stripeCustomer: stripeCustomer.stripeCustomerId
        }
    })
    
    //Send response
    const {type} = paymentIntentResponse
    if (type === statuses.ERROR) {
        return res.status(httpStatus.CONFLICT).json({ ...{
            statusCode: httpStatus.CONFLICT,
            message: "Payment intent is not created",
            error: JSON.stringify(paymentIntentResponse)
        } });
    }

    const {paymentIntent: {id: paymentIntentId, client_secret: clientSecret}} = paymentIntentResponse

    const userSubscriptionSerializer = new UserSubscriptionSerializer()
    return res.status(httpStatus.OK).json({ ...{
        statusCode: httpStatus.OK,
        customerId: stripeCustomer.stripeCustomerId,
        setupIntent: setupIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        paymentIntentId,
        clientSecret,
        userSubscription: await userSubscriptionSerializer.serialize(userSubscription)
    } });
}

module.exports = {
    createSubscriptionPayment,
    createSubscriptionCheckoutSession,
    createSubscriptionPaymentIntent,
    createSubscriptionChargeItem,
    createOrderCheckoutPayment,
    createOrderPaymentIntent,
    createOrderChargeItem,
    createSubscriptionPaymentSheet
}