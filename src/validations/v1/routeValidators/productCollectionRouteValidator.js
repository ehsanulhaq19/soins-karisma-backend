const httpStatus = require('http-status');
const { Op } = require("sequelize");
const productCollectionRequest = require("../requestValidators/productCollectionRequest")
const statuses = require('../../../constants/statuses.json')
const {Product} = require("../../../models")
const uuidService = require("../../../services/uuidService")
const ProductStatusValues = require("../../../models/values/ProductStatus")
const {isDuplicateObjectValues} = require("../../../utils/utility")

const postProductCollectionItemRouteValidator = async(req) => {
    const data = req.body
    //validate request data
    const validationResponse = productCollectionRequest.validatePostProductCollectionItemRequest(data)
    if (validationResponse.type === statuses.ERROR) {
      return {
            type: statuses.ERROR,
            statusCode: httpStatus.BAD_REQUEST,
            message: validationResponse.message
        }
    }

    const isDuplicateUuids = isDuplicateObjectValues(data.products, 'productUuid')
    if (isDuplicateUuids) {
        return {
            type: statuses.ERROR,   
            statusCode: httpStatus.BAD_REQUEST,
            message: `Duplicate product uuids are not allowed`
        }
    }

    const productUuids = []
    const invalidProductUuids = []
    data.products.forEach(product => {
        let uuid = uuidService.decodeUuid(product.productUuid)
        if (uuidService.isValidUuid(uuid)) {
            productUuids.push(
                uuid
            )
        } else {
            invalidProductUuids.push(product.productUuid)
        }
    });
    
    if (invalidProductUuids.length) {
        return {
            type: statuses.ERROR,   
            statusCode: httpStatus.BAD_REQUEST,
            message: `Invalid product uuids [${invalidProductUuids.join(", ")}]`
        }
    }

    let products;
    try{
        products = await Product.findAll({
            where: {
                uuid : {
                    [Op.in]: productUuids
                },
                statusId: ProductStatusValues.ACTIVE.id
            }
        })
    } catch(e) {}

    if (!products || !products.length) {
        return {
            type: statuses.ERROR,   
            statusCode: httpStatus.NOT_FOUND,
            message: "Products not found"
        }
    }

    if (productUuids.length !== products.length) {
        const fetchedProductsUuid = []
        products.forEach(product => {
            fetchedProductsUuid.push(product.uuid)
        })

        const invalidProductUuids = []
        productUuids.forEach(x => {
            if (fetchedProductsUuid.indexOf(x) === -1) {
                invalidProductUuids.push(uuidService.encodeUuid(x))
            }
        });
        
        return {
            type: statuses.ERROR,   
            statusCode: httpStatus.NOT_FOUND,
            message: `Invalid products [${invalidProductUuids.join(", ")}]`
        }
    }

    req.products = products
    return {
        type: statuses.SUCCESS
    }
}

module.exports = {
    postProductCollectionItemRouteValidator
}