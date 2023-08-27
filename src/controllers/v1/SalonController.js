const httpStatus = require('http-status');
const { 
    Salon, User, Address, SalonCustomer, BusinessService, 
    Review, Note, UserStatus, SalonImage, MediaFile, SalonStatus, Subscription } = require('../../models');
const uuidService = require('../../services/uuidService')
const SalonSerializer = require('../../serializers/v1/SalonSerializer')
const SalonCustomerSerializer = require('../../serializers/v1/SalonCustomerSerializer')
const apiDataJson = require("../../constants/apiConfig.json")
const sequelize = require('sequelize');
const salonRepository = require("../../repository/salonRepository")
const addressRepository = require("../../repository/addressRepository")
const SalonImageStatusValues = require("../../models/values/SalonImageStatus")
const SalonImageTypeValues = require("../../models/values/SalonImageType")
const {getBookingsStats} = require("../../repository/bookingRepository")
const SalonStatusValues = require("../../models/values/SalonStatus")
const SalonTypeValues = require("../../models/values/SalonType")

/**
 * get salon item
 * @param {*} req 
 * @param {*} res 
 */

const getSalonItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    
    await Salon.findOne({
        include: [
            {
                model: User
            },
            {
                model: Address
            },
            {   
                model: Note,
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 1
            },
            {
                model: Review
            },
            {
                model: MediaFile,
                as: "SalonImages"
            },
            {
                model: SalonStatus
            }          
        ],
        where: { 
            uuid
        }
    }).then(async(salon) => {
        const salonSerializer = new SalonSerializer(["read", "readExtended"])
        const bookingStats = await getBookingsStats({
            salon
        })
        const salonObject = {
            ...(await salonSerializer.serialize(salon)),
            totalBookings: bookingStats['totalBookings']
        }
        const salonResponse = {
            statusCode: httpStatus.OK, 
            salon: salonObject
        }
        return res.status(httpStatus.OK).json(
            salonResponse
        );
    })
    .catch(error => {
        console.log(error)
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Salon not found"} });
    });
};

/**
 * patch salon item
 * @param {*} req
 * @param {*} res 
 */

 const patchSalonItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)

    let salon;
    try {
        salon = await Salon.findOne({ 
            where: { uuid }
        })
    } catch (error) {
        salon = null
    }
    
    if (!salon) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Salon not found"} });
    }

    const data = req.body
    await salon.update({
        ...(data.name && {name: data.name}),
        ...(data.lastName && {lastName: data.lastName}),
        ...(data.mobilePhone && {mobilePhone: data.mobilePhone}),
        ...(data.phone && {phone: data.phone}),
        ...(data.otherEmail && {otherEmail: data.otherEmail}),
        ...(data.noOfSalons && {noOfSalons: data.noOfSalons}),
        ...(data.noOfChairs && {noOfChairs: data.noOfChairs}),
        ...(data.noOfEmployees && {noOfEmployees: data.noOfEmployees}),
        ...(data.describeSalon && {describeSalon: data.describeSalon}),
        ...(data.servicesProvide && {servicesProvide: data.servicesProvide}),
        ...(data.approxMonthlyRevenue && {approxMonthlyRevenue: data.approxMonthlyRevenue}),
        ...(data.subdomain && {subdomain: data.subdomain}),
        ...(data.rating && {rating: data.rating}),
        ...(data.ownerReview && {ownerReview: data.ownerReview}),
        ...(data.fromTime && {fromTime: data.fromTime}),
        ...(data.toTime && {toTime: data.toTime}),
        ...(data.fromDay && {fromDay: data.fromDay}),
        ...(data.toDay && {toDay: data.toDay}),
        ...(data.statusId && {statusId: data.statusId})
    })

    //update salon address if provided
    if (data.address) {
        data.address.id = salon.addressId
        address = await addressRepository.addOrUpdateAddress(data.address)
        
        if (address.id) {
            await salon.update({
                addressId: address?.id
            })
        }
    }

    if (data.profileImage) {
        const salonUser = await User.findOne({where: {email: salon.email}})
        salonUser.update({
            profileImage: data.profileImage
        })
    }

    if (req.mediaFiles?.length) {
        req.mediaFiles.forEach(async(mediaFile) => {
            await SalonImage.create({
                imageId: mediaFile.id,
                salonId: salon.id,
                typeId: SalonImageStatusValues.ACTIVE.id,
                statusId: SalonImageTypeValues.DEFAULT.id
            })
        })
    }

    const updatedSalon = await Salon.findOne({ 
        where: { uuid },
        include: [
            {
                model: Address
            },
            {
                model: MediaFile,
                as: "SalonImages"
            },
            {
                model: SalonStatus
            },
            {
                model: User
            },
        ]
    })
    
    const salonSerializer = new SalonSerializer(["read", "readExtended"])
    res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, salon: await salonSerializer.serialize(updatedSalon)} });
 };

/**
 * create salon item
 * @param {*} req 
 * @param {*} res 
 */

 const createSalonItem = async (req, res) => {
    const data = req.body

    //create salon
    const newSalon = await Salon.build({
        email: data.email,
        name: data.name,
        lastName: data.lastName,
        mobilePhone: data.mobilePhone,
        phone: data.phone,
        otherEmail: data.otherEmail,
        noOfSalons: data.noOfSalons,
        noOfChairs: data.noOfChairs,
        noOfEmployees: data.noOfEmployees,
        describeSalon: data.describeSalon,
        servicesProvide: data.servicesProvide,
        approxMonthlyRevenue: data.approxMonthlyRevenue,
        subdomain: data.subdomain,
        rating: data.rating,
        ownerReview: data.ownerReview,
        fromTime: data.fromTime,
        toTime: data.toTime,
        fromDay: data.fromDay,
        toDay: data.toDay,
        statusId: SalonStatusValues.ACTIVE.id,
        typeId: SalonTypeValues.DEFAULT.id
    });

    //send response
    await newSalon.save()
    .then(async(salon) => {
        let address = null;
        //create salon address if provided
        if (data.address) {
            address = await addressRepository.addOrUpdateAddress(data.address)
            await salon.update({
                addressId: address?.id
            })
        }

        const newCreatedSalon = await Salon.findOne({
            include: [
                {
                    model: User
                },
                {
                    model: Address
                },
                {
                    model: SalonStatus
                }
            ],
            where: { 
                id: salon.id
            }
        })

        const salonSerializer = new SalonSerializer(["read", "readExtended"])
        return res.status(httpStatus.CREATED).json({ ...{
            statusCode: httpStatus.CREATED,
            salon: await salonSerializer.serialize(newCreatedSalon)
        } });
    })
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "Salon is not created"
        } });
    });
};

/**
 * get salon collection
 * @param {*} req 
 * @param {*} res 
 */

 const getSalonCollection = async (req, res) => {
    const data = req.query
    const salonName = data.name
    const groups = req.query.groups ? req.query.groups.split(",") : []

    const query = {
        where: {
            ...(salonName && 
                {where: sequelize.where(sequelize.col('name'), 'ilike',  `%${salonName}%`)}
            ),
            where: sequelize.where(sequelize.col('User.id'), 'is not',  null)
        }
    }

    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    const salons = await Salon.findAll({
        include: [
            {
                model: User
            },
            {
                model: Address
            },
            (
                groups.includes("businessServices") && {
                    model: BusinessService,
                    duplicating: false
                }
            ),
            {
                model: MediaFile,
                as: "SalonImages",
                duplicating: false
            },
            {
                model: SalonStatus
            }
        ].filter(data => data),
        ...query,
        order: [
            ['id', 'ASC']
        ],
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })
    
    const salonSerializer = new SalonSerializer(["read", "readExtended", ...groups])
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        salons: await salonSerializer.serializeBulk(salons)
    } });
};

/**
 * get salon stats item
 * @param {*} req 
 * @param {*} res 
 */

 const getSalonStatsItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    const {fromDate, toDate} = req.query

    const salon = await Salon.findOne({ 
        where: { uuid }
    }).catch(error => {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Salon not found"} });
    });

    if (!salon) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{
            statusCode: httpStatus.NOT_FOUND,
            message: "Salon not found" 
        } });
    }
    
    const stats = await salonRepository.getSalonStats(salon, fromDate, toDate)

    return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK, 
        salonStats: stats
    });
};

/**
 * get salon locations collection
 * @param {*} req 
 * @param {*} res 
 */

 const getSalonLocationCollection = async (req, res) => {
    const data = req.query

    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    const salons = await Salon.findAll({
        include: [
            {
                model: Address
            }
        ],
        where: {
            addressId: {
                [sequelize.Op.ne]: null
            }
        },
        order: [
            ['id', 'ASC']
        ],
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })
    const salonSerializer = new SalonSerializer(["location"])
    const salonLocationsData = (await salonSerializer.serializeBulk(salons)).map(salonLocation => {
                                    const location = salonLocation.address    
                                    if (location) {
                                        location.status = {
                                            id: 1,
                                            name: "Active"
                                        }
                                    }
                                    return location
                                })
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        locations: salonLocationsData
    } });
};

/**
 * get salon locations collection
 * @param {*} req 
 * @param {*} res 
 */

 const getSalonCustomers = async (req, res) => {
    const data = req.query
    const uuid = req.params.uuid
    const groups = data.groups ? data.groups.split(",") : []

    let salon;
    if (uuid) {
        try {
            salon = await Salon.findOne({
                where: {
                    uuid: uuidService.decodeUuid(uuid)
                }
            })
        } catch (error) {}
    }

    if (!salon) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{
            statusCode: httpStatus.NOT_FOUND,
            message: "Salon not found" 
        } });
    }

    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }

    const offset = (pageNumber - 1) * itemsPerPage
    const limit = itemsPerPage

    const customerName = data.customerName
    let orderBy = data.orderBy ? data.orderBy.split(",") : ['id', 'ASC']
    orderBy = orderBy.length === 1 ? ['id', ...orderBy] : (
        orderBy[0] === 'statusId' ? [User, ...orderBy] : orderBy
    )

    const salonCustomers = await SalonCustomer.findAll({
        include: [
            {
                model: User,
                include: [
                    {
                        model: UserStatus
                    },
                    (
                        groups.includes("subscriptions") &&
                        {
                            model: Subscription
                        }
                    )
                ].filter(data => data),
                where: {
                    ...(
                        customerName && {
                            [sequelize.Op.or]: {
                                firstName: {
                                    [sequelize.Op.like]: `%${customerName}%`
                                },
                                lastName: {
                                    [sequelize.Op.like]: `%${customerName}%`
                                }
                            }
                        }
                    )
                }
            }
        ],
        where: {
            salonId: salon.id
        },
        order: [orderBy],
        offset,
        limit
    })
    
    const serializeGroups = ["read", ...groups]
    const salonCustomerSerializer = new SalonCustomerSerializer(serializeGroups)
    const salonCustomersData = (await salonCustomerSerializer.serializeBulk(salonCustomers))
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        customers: salonCustomersData
    } });
};

/**
 * delete salon images collection
 * @param {*} req
 * @param {*} res 
 */

 const deleteSalonImagesCollection = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    const mediaFileIds = req.mediaFileIds

    let salon;
    try {
        salon = await Salon.findOne({ 
            where: { uuid }
        })
    } catch (error) {
        salon = null
    }
    
    if (!salon) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Salon not found"} });
    }

    try {
        await SalonImage.destroy({
            where: {
                imageId: {
                    [sequelize.Op.in]: mediaFileIds
                },
                salonId: salon.id
            }
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: "Salon images are not deleted"} });
    }

    const updatedSalon = await Salon.findOne({ 
        where: { uuid },
        include: [
            {
                model: Address
            },
            {
                model: MediaFile,
                as: "SalonImages"
            }
        ] 
    })
    
    const salonSerializer = new SalonSerializer(["read", "readExtended"])
    res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, salon: await salonSerializer.serialize(updatedSalon)} });
 };

module.exports = {
    getSalonItem,
    patchSalonItem,
    createSalonItem,
    getSalonCollection,
    getSalonStatsItem,
    getSalonLocationCollection,
    getSalonCustomers,
    deleteSalonImagesCollection
}