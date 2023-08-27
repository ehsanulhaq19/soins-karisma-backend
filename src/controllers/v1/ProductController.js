const httpStatus = require('http-status');
const { Product, ProductStatus, Review, ProductReview } = require('../../models');
const ProductStatusValues = require("../../models/values/ProductStatus")
const uuidService = require('../../services/uuidService')
const ProductSerializer = require('../../serializers/v1/ProductSerializer')
const apiDataJson = require("../../constants/apiConfig.json");
const product = require('../../docs/v1/components/product');

/**
 * get product item
 * @param {*} req 
 * @param {*} res 
 */

const getProductItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    
    await Product.findOne({
        include: [
            {
                model: ProductStatus
            },
            {
                model: Review
            }

        ],
        where: { uuid }
    }).then(async(product) => {
        const productSerializer = new ProductSerializer()
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, product: await productSerializer.serialize(product, false)} });
    })
    .catch(error => {
        console.log(error);
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Product not found"} });
    });
};

/**
 * patch product item
 * @param {*} req
 * @param {*} res 
 */

 const patchProductItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    let product;
    try {
        product = await Product.findOne({ where: { uuid } })
    } catch (error) {
        product = null
    }
    
    if (!product) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Product not found"} });
    }
    const data = req.body
    await product.update({
        ...(data.name && {name: data.name}),
        ...(data.description && {description: data.description}),
        ...(data.price && {price: data.price}),
        ...(data.rating && {rating: data.rating}),
        ...(data.stock && {stock: data.stock}),
        ...(data.imageUrl && {imageUrl: data.imageUrl}),
        ...(data.url && {url: data.url}),
        ...(data.backgroundColor && {backgroundColor: data.backgroundColor}),
        ...(data.statusId && {statusId: data.statusId}),
        ...(data.benefits && {benefits: data.benefits}),
        ...(data.ingredients && {ingredients: data.ingredients})
    })

    const productSerializer = new ProductSerializer()
    res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, product: await productSerializer.serialize(product)} });
 };

/**
 * create product item
 * @param {*} req 
 * @param {*} res 
 */

 const createProductItem = async (req, res) => {
    const data = req.body

    //create product
    const newProduct = await Product.build({
        name: data.name,
        description: data.description,
        price: data.price,
        rating: data.rating,
        stock: data.stock,
        imageUrl: data.imageUrl,
        url: data.url,
        backgroundColor: data.backgroundColor,
        statusId: data.statusId || ProductStatusValues.ACTIVE.id,
        benefits: data.benefits,
        ingredients: data.ingredients
    });

    //send response
    await newProduct.save()
    .then(async(product) => {
        const productSerializer = new ProductSerializer()
        return res.status(httpStatus.CREATED).json({ ...{
            statusCode: httpStatus.CREATED,
            product: await productSerializer.serialize(newProduct)
        } });
    })
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "Product is not created"
        } });
    });
};

/**
 * get product collection
 * @param {*} req 
 * @param {*} res 
 */

 const getProductCollection = async (req, res) => {
    const data = req.query
    
    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    const products = await Product.findAll({
        include: [
            {
                model: ProductStatus
            },
            {
                model: Review
            }
        ],
        where: {
            statusId: ProductStatusValues.ACTIVE.id
        },
        order: [
            ['id', 'ASC']
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

/**
 * delete product
 * @param {*} req
 * @param {*} res 
 */

 const deleteProductItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    let product;
    try {
        product = await Product.findOne({ where: { uuid } })
    } catch (error) {
        product = null
    }
    
    if (!product) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Product not found"} });
    }

    await product.update({
        statusId: ProductStatusValues.DISABLE.id
    })
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: "Product is not deleted"} });
    })

    res.status(httpStatus.NO_CONTENT).json({ ...{statusCode: httpStatus.NO_CONTENT}});
 };

module.exports = {
    getProductItem,
    patchProductItem,
    createProductItem,
    getProductCollection,
    deleteProductItem
}