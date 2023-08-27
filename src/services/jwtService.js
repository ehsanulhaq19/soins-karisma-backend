const jwt = require('jsonwebtoken');

const encrypt = (data, privateKey=false) => {
    let encryptKey = process.env.JWT_PUBLIC_KEY
    if (privateKey) {
        encryptKey = process.env.JWT_PRIVATE_KEY
    }

    return jwt.sign(data, encryptKey);
}

const decrypt = (token, privateKey=false) => {
    let encryptKey = process.env.JWT_PUBLIC_KEY
    if (privateKey) {
        encryptKey = process.env.JWT_PRIVATE_KEY
    }

    try {
        const data = jwt.verify(token, encryptKey)
        return data
    } catch (error) {
        return null
    }
}

module.exports = {
    encrypt,
    decrypt
}