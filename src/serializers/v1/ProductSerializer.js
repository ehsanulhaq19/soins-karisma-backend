const {Product} = require("../../models")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")
const ProductStatusSerializer = require("./ProductStatusSerializer")
const ReviewSerializer = require("./ReviewSerializer")

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
    rating: {
        groups: ["read"]
    },
    stock: {
        groups: ["read"]
    },
    imageUrl: {
        groups: ["read"]
    },
    url: {
        groups: ["read"]
    },
    backgroundColor: {
        groups: ["read"]
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.ProductStatus,
        serializer: async(data) => {
            if (data) {
                const productStatusSerializer = new ProductStatusSerializer()
                return await productStatusSerializer.serialize(data, false)
            }
        }
    },
    benefits: {
        groups: ["read"]
    },
    ingredients: {
        groups: ["read"]
    },
    reviews: {
        propertyName: "reviews",
        groups: ["read"],
        relation: (data) => data.Reviews,
        serializer: async(data) => {
            if (data) {
                const reviewSerializer = new ReviewSerializer()
                return await reviewSerializer.serializeBulk(data, false)
            }
        }
    }
}

const serializerGroups = ["read"]

class ProductSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(Product, fields, groups)
    }
}


module.exports = ProductSerializer