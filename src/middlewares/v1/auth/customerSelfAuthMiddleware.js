const httpStatus = require('http-status');
const uuidService = require("../../../services/uuidService")
const responseMessages = require("../../../constants/responseMessages.json")
const userRepository = require("../../../repository/userRepository")

const userUuidRoutes = {
    "/api/v1/users/uuid": {}
}

const validator = async(req, res, next, permissions = {}) => {
    const user = req.user
    const isCustomer = userRepository.isCustomer(user)

    if (isCustomer) {
        const paramUuid = req?.params?.uuid
        if (paramUuid) {
            const routeArray = req.originalUrl.split("/")
            routeArray.pop()
            const userUuidRoute = `${routeArray.join("/")}/uuid`
            if (userUuidRoutes[userUuidRoute]) {
                const userUuid = uuidService.encodeUuid(user.uuid)
    
                if (paramUuid !== userUuid) {
                    return res.status(httpStatus.UNAUTHORIZED).json({
                        statusCode: httpStatus.UNAUTHORIZED,
                        message: responseMessages.accessDenied
                    });
                }
            }
        }
    }

    next()
}

module.exports = validator;