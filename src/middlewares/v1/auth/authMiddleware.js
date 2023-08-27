const httpStatus = require('http-status');
const jwtService = require('../../../services/jwtService')
const {User, Role} = require("../../../models")
const uuidService = require("../../../services/uuidService")
const authService = require("../../../services/authService")
const responseMessages = require("../../../constants/responseMessages.json")
const userRepository = require("../../../repository/userRepository")
const UserStatusValues = require("../../../models/values/UserStatus")

const validator = async(req, res, next, permissions = {}) => {

    const authorizationHeader = req.headers['authorization']

    if (!authorizationHeader) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            statusCode: httpStatus.UNAUTHORIZED,
            message: responseMessages.accessDenied
        });
    }

    const authTokenArray = authorizationHeader.split('Bearer ', 2)
    if (authTokenArray.length == 1) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            statusCode: httpStatus.UNAUTHORIZED,
            message: responseMessages.accessDenied
        });

    }

    const token = authTokenArray[1]
    if (
        Object.keys(permissions).length &&
        permissions[req.method].includes("guest") && 
        authService.isValidGuestUserToken(token)
    ) {
        const guestUser = authService.getGuestUser(token)
        req.user = guestUser
        next()
        return
    }

    const decodedToken = jwtService.decrypt(token, true)

    if (!decodedToken) {
      return res.status(httpStatus.UNAUTHORIZED).json({
          statusCode: httpStatus.UNAUTHORIZED,
          message: responseMessages.accessDenied
      });

    }

    if (!decodedToken.uuid) {
      return res.status(httpStatus.UNAUTHORIZED).json({
          statusCode: httpStatus.UNAUTHORIZED,
          message: responseMessages.accessDenied
      });

    }

    const decodedUuid = uuidService.decodeUuid(decodedToken.uuid)
    const authUser = await User.findOne({
      where: {
        uuid: decodedUuid,
        statusId: UserStatusValues.ACTIVE.id
      },
      include: Role
    })

    const isAdmin = userRepository.isAdmin(authUser)
    let isPermissionGranted = false
    
    const permissionMethods = Object.keys(permissions)
    if (Array.isArray(permissionMethods) && permissionMethods.length) {
        permissionMethods.forEach(permissionMethod => {
            const methodName = permissionMethod.toUpperCase()
            if (
                isPermissionGrantedFunction(req, methodName, authUser, permissions[permissionMethod])
            ) {
                isPermissionGranted = true
            }
        })
    } else if (isAdmin){
        isPermissionGranted = true
    }
    
    if (!isPermissionGranted) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            statusCode: httpStatus.UNAUTHORIZED,
            message: responseMessages.accessDenied
        });
    }
    
    req.user = authUser
    next()
}

const isPermissionGrantedFunction = (request, methodName, authUser, permissions = []) => {
    const currentRequestMethodName = request.method

    if (currentRequestMethodName === methodName && permissions.length) {
        const userRoleName = authUser?.Roles?.[0]?.name
        if (userRoleName && permissions.includes(userRoleName.toLowerCase())) {
            return true
        }
    }
    return false
}


module.exports = validator;