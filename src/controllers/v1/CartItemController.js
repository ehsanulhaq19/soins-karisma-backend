const httpStatus = require('http-status');
const { CartItem, Product, Cart } = require('../../models');
const CartItemStatusValues = require("../../models/values/CartItemStatus")
const uuidService = require('../../services/uuidService')
const CartItemSerializer = require('../../serializers/v1/CartItemSerializer')
const apiDataJson = require("../../constants/apiConfig.json")

/**
 * get cart_item item
 * @param {*} req 
 * @param {*} res 
 */

const getCartItemItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    
    await CartItem.findOne({ 
        include: [
            {
                model: Product
            },
            {
                model: Cart
            }
        ],
        where: { uuid }
    }).then(async(cartItem) => {
        const cartItemSerializer = new CartItemSerializer()
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, cartItem: await cartItemSerializer.serialize(cartItem)} });
    })
    .catch(error => {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Cart item not found"} });
    });
};

/**
 * patch cart_item item
 * @param {*} req
 * @param {*} res 
 */

 const patchCartItemItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)

    let cartItem;
    try {
        cartItem = await CartItem.findOne({ 
            include: [
                {
                    model: Product
                },
                {
                    model: Cart
                }
            ],
            where: { uuid } 
        })
    } catch (error) {
        cartItem = null
    }
    
    if (!cartItem) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Cart item not found"} });
    }

    const data = req.body
    await cartItem.update({
        ...(data.quantity && {quantity: data.quantity}),
        ...(data.statusId && {statusId: data.statusId})
    })

    const cartItemSerializer = new CartItemSerializer()
    res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, cartItem: await cartItemSerializer.serialize(cartItem)} });
 };

/**
 * create cart_item item
 * @param {*} req 
 * @param {*} res 
 */

 const createCartItemItem = async (req, res) => {
    const data = req.body
    const product = req.product
    const cart = req.cart
    
    let cartItem = await CartItem.findOne({
        where: {
            productId: product.id,
            cartId: cart.id
        }
    })

    let cartItemQuery
    if (cartItem) {
        cartItemQuery = async() =>  await cartItem.update({
                                    quantity: data.quantity,
                                    statusId: data.statusId || CartItemStatusValues.ACTIVE.id
                                })
    } else {
        //create cart item
        cartItemQuery = async() => await CartItem.build({
                                    quantity: data.quantity,
                                    productId: product.id,
                                    cartId: cart.id,
                                    statusId: data.statusId || CartItemStatusValues.ACTIVE.id
                                }).save();
    }


    //send response
    await cartItemQuery()
    .then(async(cartItem) => {
        let newCartItem = await CartItem.findOne({
            include: [
                {
                    model: Product
                },
                {
                    model: Cart
                }
            ],
            where: {
                id: cartItem.id
            }
        })
        const cartItemSerializer = new CartItemSerializer()
        return res.status(httpStatus.CREATED).json({ ...{
            statusCode: httpStatus.CREATED,
            cartItem: await cartItemSerializer.serialize(newCartItem)
        } });
    })
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "Cart item is not created"
        } });
    });
};

/**
 * get cart_item collection
 * @param {*} req 
 * @param {*} res 
 */

 const getCartItemCollection = async (req, res) => {
    const data = req.query
    
    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    const cartItems = await CartItem.findAll({
        include: [
            {
                model: Product
            },
            {
                model: Cart
            }
        ],
        order: [
            ['id', 'ASC']
        ],
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })
    const cartItemSerializer = new CartItemSerializer()
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        cartItems: await cartItemSerializer.serializeBulk(cartItems)
    } });
};

/**
 * delete cartItem item
 * @param {*} req
 * @param {*} res 
 */

 const deleteCartItemItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)

    let cartItem;
    try {
        cartItem = await CartItem.findOne({ where: { uuid } })
    } catch (error) {
        cartItem = null
    }
    
    if (!cartItem) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Cart item not found"} });
    }

    await cartItem.destroy()
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: "Cart item is not deleted"} });
    })

    res.status(httpStatus.NO_CONTENT).json({ ...{statusCode: httpStatus.NO_CONTENT}});
 };

module.exports = {
    getCartItemItem,
    patchCartItemItem,
    createCartItemItem,
    getCartItemCollection,
    deleteCartItemItem
}