const httpStatus = require('http-status');
const uuidService = require("../../../services/uuidService")
const responseMessages = require("../../../constants/responseMessages.json")
const userRepository = require("../../../repository/userRepository")
const salonRepository = require("../../../repository/salonRepository")

const salonUuidRoutes = {
    "/api/v1/salons/uuid": {}
}

const validator = async(req, res, next, permissions = {}) => {
    const user = req.user
    const isAdmin = userRepository.isAdmin(user)

    if (!isAdmin) {
        // const paramUuid = req?.params?.uuid
        // if (paramUuid) {
        //     const routeArray = req.originalUrl.split("/")
        //     routeArray.pop()
        //     const userUuidRoute = `${routeArray.join("/")}/uuid`
        //     if (salonUuidRoutes[userUuidRoute]) {
        //         const userUuid = uuidService.encodeUuid(user.uuid)
    
        //         if (paramUuid !== userUuid) {
        //             return res.status(httpStatus.UNAUTHORIZED).json({
        //                 statusCode: httpStatus.UNAUTHORIZED,
        //                 message: responseMessages.accessDenied
        //             });
        //         }
        //     }
        // }

        const salon = await salonRepository.getUserSalonByEmail(user)
        const data = req.body
        if (!salon) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                statusCode: httpStatus.UNAUTHORIZED,
                message: responseMessages.accessDenied
            });
        }

        const salonEncodedUuid = uuidService.encodeUuid(salon.uuid)
        if (salonEncodedUuid !== data['salonUuid']) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                statusCode: httpStatus.UNAUTHORIZED,
                message: responseMessages.accessDenied
            });
        }
    }

    next()
}

module.exports = validator;