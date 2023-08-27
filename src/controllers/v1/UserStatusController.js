const httpStatus = require('http-status');
const { UserStatus } = require('../../models');
const UserStatusSerializer = require('../../serializers/v1/UserStatusSerializer')

/**
 * get user status collection
 * @param {*} req 
 * @param {*} res 
 */

const getUserStatusCollection = async (req, res) => {
    const userStatuses = await UserStatus.findAll()
    const userStatusSerializer = new UserStatusSerializer()
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        userStatuses: await userStatusSerializer.serializeBulk(userStatuses)
    } });
};


module.exports = {
    getUserStatusCollection
}