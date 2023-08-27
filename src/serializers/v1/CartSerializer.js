const {Cart} = require("../../models")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")
const UserSerializer = require("./UserSerializer")
const ProductSerializer = require("./ProductSerializer")
const CartStatusSerializer = require("./CartStatusSerializer")

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
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.CartStatus,
        serializer: async(data) => {
            if (data) {
                const cartStatusSerializer = new CartStatusSerializer()
                return await cartStatusSerializer.serialize(data, false)
            }
        }
    },
    cartItems: {
        propertyName: "cartItems",
        groups: ["cartItems"],
        customFunction: async(data) => {
            let cartItemsData = []
            if (data?.CartItems) {
                const cartItems = data.CartItems
                
                for(let i = 0; i < cartItems.length; i++){
                    const cartItem = cartItems[i]
                    const {quantity, CartItemStatus, Product, uuid} = cartItem
                    cartItemsData.push({
                        uuid: uuidService.encodeUuid(uuid),
                        quantity,
                        product: await (new ProductSerializer()).serialize(Product),
                        cartItemStatus: CartItemStatus
                    })
                }
            }

            return cartItemsData
        }
    },
}

const serializerGroups = ["read"]

class CartSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(Cart, fields, groups)
    }
}


module.exports = CartSerializer