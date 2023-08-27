const httpStatus = require('http-status');
const { Op } = require("sequelize");
const { DateTime } = require("luxon");
const bookingRequest = require("../../../validations/v1/requestValidators/bookingRequest")
const statuses = require('../../../constants/statuses.json')
const { Booking, BusinessService, Employee, BusinessServiceEmployee, EmployeeSchedule, Salon, User, BookingStatus } = require('../../../models');
const uuidService = require("../../../services/uuidService")
const BookingStatusValues = require("../../../models/values/BookingStatus")
const BusinessServiceStatusValues = require("../../../models/values/BusinessServiceStatus")
const userSubscriptionRepository = require("../../../repository/userSubscriptionRepository")
const businessServiceEmployeeRepository = require("../../../repository/businessServiceEmployeeRepository")
const businessServiceRepository = require("../../../repository/businessServiceRepository")
const userRepository = require("../../../repository/userRepository")
const SalonStatusValues = require("../../../models/values/SalonStatus")
const {isMatchingUrl} = require("../../../utils/utility")

const validator = async(req, res, next) => {

  const requestUrl = req.originalUrl
  
  if(req.method === 'POST') {
    if (requestUrl === '/api/v1/bookings') {
      const validatorResponse = await postBookingItem(req)
      if (validatorResponse.type === statuses.ERROR) {
        return res.status(validatorResponse.statusCode).json({ ...{
          statusCode: validatorResponse.statusCode,
          message: validatorResponse.message
        } });
      }
    }
  } else if(req.method === 'GET') {
    const requestUri = requestUrl.slice(0, requestUrl.lastIndexOf('/'))
    const getRequestUrl = "/api/v1/bookings/:uuid"
    const getRequestUri = getRequestUrl.slice(0, getRequestUrl.lastIndexOf('/'))
    const data = req.query
    
    if (requestUri === getRequestUri) {
      //validate booking get item api
    } else if (req.baseUrl === '/api/v1/bookings') {
      const data = req.query
      //validate query data
      const validationResponse = bookingRequest.validateGetBookingCollectionRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      // Check salon validaity
      if (data.salonUuid) {
        const salonUuid = uuidService.decodeUuid(data.salonUuid)
        let salon;
        try {
          salon = await Salon.findOne({
            where: {
              uuid: salonUuid
            }
          })
        } catch (error) {}
        
        if (!salon) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "Salon not found"
          } });
        }
        req.salon = salon
      }

      // Check user validaity
      if (data.bookerUuid) {
        const bookerUuid = uuidService.decodeUuid(data.bookerUuid)
        let user;
        try {
          user = await User.findOne({
            where: {
              uuid: bookerUuid
            }
          })
        } catch (error) {}
        
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "Booker user not found"
          } });
        }
        req.salonUser = user
      }

      // Check business service validaity
      if (data.businessServiceUuid) {
        const businessServiceUuid = uuidService.decodeUuid(data.businessServiceUuid)
        let businessService;
        try {
          businessService = await BusinessService.findOne({
            where: {
              uuid: businessServiceUuid
            }
          })
        } catch (error) {}
        
        if (!businessService) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "BusinessService not found"
          } });
        }
        req.businessService = businessService
      }

      // Check employee validaity
      if (data.employeeUuid) {
        const employeeUuid = uuidService.decodeUuid(data.employeeUuid)
        let employee;
        try {
          employee = await Employee.findOne({
            where: {
              uuid: employeeUuid
            }
          })
        } catch (error) {}
        
        if (!employee) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "Employee not found"
          } });
        }
        req.employee = employee
      }

      // Check booking status validity
      if (data.statusId) {
        let bookingStatus
        try {
          bookingStatus = await BookingStatus.findOne({
            where: {
              id: data.statusId
            }
          })
        } catch (error) {}

        if (!bookingStatus) {
          return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "BookingStatus not found"
          } });
        }
      }
    }
  } else if (req.method === 'PATCH') {
    if (isMatchingUrl("/api/v1/bookings/:uuid", req.originalUrl)) {
      const data = req.body
      //validate request dataquery
      const validationResponse = bookingRequest.validatePatchBookingItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }

      // check status validity
      if (data.statusId) {
        const status = await BookingStatus.findOne({where: {
          id: data.statusId
        }});
  
        if(!status) {
            return res.status(httpStatus.NOT_FOUND).json({ ...{
              statusCode: httpStatus.NOT_FOUND,
              message: "Status not found"
            } });
        }  
      }
    }
  } else if (req.method === 'POST') {
    if (isMatchingUrl("/api/v1/bookings/:uuid/cancel", req.originalUrl)) {
      const data = req.body
      //validate request dataquery
      const validationResponse = bookingRequest.validatePostBookingCancelItemRequest(data)
      if (validationResponse.type === statuses.ERROR) {
          return res.status(httpStatus.BAD_REQUEST).json({ ...{
              statusCode: httpStatus.BAD_REQUEST,
              message: validationResponse.message
          } });
      }
    }
  } 

  next()
}

const postBookingItem = async(req) => {
  const data = req.body
  const user = req.user

  // 1- validate query data
  const validationResponse = bookingRequest.validatePostBookingItemRequest(data)
  if (validationResponse.type === statuses.ERROR) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.BAD_REQUEST,
        message: validationResponse.message
    };
  }

  const isSalon = userRepository.isSalon(req.user)
  const isCustomer = userRepository.isCustomer(req.user)

  if (isSalon) {
    let bookerUser
    try {
      bookerUser = await User.findOne({
        where: {
          uuid: uuidService.decodeUuid(data.bookerUuid)
        }
      })
    } catch (error) {}
    req.booker = bookerUser

  } else if (isCustomer){
    req.booker = req.user

    if (data.statusId) {
      return {
        type: statuses.ERROR,
        statusCode: httpStatus.CONFLICT,
        message: "Customer can not set booking status"
      }
    }

  } else {
    req.booker = req.user
  }

  if (!req.booker) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.CONFLICT,
      message: "Invalid booker"
    }
  }

  const booker = req.booker

  const businessServiceUuid = uuidService.decodeUuid(data.businessServiceUuid)
  let businessService;
  
  // 2- Check if booker has active subscriptions
  const subscriptions = await userSubscriptionRepository.getUserActiveSubscriptions(booker)
  if (!subscriptions) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.CONFLICT,
      message: "Booker is not subscribed to any subscription"
    }
  }

  // 3- Check if booker's today's booking limit is reached
  const activeSubscription = subscriptions[0]

  const currentDateTime = DateTime.now()
  const startOfDay = currentDateTime.startOf('day').toISO()
  const endOfDay = currentDateTime.endOf('day').toISO()
  
  const todayBookings = await Booking.findAll({
    where: {
      booker_id: booker.id,
      statusId: BookingStatusValues.APPROVED.id,
      [Op.or]: {
        createdAt: {
          [Op.between]: [(startOfDay), (endOfDay)]
        }
      },
    }
  })

  if (todayBookings.length >= activeSubscription.maxActiveBookingsLimitPerDay) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.CONFLICT,
      message: "Booking per day max limit reached"
    };
  }

  // 4- Check if booker's total booking limit is reached

  const totalBookings = await Booking.findAll({
    where: {
      booker_id: booker.id,
      statusId: BookingStatusValues.APPROVED.id
    }
  })
  
  if (totalBookings.length >= activeSubscription.maxActiveBookingsLimit) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.CONFLICT,
      message: "Booking max limit reached"
    };
  }

  // 5- Check if business service is valid
  try {
    businessService = await BusinessService.findOne({
        include: [
          {
            model: Salon
          }
        ],
        where: {
            uuid: businessServiceUuid,
            statusId: BusinessServiceStatusValues.ACTIVE.id
        }
    })
  } catch (error) {}

  if (!businessService) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.NOT_FOUND,
      message: "BusinessService not found"
    };
  }
  req.businessService = businessService

  const businessServiceSalon = businessService.Salon
  
  if (businessServiceSalon.statusId !== SalonStatusValues.ACTIVE.id) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.CONFLICT,
      message: "BusinessService salon is not in active state"
    };
  }

  // 6- Check if employee is valid
  const employeeUuid = uuidService.decodeUuid(data.employeeUuid)
  let employee;
  
  try {
    employee = await Employee.findOne({
      where: {
          uuid: employeeUuid,
      },
      include: {
        model: EmployeeSchedule
      }
  })
  } catch (error) {}
  
  if (!employee) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.NOT_FOUND,
      message: "Employee not found"
    };
  }
  req.employee = employee

  // 7- Check if employee is available for booking
  if (!employee.EmployeeSchedule) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.CONFLICT,
      message: "Employee has no available schedule"
    };
  }

  const isEmployeeAvailable = await businessServiceEmployeeRepository.isEmployeeAvailableForBooking(
                                employee,
                                data.startDateTime,
                                data.endDateTime
                              )

  if (!isEmployeeAvailable) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.CONFLICT,
      message: "Employee is not available for this slot"
    };
  }

  // 8- Check if business service employee is valid
  let businessServiceEmployee;
  
  try {
    businessServiceEmployee = await BusinessServiceEmployee.findOne({
      where: {
          businessServiceId: businessService.id,
          employeeId: employee.id
      }
    })
  } catch (error) {}

  if (!businessServiceEmployee) {
    return {
      type: statuses.ERROR,
      statusCode: httpStatus.CONFLICT,
      message: "Employee is not linked with the BusinessService"
    };
  }
  
  req.businessServiceEmployee = businessServiceEmployee
  
  // 9- Check if room and chair is available for service
  const businessServiceRoomChair = await businessServiceRepository.getAvailableBusinessServiceRoomChair(
                                          businessService,
                                          data.startDateTime,
                                          data.endDateTime
                                        )
  
  if (!businessServiceRoomChair) {
    return {
          type: statuses.ERROR,
          statusCode: httpStatus.CONFLICT,
          message: "Business service is not available for this slot"
        };
  }

  req.businessServiceRoomChair = businessServiceRoomChair
  req.businessServiceRoom = businessServiceRoomChair.BusinessServiceRoom

  return {
    type: statuses.SUCCESS
  };
}

module.exports = validator;