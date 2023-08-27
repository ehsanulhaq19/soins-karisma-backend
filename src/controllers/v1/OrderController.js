const httpStatus = require('http-status');
const { Order, User, OrderStatus, Cart, Address, StripeCheckoutOrder, StripePaymentLog } = require('../../models');
const uuidService = require('../../services/uuidService')
const OrderSerializer = require('../../serializers/v1/OrderSerializer')
const OrderStatusValues = require("../../models/values/OrderStatus")
const {updateCartStatus} = require("../../services/cartService")
const CartStatusValues = require("../../models/values/CartStatus")

/**
 * get order item
 * @param {*} req 
 * @param {*} res 
 */

const getOrderItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    const groups = req.query.groups ? req.query.groups.split(",") : []

    await Order.findOne({ 
        where: { uuid },
        include: [
            {
                model: User
            },
            {
                model: OrderStatus
            },
            {
                model: Cart
            },
            {
                model: Address,
                as: 'ShippingAddress',
            },
            {
                model: Address,
                as: 'BillingAddress',
            },
            (groups && groups.includes('paymentInfo') && {
                model: StripeCheckoutOrder,
                include: [
                    {
                        model: StripePaymentLog
                    }
                ]
            })
        ].filter(data => data !== false)
    }).then(async(order) => {
        const orderSerializer = new OrderSerializer(["read", ...groups])
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, order: await orderSerializer.serialize(order, false)} });
    })
    .catch(error => {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Order not found"} });
    });
};

/**
 * Update order status on succesful transaction
 * @param {*} req
 * @param {*} res
 */

 const postOrderChargeSuccessItem = async (req, res) => {
     let order = null
     try {
        const uuid = uuidService.decodeUuid(req.params.uuid)
        order = await Order.findOne({
            include: [
                {
                    model: User
                },
                {
                    model: OrderStatus
                },
                {
                    model: Cart
                },
                {
                    model: Address,
                    as: 'ShippingAddress',
                },
                {
                    model: Address,
                    as: 'BillingAddress',
                },
            ],
            where: { uuid }
        })
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Order not found"} });
    }
    
    if (!order) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Order not found"} });
    }

    if (order.statusId !== OrderStatusValues.COMPLETE.id) {
        await order.update({
            statusId: OrderStatusValues.PENDING.id
        })
    
        await updateCartStatus(order.cartId, CartStatusValues.PENDING.id)
    }
    
    const orderSerializer = new OrderSerializer()
    return res.status(httpStatus.OK).json(
        {
            statusCode: httpStatus.OK, 
            order: await orderSerializer.serialize(order)
        }
    );
}

module.exports = {
    getOrderItem,
    postOrderChargeSuccessItem
}