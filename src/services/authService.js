const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuidService = require("./uuidService")
const jwtService = require("./jwtService")
const { User, Role, Salon } = require('../models');
const { isSalon } = require("../repository/userRepository")
const RoleValues = require("../models/values/Role")
const { DateTime } = require("luxon");

const cryptPassword = (password) => {
  return new Promise(function(resolve, reject) {
    try {
      const passwordString = isNaN(password) ? password : password.toString()
      bcrypt.genSalt(10, function(err, salt) {
        if (err) 
          reject(err);
    
        bcrypt.hash(passwordString, salt, function(err, hash) {
          if (err) {
            reject(err);
          }
          else {
            resolve(hash)
          }
        });
      });  
    } catch (error) {
      reject(error);
    }
  });
};

const comparePassword = (password, hashword) => {
  return new Promise (function(resolve, reject) {
    const passwordString = isNaN(password) ? password : password.toString()
    bcrypt.compare(passwordString, hashword, function(err, isPasswordMatch) {   
      if (err == null) {
        resolve(isPasswordMatch)
      } else {
        reject(err)
      }
    });
  })
};

const getUserJWT = async (userId) => {
  const user = await User.findOne(
    {
      where:{
        id: userId
      },
      include: Role
    }
  )

  const rolesList = []
  if (user.Roles) {
    user.Roles.forEach(role => {
      rolesList.push({
        id: role.id,
        name: role.name
      })
    })
  }

  const data = {
    uuid: uuidService.encodeUuid(user.uuid),
    email: user.email,
    userName: user.userName,
    roles: rolesList
  }
  const privateKey = process.env.JWT_PRIVATE_KEY
  
  if (isSalon(user)) {
    const salon = await Salon.findOne({
      where: {
        email: user.email
      }
    })
    data.salon = {
      salonUuid: uuidService.encodeUuid(salon.uuid),
      subdomain: salon.subdomain
    }
  }

  return jwt.sign(data, privateKey);
}

const getGuestUserToken = () => {
  const guestRole = RoleValues.GUEST
  const currentDate = DateTime.now()
  const randomId = Math.floor(Math.random() * 1000) + 1;
  const uniqueId = `${currentDate.toUnixInteger()}${randomId}`
  return jwtService.encrypt({
    uuid: uuidService.encodeUuid(process.env.GUEST_USER_UUID),
    userName: `guest_user_${uniqueId}`,
    firstName: 'Guest',
    lastName: 'User',
    email: `user${uniqueId}@guestuser.com`,
    roles: [
      {
        "id": guestRole.id,
        "name": guestRole.name
      }
    ]
  }, true)
}


const getGuestUser = (token) => {
  const decodedTokenData = jwtService.decrypt(token, true)
  return decodedTokenData
}

const isValidGuestUserToken = (token) => {
  const guestUser = jwtService.decrypt(token, true)

  try {
    if (uuidService.decodeUuid(guestUser.uuid) === process.env.GUEST_USER_UUID) {
      return true
    }
  } catch (error) {}

  return false
}

module.exports = {
    cryptPassword,
    comparePassword,
    getUserJWT,
    getGuestUserToken,
    isValidGuestUserToken,
    getGuestUser
}