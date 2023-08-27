const userRoles = require("../models/values/Role")
const {Address} = require("../models")

const adminRoleCode = 1
const salonRoleCode = 2
const customerRoleCode = 3

const isAdmin = (user) => {
    let isAdmin = false
    const roles = user?.Roles
    if (roles && roles.length) {
        roles.forEach(role => {
            const roleName = role.name.toUpperCase()
            if (userRoles[roleName] && userRoles[roleName].id == adminRoleCode) {
                isAdmin = true
            }
        });
    }
    return isAdmin
}

const isSalon = (user) => {
    let isSalon = false
    const roles = user?.Roles
    if (roles && roles.length) {
        roles.forEach(role => {
            const roleName = role.name.toUpperCase()
            if (userRoles[roleName] && userRoles[roleName].id == salonRoleCode) {
                isSalon = true
            }
        });
    }
    return isSalon
}

const isCustomer = (user) => {
    let isSalon = false
    const roles = user?.Roles
    if (roles && roles.length) {
        roles.forEach(role => {
            const roleName = role.name.toUpperCase()
            if (userRoles[roleName] && userRoles[roleName].id == customerRoleCode) {
                isSalon = true
            }
        });
    }
    return isSalon
}

const createOrUpdateUserAddress = async(user, address) => {
    const dataObject = {
        ...(address.address && {address: address.address}),
        ...(address.country && {country: address.country}),
        ...(address.state && {state: address.state}),
        ...(address.city && {city: address.city}),
        ...(address.postCode && {postCode: address.postCode}),
        ...(address.phoneNumber && {phoneNumber: address.phoneNumber}),
        ...(address.latitude && {latitude: address.latitude}),
        ...(address.longitude && {longitude: address.longitude})
    }
    if(user.addressId) {
        await Address.findOne({
            where: {
                id: user.addressId
            }
        }).then(async(orderFetched) => {
            await orderFetched.update(dataObject)
        })
    } else {
        const newAddress = await Address.create(dataObject)
        await user.update({
            addressId: newAddress.id
        })
    }

    return user
}

module.exports = {
    isAdmin,
    isSalon,
    isCustomer,
    createOrUpdateUserAddress
}
