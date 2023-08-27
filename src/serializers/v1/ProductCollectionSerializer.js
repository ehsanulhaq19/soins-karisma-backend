const {ProductCollection} = require("../../models")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")
const ProductCollectionStatusSerializer = require("./ProductCollectionStatusSerializer")
const ProductSerializer = require("./ProductSerializer")

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
    price: {
        groups: ["read"]
    },
    backgroundColor: {
        groups: ["read"]
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.ProductCollectionStatus,
        serializer: async(data) => {
            if (data) {
                const productCollectionStatusSerializer = new ProductCollectionStatusSerializer()
                return await productCollectionStatusSerializer.serialize(data, false)
            }
        }
    },
    benefits: {
        groups: ["read"]
    },
    ingredients: {
        groups: ["read"]
    },
    products: {
        groups: ["extended"],
        customFunction: async(data) => {
            const products = []
            if (data) {
                const productQuantity = {}
                if (data?.ProductCollectionLists) {
                    data.ProductCollectionLists.forEach(productCollectionList => {
                        productQuantity[productCollectionList.productId] = productCollectionList.productQuantity
                    })
                }
                const productsList = data?.Products
                if (productsList && productsList.length) {
                    const productSerializer = new ProductSerializer()
                    
                    for(let i = 0; i < productsList.length; i++) {
                        const product = productsList[i]
                        products.push(
                            {
                                product: await productSerializer.serialize(product, false),
                                productQuantity: productQuantity && productQuantity[product.id]
                            }   
                        )
                    }
                }
            }
            return products
        }
    }
}

const serializerGroups = ["read"]

class ProductCollectionSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(ProductCollection, fields, groups)
    }
}


module.exports = ProductCollectionSerializer