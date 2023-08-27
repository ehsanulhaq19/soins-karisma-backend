const {StripeSubscriptionProduct, StripeSubscription, StripeSubscriptionPrice, StripeCustomer, User} = require("../models")
const StripeSubscriptionProductStatus = require("../models/values/StripeSubscriptionProductStatus")
const StripeSubscriptionPriceStatus = require("../models/values/StripeSubscriptionPriceStatus")
const SubscriptionDurationValues = require("../models/values/SubscriptionDurations")
const {
    createProduct,
    createPrice,
    createCardPaymentMethod,
    createCustomer,
    createSubscription,
    createSubscriptionCheckout
} = require("./payment/stripePaymentService")
const statuses = require("../constants/statuses.json")
const appMetaData = require("../constants/appMetaData.json")
const uuidService = require("./uuidService")
const taxRates = require("../constants/taxRates.json")
const taxes = require("../constants/taxes.json")

/**
 * Create subscription as product on stripe and save data in StripeSubscription model table
 * @param {*} subscription 
 * @returns 
 */
const createStripeSubscriptionProduct = async(subscription) => {
    if (!subscription) {
        return {
            type: statuses.ERROR,
            message: "Subscription can not be empty"
        }
    }

    const subscriptionObject = {
        name: subscription.name,
        description: subscription.description,
        metadata: {
            subscriptionUuid: uuidService.encodeUuid(subscription.uuid)
        }
    }
    const subscriptionProductResponse = await createProduct(subscriptionObject)

    if (subscriptionProductResponse.type === statuses.ERROR) {
        return subscriptionProductResponse
    }

    const subscriptionProduct = subscriptionProductResponse.stripeProduct
    const stripeSubscriptionProduct = await StripeSubscriptionProduct.build({
        stripeProductId: subscriptionProduct.id,
        subscriptionId: subscription.id,
        statusId: StripeSubscriptionProductStatus.ACTIVE.id
    });

    await stripeSubscriptionProduct.save()

    return {
        type: statuses.SUCCESS,
        stripeSubscriptionProduct
    }
}


/**
 * Create subscription price on stripe and save data in StripeSubscriptionPrice model table
 * @param {*} subscription 
 * @returns 
 */
 const createStripeSubscriptionPrice = async(subscription) => {
    if (!subscription) {
        return {
            type: statuses.ERROR,
            message: "Subscription can not be empty"
        }
    } else if (!subscription.StripeSubscriptionProduct) {
        return {
            type: statuses.ERROR,
            message: "Subscription stripe price not found"
        }
    }

    const subscriptionObject = {
        unit_amount: subscription.price * 100,
        currency: appMetaData.currency,
        recurring: {
            interval: (subscription.SubscriptionDuration.interval).toLowerCase()
        },
        product: subscription.StripeSubscriptionProduct.stripeProductId
    }
    
    const subscriptionPriceResponse = await createPrice(subscriptionObject)

    if (subscriptionPriceResponse.type === statuses.ERROR) {
        return subscriptionPriceResponse
    }

    const subscriptionPrice = subscriptionPriceResponse.stripePrice
    const stripeSubscriptionPrice = await StripeSubscriptionPrice.build({
        stripePriceId: subscriptionPrice.id,
        subscriptionId: subscription.id,
        statusId: StripeSubscriptionPriceStatus.ACTIVE.id
    });

    await stripeSubscriptionPrice.save()

    return {
        type: statuses.SUCCESS,
        stripeSubscriptionPrice
    }
}

/**
 * Initate subscription process
 * @param {*} subscription
 * @param {*} paymentDetails contain {number, expMonth, expYear, cvc, name, email, phone, description}
 * @returns 
 */
 const createStripeSubscriptionCheckout = async(subscription, user, paymentDetails) => {
    if (!subscription) {
        return {
            type: statuses.ERROR,
            message: "Subscription can not be empty"
        }
    }

    let subscriptionPrice = subscription.StripeSubscriptionPrice
    if (!subscriptionPrice) {
        const priceResponse = await createStripeSubscriptionPrice(subscription)
        const {type} = priceResponse
        
        if (type === statuses.SUCCESS) {
            subscriptionPrice = priceResponse.stripeSubscriptionPrice
        } else {
            return {
                type: statuses.ERROR,
                message: "Subscription price not found"
            }
        }
    }

    const {number, expMonth, expYear, cvc} = paymentDetails
    const paymentMethodResponse = await createCardPaymentMethod({
        number, 
        expMonth, 
        expYear, 
        cvc
    })
    
    if (paymentMethodResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            message: "Payment method creation failed",
            error: paymentMethodResponse.error
        }
    }

    const paymentMethod = paymentMethodResponse.paymentMethod

    const {email, firstName, lastName, phone} = user
    const customerResponse = await createCustomer({
        paymentMethodId: paymentMethod.id,
        name: `${firstName} ${lastName}`,
        email,
        phone,
        description: ""
    })

    if (customerResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            message: "Customer creation failed",
            error: customerResponse.error
        }
    }
    const customer = customerResponse.customer

    const subscriptionResponse = await createSubscription({
        customerId: customer.id,
        priceId: subscriptionPrice.stripePriceId,
        description: subscription.description,
        defaultPaymentMethod: paymentMethod.id,
        metadata: {
            subscriptionUuid: uuidService.encodeUuid(subscription.uuid),
            userUuid: uuidService.encodeUuid(user.uuid)
        }
    })

    if (subscriptionResponse.type === statuses.ERROR) {
        return {
            type: statuses.ERROR,
            message: "Subscription creation failed",
            error: subscriptionResponse.error
        }
    }

    const subscriptionData = subscriptionResponse.subscription

    return {
        type: statuses.SUCCESS,
        paymentMethod,
        customer,
        subscription: subscriptionData
    }
}

const getSubscriptionBookingLimits = (subscriptionDurationId) => {
    let maxActiveBookingsLimitPerDay = 2;
    let maxActiveBookingsLimit = 2;

    if (subscriptionDurationId === SubscriptionDurationValues.DAY.id) {
        maxActiveBookingsLimitPerDay = 2;
        maxActiveBookingsLimit = 2;
    } else if (subscriptionDurationId === SubscriptionDurationValues.WEEK.id) {
        maxActiveBookingsLimitPerDay = 2;
        maxActiveBookingsLimit = 2;
    } else if (subscriptionDurationId === SubscriptionDurationValues.MONTH.id) {
        maxActiveBookingsLimitPerDay = 2;
        maxActiveBookingsLimit = 2;
    } else if (subscriptionDurationId === SubscriptionDurationValues.YEAR.id) {
        maxActiveBookingsLimitPerDay = 2;
        maxActiveBookingsLimit = 4;
    }

    return {
        maxActiveBookingsLimitPerDay,
        maxActiveBookingsLimit
    }
}

/**
 * Initate subscription checkout session
 * @param {*} subscription 
 * @param {*} user 
 * @returns 
 */
 const createStripeSubscriptionCheckoutSession = async(subscription, user) => {
    if (!subscription) {
        return {
            type: statuses.ERROR,
            message: "Subscription can not be empty"
        }
    }

    const subscriptionPrice = subscription.StripeSubscriptionPrice
    if (!subscriptionPrice) {
        return {
            type: statuses.ERROR,
            message: "Subscription price not found"
        }
    }

    const subscriptionObject = {
        line_items: [
            {
                price: subscriptionPrice.stripePriceId,
                quantity: 1,
            },
        ],
        success_url: process.env.SUBSCRIPTION_SUCCESS_URL,
        cancel_url: process.env.SUBSCRIPTION_CANCEL_URL,
        metadata: {
            subscriptionUuid: uuidService.encodeUuid(subscription.uuid),
            userUuid: uuidService.encodeUuid(user.uuid),
        }
    }
    
    const subscriptionCheckoutResponse = await createSubscriptionCheckout(subscriptionObject)

    if (subscriptionCheckoutResponse.type === statuses.ERROR) {
        return subscriptionCheckoutResponse
    }

    const subscriptionSession = subscriptionCheckoutResponse.session

    return {
        type: statuses.SUCCESS,
        subscriptionSession
    }
}

const getSubscriptionTotalPrice = (subscription, taxState = null) => {
    let totalAmount = subscription.price
    const subTotalAmount = totalAmount

    const result = {
        subTotalAmount
    }
    if (taxState && taxes[taxState]) {
        const taxStateObject = taxes[taxState]
        const taxRatios = taxStateObject.tax
        const totalTaxPercentage = taxRatios.GST + taxRatios.PST + taxRatios.HST + taxRatios.QST
        totalAmount = totalAmount + ((totalAmount * totalTaxPercentage) / 100)

        result.taxGST = parseFloat((taxRatios.GST * subTotalAmount)/100).toFixed(2)
        result.taxPST = parseFloat((taxRatios.PST * subTotalAmount)/100).toFixed(2)
        result.taxHST = parseFloat((taxRatios.HST * subTotalAmount)/100).toFixed(2)
        result.taxQST = parseFloat((taxRatios.QST * subTotalAmount)/100).toFixed(2)
    }

    result.totalAmount = parseFloat(totalAmount).toFixed(2)
    return result
}

module.exports = {
    createStripeSubscriptionProduct,
    createStripeSubscriptionPrice,
    createStripeSubscriptionCheckout,
    getSubscriptionBookingLimits,
    createStripeSubscriptionCheckoutSession,
    getSubscriptionTotalPrice
}