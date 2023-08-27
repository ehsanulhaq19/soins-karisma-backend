const {Booking} = require("../../models")
const uuidService = require("../../services/uuidService")
const Serializer = require("./Serializer")
const BookingStatusSerializer = require("./BookingStatusSerializer")
const UserSerializer = require("./UserSerializer")
const EmployeeSerializer = require("./EmployeeSerializer")
const BusinessServiceSerializer = require("./BusinessServiceSerializer")
const BusinessServiceRoomSerializer = require("./BusinessServiceRoomSerializer")
const BusinessServiceRoomChairSerializer = require("./BusinessServiceRoomChairSerializer")

const fields = {
    uuid: {
        groups: ["read"],
        serializer: (data) => uuidService.encodeUuid(data)
    },
    startDateTime: {
        groups: ["read"]
    },
    endDateTime: {
        groups: ["read"]
    },
    bookerName: {
        groups: ["read"]
    },
    bookerPhone: {
        groups: ["read"]
    },
    bookerEmail: {
        groups: ["read"]
    },
    isSmsAlert: {
        groups: ["read"]
    },
    isEmailAlert: {
        groups: ["read"]
    },
    note: {
        groups: ["read"]
    },
    statusId: {
        propertyName: "status",
        groups: ["read"],
        relation: (data) => data.BookingStatus,
        serializer: async(data) => {
            if (data) {
                const bookingStatusSerializer = new BookingStatusSerializer()
                return await bookingStatusSerializer.serialize(data, false)
            }
        }
    },
    bookerId: {
        propertyName: "booker",
        groups: ["read"],
        relation: (data) => data.Booker,
        serializer: async(data) => {
            if (data) {
                const userSerializer = new UserSerializer()
                return await userSerializer.serialize(data, false)
            }
        }
    },
    businessServiceEmployeeId: {
        propertyName: "businessServiceEmployee",
        groups: ["read"],
        relation: (data) => data.BusinessServiceEmployee,
        serializer: async(data) => {
            if (data) {
                const response = {}
                if (data?.Employee) {
                    const employeeSerializer = new EmployeeSerializer()
                    response['employee'] = await employeeSerializer.serialize(data.Employee, false)
                }
                if (data?.BusinessService) {
                    const businessServiceSerializer = new BusinessServiceSerializer()
                    response['businessService'] = await businessServiceSerializer.serialize(data.BusinessService, false)
                }
                return response
            }
        }
    },
    businessServiceRoomId: {
        propertyName: "businessServiceRoom",
        groups: ["read"],
        relation: (data) => data.BusinessServiceRoom,
        serializer: async(data) => {
            if (data) {
                const businessServiceRoomSerializer = new BusinessServiceRoomSerializer(["bookingDetail"])
                return await businessServiceRoomSerializer.serialize(data, false)
            }
        }
    },
    businessServiceRoomChairId: {
        propertyName: "businessServiceRoomChair",
        groups: ["read"],
        relation: (data) => data.BusinessServiceRoomChair,
        serializer: async(data) => {
            if (data) {
                const businessServiceRoomChairSerializer = new BusinessServiceRoomChairSerializer()
                return await businessServiceRoomChairSerializer.serialize(data, false)
            }
        }
    }
}

const serializerGroups = ["read"]
class BookingSerializer extends Serializer{
    constructor(groups = serializerGroups) {
        super(Booking, fields, groups)
    }
}

module.exports = BookingSerializer