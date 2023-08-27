const {CartItem} = require("../../models")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")
const CartSerializer = require("./CartSerializer")
const ProductSerializer = require("./ProductSerializer")
const CartItemStatusSerializer = require("./CartItemStatusSerializer")

/**
 * Fields to expose
 */
const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    quantity: {
        groups: ["read"]
    },
    productId: {
        propertyName: "product",
        groups: ["read"],
        relation: (data) => data.Product,
        serializer: async(data) => {
            if (data) {
                const productSerializer = new ProductSerializer()
                return await productSerializer.serialize(data, false)
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
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.CartItemStatus,
        serializer: async(data) => {
            if (data) {
                const cartItemStatusSerializer = new CartItemStatusSerializer()
                return await cartItemStatusSerializer.serialize(data, false)
            }
        }
    }
}

const serializerGroups = ["read"]

class CartItemSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(CartItem, fields, groups)
    }
}


module.exports = CartItemSerializer