const {Salon, Role} = require("../../models")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")
const AddressSerializer = require("./AddressSerializer")
const NoteSerializer = require("./NoteSerializer")
const ReviewSerializer = require("./ReviewSerializer")
const MediaFileSerializer = require("./MediaFileSerializer")
const SalonTypeSerializer = require("./SalonTypeSerializer")
const SalonStatusSerializer = require("./SalonStatusSerializer")

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
    lastName: {
        groups: ["read"]
    },
    phone: {
        groups: ["read"]
    },
    email: {
        groups: ["read"]
    },
    subdomain: {
        groups: ["readExtended"]
    },
    mobilePhone: {
        groups: ["read"]
    },
    otherEmail: {
        groups: ["read"]
    },
    noOfSalons: {
        groups: ["readExtended"]
    },
    describeSalon: {
        groups: ["read"]
    },
    noOfChairs: {
        groups: ["readExtended"]
    },
    noOfEmployees: {
        groups: ["readExtended"]
    },
    servicesProvide: {
        groups: ["read"]
    },
    approxMonthlyRevenue: {
        groups: ["readExtended"]
    },
    rating: {
        groups: ["read"]
    },
    ownerReview: {
        groups: ["readExtended"]
    },
    fromTime: {
        groups: ["read"]
    },
    toTime: {
        groups: ["read"]
    },
    fromDay: {
        groups: ["read"]
    },
    toDay: {
        groups: ["read"]
    },
    address: {
        groups: ["read", "location"],
        propertyName: "address",
        relation: (data) => data.Address,
        serializer: async(data) => {
            if (data) {
                const addressSerializer = new AddressSerializer(["read", "extended"])
                return await addressSerializer.serialize(data)
            }
            return null;
        }
    },
    user: {
        groups: ["readExtended"],
        propertyName: "user",
        relation: (data) => data.User,
        serializer: async(data) => {
            if (data) {
                const UserSerializer = require("./UserSerializer")
                const userSerializer = new UserSerializer()
                return await userSerializer.serialize(data)
            }
            return null;
        }
    },
    customer: {
        groups: ["customer"],
        propertyName: "customer",
        relation: (data) => data.Customers,
        serializer: async(data) => {
            if (data && data.length) {
                const customers = []
                data.forEach(customer => {
                    const {uuid, email, firstName, lastName, profileImage} = customer
                    customers.push({
                        uuid: uuidService.encodeUuid(uuid),
                        email,
                        firstName,
                        lastName,
                        profileImage
                    })
                })

                return customers
            }
        }
    },
    notes: {
        groups: ["readExtended"],
        propertyName: "note",
        relation: (data) => data.Notes,
        serializer: async(data) => {
            if (data) {
                const noteSerializer = new NoteSerializer(["read", "extended"])
                const notes = await noteSerializer.serialize(data[0], false)
                return notes
            }
        }
    },
    reviews: {
        groups: ["readExtended"],
        propertyName: "review",
        relation: (data) => data.Reviews,
        serializer: async(reviews) => {
            if (reviews) {
                const sorted_reviews = reviews.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                })

                const reviewSerializer = new ReviewSerializer(["read", "extended"])
                const review = await reviewSerializer.serialize(sorted_reviews[0], false)
                return review
            }
        }
    },
    businessServices: {
        groups: ["businessServices"],
        propertyName: "businessServices",
        relation: (data) => data.BusinessServices,
        serializer: async(data) => {
            if (data && data.length) {
                const BusinessServiceSerializer = require("./BusinessServiceSerializer")
                const businessServices = []
                data.forEach(async(businessService) => {
                    businessServices.push(
                        await (new BusinessServiceSerializer()).serialize(businessService)
                    )
                })

                return businessServices
            }
        }
    },
    salonImages: {
        groups: ["read"],
        propertyName: "salonImages",
        relation: (data) => data.SalonImages,
        serializer: async(data) => {
            if (data && data.length) {
                const mediaFiles = []
                for(let i = 0; i < data.length; i++){
                    const mediaFile = data[i]
                    const mediaFileObj = await (new MediaFileSerializer()).serialize(mediaFile)
                    mediaFiles.push(
                        mediaFileObj
                    )
                }
                return mediaFiles
            }
        }
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.SalonStatus,
        serializer: async(data) => {
            if (data) {
                const salonStatusSerializer = new SalonStatusSerializer()
                return await salonStatusSerializer.serialize(data, false)
            }
        }
    },
    typeId: {
        propertyName: "type",
        groups: ["read"],
        relation: (data) => data.SalonType,
        serializer: async(data) => {
            if (data) {
                const salonTypeSerializer = new SalonTypeSerializer()
                return await salonTypeSerializer.serialize(data, false)
            }
        }
    },
}

const serializerGroups = ["read"]

class SalonSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(Salon, fields, groups)
    }
}


module.exports = SalonSerializer