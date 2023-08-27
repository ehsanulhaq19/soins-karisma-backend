const httpStatus = require('http-status');
const { Role } = require('../../models');
const RoleSerializer = require('../../serializers/v1/RoleSerializer')
/**
 * get role collection
 * @param {*} req 
 * @param {*} res 
 */

const getRoleCollection = async (req, res) => {
    await Role.findAll().then(async(roles) => {
        const roleSerializer = new RoleSerializer()
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, roles: await roleSerializer.serializeBulk(roles)} });
    })
    .catch(error => {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Roles not found"} });
    });
};

module.exports = {
    getRoleCollection,
}