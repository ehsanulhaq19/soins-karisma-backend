const httpStatus = require('http-status');
const userProductRequest = require("../../../validations/v1/requestValidators/userProductRequest")
const statuses = require('../../../constants/statuses.json')
const {User} = require("../../../models")
const uuidService = require("../../../services/uuidService")

const validator = async(req, res, next) => {
    
    if(req.method === 'GET') {
        if (req.baseUrl === '/api/v1/user_products') {
            const data = req.query
            //validate query data
            const validationResponse = userProductRequest.validateGetUserProductCollectionRequest(data)
            if (validationResponse.type === statuses.ERROR) {
                return res.status(httpStatus.BAD_REQUEST).json({ ...{
                    statusCode: httpStatus.BAD_REQUEST,
                    message: validationResponse.message
                } });
            }
            
            if (data.userUuid) {
                let user;
                try {
                    user = await User.findOne({
                        where: {
                            uuid: uuidService.decodeUuid(data.userUuid)
                        }
                    })
                } catch (error) {}

                if (!user) {
                    return res.status(httpStatus.NOT_FOUND).json({ ...{
                      statusCode: httpStatus.NOT_FOUND,
                      message: "User not found"
                    } });
                }

                req.productUser = user
            }
        }
    }
  next()
}

module.exports = validator;