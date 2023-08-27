const {Cart, CartItem} = require("../models")
const statuses = require("../constants/statuses.json")
const CartItemStatusValues = require("../models/values/CartItemStatus")

const updateCartStatus = async(cartId, statusId) => {
    const cart = await Cart.findOne({
        where: {
            id: cartId
        },
        include: [
            {
                model: CartItem
            }
        ]
    })

    if (!cart) {
        return {
            type: statuses.ERROR,
            message: 'Cart not found'
        }
    }

    await cart.update({
        statusId
    })

    const cartItems = cart.CartItems
    if (cartItems.length) {
        for(let i = 0; i < cartItems.length; i++) {
            const cartItem = cartItems[i]
            await cartItem.update({
                statusId: CartItemStatusValues.CHECKOUT.id
            })
        }
    }

    return {
        type: statuses.SUCCESS
    }
}
module.exports = {
    updateCartStatus
}