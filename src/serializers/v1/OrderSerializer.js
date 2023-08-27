const {Order} = require("../../models")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")
const UserSerializer = require("./UserSerializer")
const CartSerializer = require("./CartSerializer")
const OrderStatusSerializer = require("./OrderStatusSerializer")
const AddressSerializer = require("./AddressSerializer")

/**
 * Fields to expose
 */
const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    name: {
        groups: ["read"]
    },
    description: {
        groups: ["read"]
    },
    totalAmount: {
        groups: ["read"]
    },
    subTotalAmount: {
        groups: ["read"]
    },
    taxQst: {
        groups: ["read"]
    },
    taxPst: {
        groups: ["read"]
    },
    taxHst: {
        groups: ["read"]
    },
    taxGst: {
        groups: ["read"]
    },
    userId: {
        propertyName: "user",
        groups: ["read"],
        relation: (data) => data.User,
        serializer: async(data) => {
            if (data) {
                const userSerializer = new UserSerializer()
                return await userSerializer.serialize(data, false)
            }
        }
    },
    cartId: {
        propertyName: "cart",
        groups: ["read"],
        relation: (data) => data.Cart,
        serializer: async(data) => {
            if (data) {
                const cartSerializer = new CartSerializer()
                return await cartSerializer.serialize(data, false)
            }
        }
    },
    shippingAddressId: {
        propertyName: "shippingAddress",
        groups: ["read"],
        relation: (data) => data.ShippingAddress,
        serializer: async(data) => {
            if (data) {
                const addressSerializer = new AddressSerializer()
                return await addressSerializer.serialize(data, false)
            }
        }
    },
    billingAddressId: {
        propertyName: "billingAddress",
        groups: ["read"],
        relation: (data) => data.BillingAddress,
        serializer: async(data) => {
            if (data) {
                const addressSerializer = new AddressSerializer()
                return await addressSerializer.serialize(data, false)
            }
        }
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.OrderStatus,
        serializer: async(data) => {
            if (data) {
                const orderStatusSerializer = new OrderStatusSerializer()
                return await orderStatusSerializer.serialize(data, false)
            }
        }
    },
    paymentInfo: {
        propertyName: "paymentInfo",
        groups: ["paymentInfo"],
        relation: (data) => data.StripeCheckoutOrder,
        serializer: async(data) => {
            const stripePaymentLog = data?.StripePaymentLog
            if (stripePaymentLog && stripePaymentLog.response) {
                const {id, shipping, payment_method_details, balance_transaction, payment_intent, payment_method} = stripePaymentLog.response
                return {
                    shipping, 
                    paymentMethodDetails: {
                        charge_id: id,
                        payment_intent,
                        payment_method,
                        balance_transaction,
                        ...payment_method_details
                    }
                }
            }
        }
    }
}

const serializerGroups = ["read"]

class OrderSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(Order, fields, groups)
    }
}


module.exports = OrderSerializer