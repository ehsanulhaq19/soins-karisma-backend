const httpStatus = require('http-status');
const { Cart, CartItem, Order, Product, ProductStatus } = require('../../models');
const OrderStatusValues = require("../../models/values/OrderStatus")
const ProductSerializer = require('../../serializers/v1/ProductSerializer')
const apiDataJson = require("../../constants/apiConfig.json")
const { Op, where: sequelizeWhere, col: sequelizeCol } = require("sequelize");

/**
 * get user product collection
 * @param {*} req 
 * @param {*} res 
 */

 const getUserProductCollection = async (req, res) => {
    const data = req.query
    const productUser = req.productUser
    // to do start query from product
    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    const products = await Product.findAll({
        attributes: [
            'uuid',
            'name',
            'description',
            'price',
            'rating',
            'stock',
            'imageUrl',
            'url',
            'statusId',
        ],
        include: [
            {
                model: CartItem,
                include: [
                    {
                        model: Cart,
                        include: {
                            model: Order,
                            where: {
                                userId: productUser.id,
                                statusId: {
                                    [Op.notIn]: [
                                        OrderStatusValues.DISABLE.id,
                                        OrderStatusValues.PAYMENT_FAIL.id,
                                        OrderStatusValues.PENDING.id,
                                        OrderStatusValues.REFUND.id
                                    ]
                                }
                            }
                        }
                    }
                ],
            },
            {
                model: ProductStatus
            }
        ],
        where: {
            where: sequelizeWhere(sequelizeCol('CartItem.Cart.Order.user_id'), '=',  productUser.id)
        },
        order: [
            ['id', 'DESC']
        ],
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })
    
    const productSerializer = new ProductSerializer()
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        products: await productSerializer.serializeBulk(products, false)
    } });
};


module.exports = {
    getUserProductCollection
}