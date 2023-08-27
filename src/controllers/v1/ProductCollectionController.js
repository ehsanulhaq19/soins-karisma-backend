const httpStatus = require('http-status');
const { ProductCollection, ProductCollectionList, ProductCollectionStatus, Product, ProductStatus } = require('../../models');
const ProductCollectionStatusValues = require("../../models/values/ProductCollectionStatus")
const ProductCollectionListStatusValues = require("../../models/values/ProductCollectionListStatus")
const uuidService = require('../../services/uuidService')
const ProductCollectionSerializer = require('../../serializers/v1/ProductCollectionSerializer')
const apiDataJson = require("../../constants/apiConfig.json")

/**
 * create product collection item
 * @param {*} req 
 * @param {*} res 
 */

 const createProductCollectionItem = async (req, res) => {
    const data = req.body
    const products = req.products
    const productQuantities = {}
    data.products.forEach(product => {
        const {productUuid, productQuantity} = product
        productQuantities[uuidService.decodeUuid(productUuid)] = productQuantity
    })

    //create product collection
    const newProductCollection = await ProductCollection.create({
        name: data.name,
        description: data.description,
        price: data.price,
        backgroundColor: data.backgroundColor,
        statusId: ProductCollectionStatusValues.ACTIVE.id,
        typeId: 1,
        benefits: data.benefits,
        ingredients: data.ingredients
    }).then(async(productCollection) => {
        for(let i = 0; i < products.length; i++){
            const product = products[i]
            await ProductCollectionList.create({
                productId: product.id,
                productCollectionId: productCollection.id,
                productQuantity: productQuantities[product.uuid],
                statusId: ProductCollectionListStatusValues.ACTIVE.id,
                typeId: 1
            }).catch(e => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
                    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                    message: e?.errors?.[0]?.message ? e.errors[0].message : `Product collection product ${product.name} is not linked`
                } });
            });
        }
        return productCollection
    }).catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "Product collection is not created"
        } });
    });

    const productCollection = await ProductCollection.findOne({
        include: [
            {
                model: ProductCollectionStatus
            },
            {
                model: ProductCollectionList
            },
            {
                model: Product,
                include: [
                    {
                        model: ProductStatus
                    }
                ]
            }
        ],
        where: {
            id: newProductCollection.id
        },
    })
    const productCollectionSerializer = new ProductCollectionSerializer(["read", "extended"])
    return res.status(httpStatus.CREATED).json({ ...{
        statusCode: httpStatus.CREATED,
        productCollection: await productCollectionSerializer.serialize(productCollection, false)
    } });
}

/**
 * get product collection collection api
 * @param {*} req 
 * @param {*} res 
 */

const getProductCollectionCollection = async (req, res) => {
    const data = req.query
    
    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    const productCollections = await ProductCollection.findAll({
        include: [
            {
                model: ProductCollectionStatus
            },
            {
                model: ProductCollectionList
            },
            {
                model: Product,
                include: [
                    {
                        model: ProductStatus
                    }
                ]
            }
        ],
        where: {
            statusId: ProductCollectionStatusValues.ACTIVE.id
        },
        order: [
            ['id', 'ASC']
        ],
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })
    const productCollectionSerializer = new ProductCollectionSerializer(["read", "extended"])
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        productCollections: await productCollectionSerializer.serializeBulk(productCollections, false)
    } });
}

/**
 * get product collection item
 * @param {*} req 
 * @param {*} res 
 */

 const getProductCollectionItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    
    await ProductCollection.findOne({
        include: [
            {
                model: ProductCollectionStatus
            },
            {
                model: ProductCollectionList
            },
            {
                model: Product,
                include: [
                    {
                        model: ProductStatus
                    }
                ]
            }
        ],
        where: { uuid }
    }).then(async(productCollection) => {
        const productCollectionSerializer = new ProductCollectionSerializer(["read", "extended"])
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, productCollection: await productCollectionSerializer.serialize(productCollection, false)} });
    })
    .catch(error => {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "ProductCollection not found"} });
    });
};

/**
 * delete product collection
 * @param {*} req
 * @param {*} res 
 */

 const deleteProductCollectionItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    let productCollection;
    try {
        productCollection = await ProductCollection.findOne({ where: { uuid } })
    } catch (error) {
        productCollection = null
    }
    
    if (!productCollection) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "ProductCollection not found"} });
    }

    await productCollection.update({
        statusId: ProductCollectionStatusValues.DISABLE.id
    })
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: "ProductCollection is not deleted"} });
    })

    res.status(httpStatus.NO_CONTENT).json({ ...{statusCode: httpStatus.NO_CONTENT}});
 };

module.exports = {
    createProductCollectionItem,
    getProductCollectionCollection,
    getProductCollectionItem,
    deleteProductCollectionItem
}