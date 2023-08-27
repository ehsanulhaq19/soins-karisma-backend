const httpStatus = require('http-status');
const { Booking, BusinessServiceEmployee, User, BookingStatus, Employee, Salon, BusinessService, BusinessServiceRoom, BusinessServiceRoomChair } = require('../../models');
const BookingSerializer = require('../../serializers/v1/BookingSerializer')
const apiDataJson = require("../../constants/apiConfig.json");
const bookingStatusValues = require("../../models/values/BookingStatus")
const sequelize = require('sequelize');
const uuidService = require('../../services/uuidService');
const { DateTime } = require("luxon");
const {setBookingCancelStatus} = require("../../repository/bookingStatusDetailRepository")

/**
 * create Booking item
 * @param {*} req 
 * @param {*} res 
 */

const createBookingItem = async (req, res) => {
    const data = req.body
    const booker = req.booker
    const businessService = req.businessService
    const businessServiceRoom = req.businessServiceRoom
    const businessServiceRoomChair = req.businessServiceRoomChair
    const businessServiceEmployee = req.businessServiceEmployee

    //create booking
    const booking = await Booking.build({
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
        originalAmount: businessService.price,
        amountToPay: businessService.price,
        businessServiceEmployeeId: businessServiceEmployee.id,
        businessServiceRoomId: businessServiceRoom.id,
        businessServiceRoomChairId: businessServiceRoomChair.id,
        bookerId: booker.id,
        statusId: data.statusId || bookingStatusValues.APPROVED.id,
        bookerName: `${booker.firstName} ${booker.lastName}`,
        bookerEmail: data.bookerEmail,
        isEmailAlert: data.isEmailAlert,
        bookerPhone: data.bookerPhone,
        isSmsAlert: data.isSmsAlert,
        note: data.note,
        typeId: 1
    });

    //send response
    await booking.save()
    .then(async(response) => {
        const query = {
            include: [
                {
                    model: User,
                    as: "Booker"
                },
                {
                    model: BusinessServiceEmployee,
                    include: [
                        {
                            model: Employee,
                            include: [
                                {
                                    model: User
                                },
                                {
                                    model: Salon,
                                }
                            ]
                        }
                    ],
                },
                {
                    model: BookingStatus
                }
            ]
        }
        let booking = await Booking.findOne({
            ...query,
            where: { uuid: response.uuid }
        })
        const bookingSerializer = new BookingSerializer()
        return res.status(httpStatus.CREATED).json({ ...{
            statusCode: httpStatus.CREATED,
            booking: await bookingSerializer.serialize(booking)
        } });
    })
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "Booking is not created"
        } });
    });
};

/**
 * get booking collection
 * @param {*} req 
 * @param {*} res 
 */

 const getBookingCollection = async (req, res) => {

    const data = req.query
    const salon = req.salon
    const salonUser = req.salonUser
    const employee = req.employee
    const businessService = req.businessService
    let fromDate;
    let toDate;
    if (data.fromDate) {
        const fromDateObj = data.fromDate ? DateTime.fromISO(data.fromDate) : DateTime.now()
        const toDateObj = data.toDate ? DateTime.fromISO(data.toDate) : DateTime.fromISO(data.fromDate)
    
        fromDate = fromDateObj.startOf('day').toISO()
        toDate = toDateObj.endOf('day').toISO()
    }

    const query = {
        include: [
            {
                model: User,
                as: "Booker",
                ...(
                    salonUser && {
                        where: {
                            id: salonUser.id
                        }
                    }
                )
            },
            {
                model: BusinessServiceEmployee,
                include: [
                    {
                        model: Employee,
                        include: [
                            {
                                model: User
                            },
                        ],
                        ...(
                            employee && {
                                where: {
                                    id: employee.id
                                }
                            }
                        )
                        
                    },
                    {
                        model: BusinessService,
                        include: [
                            {
                                model: Salon,
                                ...(
                                    salon && {
                                        where: {
                                            id: salon.id
                                        }
                                    }
                                )
                            }
                        ],
                        ...(
                            businessService && {
                                where: {
                                    id: businessService.id
                                }
                            }
                        )
                    }
                ],
            },
            {
                model: BusinessServiceRoom
            },
            {
                model: BusinessServiceRoomChair
            },
            {
                model: BookingStatus
            }
        ],
        where: {
        ...(
            salon && {
                    where: sequelize.where(sequelize.col('BusinessServiceEmployee.BusinessService.Salon.id'), '!=',  null)
                }
            ),
        ...(
            data.statusId && {
                    statusId: data.statusId
                }
            ),
        ...(
                toDate && fromDate && {
                    startDateTime: {
                        [sequelize.Op.between]: [(fromDate), (toDate)]
                    },
                }
            )
        }

    }
    
    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }

    const orderBy = data.orderBy 
    const order = orderBy && [
        ['id', orderBy]
    ]

    // apiDataJson
    const bookings = await Booking.findAll({
        ...query,
        order,
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })

    const bookingSerializer = new BookingSerializer()
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        bookings: await bookingSerializer.serializeBulk(bookings)
    } });
};

/**
 * get booking item
 * @param {*} req 
 * @param {*} res 
 */

 const getBookingItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    const query = {
        include: [
            {
                model: User,
                as: "Booker"
            },
            {
                model: BusinessServiceEmployee,
                include: [
                    {
                        model: Employee,
                        include: [
                            {
                                model: User
                            }
                        ]
                    },
                    {
                        model: BusinessService,
                        include: [
                            {
                                model: Salon,
                            }
                        ]
                    }
                ],
            },
            {
                model: BusinessServiceRoom
            },
            {
                model: BusinessServiceRoomChair
            },
            {
                model: BookingStatus
            }
        ]
    }
    await Booking.findOne({
        ...query,
        where: { uuid }
    }).then(async(booking) => {
        const bookingSerializer = new BookingSerializer()
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, booking: await bookingSerializer.serialize(booking, false)} });
    })
    .catch(error => {
        console.log(error)
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Booking not found"} });
    });
};

/**
 * delete booking
 * @param {*} req
 * @param {*} res 
 */

 const deleteBookingItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    let booking;
    try {
        booking = await Booking.findOne({ where: { uuid } })
    } catch (error) {
        booking = null
    }
    
    if (!booking) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Booking not found"} });
    }

    await booking.update({
        statusId: bookingStatusValues.DELETE.id
    })
    .catch(e => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: "Booking is not deleted"} });
    })

    res.status(httpStatus.NO_CONTENT).json({ ...{statusCode: httpStatus.NO_CONTENT}});
 };

/**
 * patch booking item
 * @param {*} req
 * @param {*} res 
 */

 const patchBookingItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    const data = req.body
    const query = {
        include: [
            {
                model: User,
                as: "Booker"
            },
            {
                model: BusinessServiceEmployee,
                include: [
                    {
                        model: Employee,
                        include: [
                            {
                                model: User
                            }
                        ]
                    },
                    {
                        model: BusinessService,
                        include: [
                            {
                                model: Salon,
                            }
                        ]
                    }
                ],
            },
            {
                model: BusinessServiceRoom
            },
            {
                model: BusinessServiceRoomChair
            },
            {
                model: BookingStatus
            }
        ]
    }
    await Booking.findOne({
        where: { uuid }
    }).then(async(booking) => {
        await booking.update({
            statusId: data.statusId
        })

        const updatedBooking = await Booking.findOne({
            ...query,
            where: { uuid }
        })

        .catch(e => {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: "Booking is not updated"} });
        })
        
        const bookingSerializer = new BookingSerializer()
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, booking: await bookingSerializer.serialize(updatedBooking)} });
    })
    .catch(error => {
        console.log(error)
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Booking not found"} });
    });
};

/**
 * Post booking cancel item api
 * To cancel appointment and add its cancelation detail
 * @param {*} req
 * @param {*} res 
 */

const postBookingCancelItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    const data = req.body
    const user = req.user

    const query = {
        include: [
            {
                model: User,
                as: "Booker"
            },
            {
                model: BookingStatus
            }
        ]
    }
    await Booking.findOne({
        ...query,
        where: { uuid }
    }).then(async(booking) => {
        const {booking: updatedBooking, bookingStatusDetail} = await setBookingCancelStatus({
            booking,
            cancelDescription: data.description,
            user
        })
        
        const bookingSerializer = new BookingSerializer()
        return res.status(httpStatus.OK).json({ 
            statusCode: httpStatus.OK, 
            booking: await bookingSerializer.serialize(updatedBooking),
            bookingStatusDetail: {
                description: bookingStatusDetail.description
            }
        });
    })
    .catch(error => {
        console.log(error)
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Booking not found"} });
    });
};

module.exports = {
    createBookingItem,
    getBookingCollection,
    getBookingItem,
    deleteBookingItem,
    patchBookingItem,
    postBookingCancelItem
}