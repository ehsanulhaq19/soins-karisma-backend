const httpStatus = require('http-status');
const { User, UserStatus, Role } = require('../../models');
const UserSerializer = require('../../serializers/v1/UserSerializer')
const apiDataJson = require("../../constants/apiConfig.json");
const UserStatusValues = require("../../models/values/UserStatus")
const RoleValues = require("../../models/values/Role")
const sequelize = require('sequelize');

/**
 * get customer collection
 * @param {*} req 
 * @param {*} res 
 */

 const getCustomerCollection = async (req, res) => {
    const data = req.query
    const name = data.name || ""

    const query = {
        include: [
            {
                model: UserStatus
            },
            {
                model: Role,
                where: {
                    id: RoleValues.CUSTOMER.id
                }
            },
        ],
        where: {
            [sequelize.Op.or]: {
                firstName: {
                    [sequelize.Op.like]: `%${name}%`
                },
                lastName: {
                    [sequelize.Op.like]: `%${name}%`
                }
            },
            statusId: UserStatusValues.ACTIVE.id
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
    const users = await User.findAll({
        ...query,
        order,
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })
    
    const userSerializer = new UserSerializer()
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        users: await userSerializer.serializeBulk(users)
    } });
};

module.exports = {
    getCustomerCollection
}