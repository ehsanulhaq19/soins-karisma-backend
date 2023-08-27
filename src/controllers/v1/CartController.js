const httpStatus = require('http-status');
const { Cart, User, CartItem, Product } = require('../../models');
const CartStatusValues = require("../../models/values/CartStatus")
const uuidService = require('../../services/uuidService')
const CartSerializer = require('../../serializers/v1/CartSerializer')
const apiDataJson = require("../../constants/apiConfig.json");

/**
 * get cart item
 * @param {*} req 
 * @param {*} res 
 */

const getCartItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    const group = req.query.group
    
    await Cart.findOne({
        include: [
            {
                model: CartItem,
                include: [
                    {
                        model: Product
                    }
                ]
            }
        ],
        where: { uuid }
    }).then(async(cart) => {
        const groups = ["read", group]
        const cartSerializer = new CartSerializer(groups)
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, cart: await cartSerializer.serialize(cart)} });
    })
    .catch(error => {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Cart not found"} });
    });
};

/**
 * patch cart item
 * @param {*} req
 * @param {*} res 
 */

 const patchCartItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)

    let cart;
    try {
        cart = await Cart.findOne({ where: { uuid } })
    } catch (error) {
        cart = null
    }
    
    if (!cart) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Cart not found"} });
    }

    const data = req.body
    await cart.update({
        ...(data.name && {name: data.name}),
        ...(data.description && {description: data.description}),
        ...(data.statusId && {statusId: data.statusId})
    })

    const cartSerializer = new CartSerializer()
    res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, cart: await cartSerializer.serialize(cart)} });
 };

/**
 * create cart item
 * @param {*} req 
 * @param {*} res 
 */

 const createCartItem = async (req, res) => {
    const data = req.body
    const user = req.user

    //create cart
    const newCart = await Cart.build({
        name: data.name,
        description: data.description,
        userId: user ? user.id : null,
        statusId: data.statusId || CartStatusValues.ACTIVE.id
    });

    //send response
    await newCart.save()
    .then(async(cart) => {
        const cartSerializer = new CartSerializer()
        return res.status(httpStatus.CREATED).json({ ...{
            statusCode: httpStatus.CREATED,
            cart: await cartSerializer.serialize(newCart)
        } });
    })
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "Cart is not created"
        } });
    });
};

/**
 * get cart collection
 * @param {*} req 
 * @param {*} res 
 */

 const getCartCollection = async (req, res) => {
    const data = req.query
    const group = req.query.group
    const userUuid = req.query.userUuid

    const include = {
        include: [
            (
                userUuid && {
                    model: User,
                    where: {
                        uuid: uuidService.decodeUuid(userUuid)
                    }
                }
            ),
            {
                model: CartItem,
                include: [
                    {
                        model: Product
                    }
                ]
            }
        ].filter(data => data)
    }

    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    const carts = await Cart.findAll({
        ...include,
        where: {
            statusId: CartStatusValues.ACTIVE.id
        },
        order: [
            ['id', 'ASC']
        ],
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })
    
    const groups = ["read", group]
    const cartSerializer = new CartSerializer(groups)
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        carts: await cartSerializer.serializeBulk(carts)
    } });
};

/**
 * delete cart
 * @param {*} req
 * @param {*} res 
 */

 const deleteCartItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    let cart;
    try {
        cart = await Cart.findOne({ where: { uuid } })
    } catch (error) {
        cart = null
    }
    
    if (!cart) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Cart not found"} });
    }

    await cart.destroy()
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: "Cart is not deleted"} });
    })

    res.status(httpStatus.NO_CONTENT).json({ ...{statusCode: httpStatus.NO_CONTENT}});
 };

module.exports = {
    getCartItem,
    patchCartItem,
    createCartItem,
    getCartCollection,
    deleteCartItem
}