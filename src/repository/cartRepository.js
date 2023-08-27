const {Cart} = require("../models")
const CartStatus = require("../models/values/CartStatus")

const getUserActiveCart = async(user) => {
    if (!user || !user.id) {
        return null
    }
    const cart = Cart.findOne({
        where: {
            userId: user.id,
            statusId: CartStatus.ACTIVE.id
        }
    })

    return cart
}

const getOrCreateUserActiveCart = async(user) => {
    let activeCart = await getUserActiveCart(user)
    if (!activeCart) {
        let cartName = 'Cart'
        if (user) {
            cartName = `${cartName} User ${user.id}`
        } else {
            cartName = `${cartName} Guest ${Math.floor(Math.random() * 1000) + 1}`
        }

        activeCart = await Cart.create({
            name: cartName,
            userId: user?.id,
            statusId: CartStatus.ACTIVE.id
        })

        return activeCart
    }
    return activeCart
}

module.exports = {
    getUserActiveCart,
    getOrCreateUserActiveCart
}