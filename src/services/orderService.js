const {createCard, createCharge, createCustomer} = require("./payment/stripePaymentService")
const {StripeCustomer} = require("../models")
const statuses = require("../constants/statuses.json")
const stripeCustomerRepository = require("../repository/stripeCustomerRepository")
const uuidService = require("./uuidService")
const {createOrUpdateAddress} = require("./addressService")
const taxRates = require("../constants/taxRates.json")
const taxes = require("../constants/taxes.json")

const getOrderAmountFromCart = (cart, taxState = null) => {
    let totalAmount = 0;

    const cartItems = cart.CartItems
    if (cartItems && cartItems.length) {
        cartItems.forEach(cartItem => {
            const {quantity} = cartItem
            const product = cartItem.Product
            const {price} = product
            totalAmount += (+quantity * +price)
        });
    }

    const result = {}
    const subTotalAmount = totalAmount

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

    result.subTotalAmount = parseFloat(subTotalAmount).toFixed(2)
    result.totalAmount = parseFloat(totalAmount).toFixed(2)

    return result
}

const chargeOrderWithStripe = async(order, user, paymentDetails) => {
    let stripeCustomer = await StripeCustomer.findOne({
        where: {
            userId: user.id
        }
    })

    if (!stripeCustomer) {
        const {email, firstName, lastName, phone} = user
        const customerResponse = await createCustomer({
            name: `${firstName} ${lastName}`,
            email,
            phone,
            description: ""
        })

        if (customerResponse.type === statuses.ERROR) {
            return customerResponse
        }

        const {customer} = customerResponse
        stripeCustomer = await stripeCustomerRepository.createStripeCustomer({
            stripeCustomerId: customer.id, 
            userId: user.id
        })
    }

    const {number, expMonth, expYear, cvc} = paymentDetails
    const cardResponse = await createCard({
        customerId: stripeCustomer.stripeCustomerId, 
        number, 
        expMonth, 
        expYear, 
        cvc
    })

    if (cardResponse.type === statuses.ERROR) {
        return cardResponse
    }

    const {card} = cardResponse
    const orderTotalAmount = parseInt(order.totalAmount * 100)
    const chargeResponse = await createCharge({
        amount: orderTotalAmount, 
        currency: 'usd', 
        source: card.id, 
        customer: stripeCustomer.stripeCustomerId,
        description: "",
        metadata: {
            orderUuid: uuidService.encodeUuid(order.uuid)
        }
    })

    return chargeResponse
}

const addOrUpdateOrderAddress = async({order, billingAddress, shippingAddress}) => {
    if (!order) {
        return {
            type: statuses.ERROR,
            message: "Order not found"
        }
    }

    if (billingAddress) {
        const {address: newBillingAddress} = await createOrUpdateAddress(order.BillingAddress, billingAddress)
        await order.update({
            billingAddressId: newBillingAddress.id
        })
    }

    if (shippingAddress) {
        const {address: newShippingAddress} = await createOrUpdateAddress(order.ShippingAddress, shippingAddress)
        await order.update({
            shippingAddressId: newShippingAddress.id
        })
    }

    return {
        type: statuses.SUCCESS,
        order
    }
}

module.exports = {
    getOrderAmountFromCart,
    chargeOrderWithStripe,
    addOrUpdateOrderAddress
}