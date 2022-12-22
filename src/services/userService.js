const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const tokenGeneration = (payload, secret, expireTime) => {
    return jwt.sign(payload, secret, expireTime);
}

const encryptPassword = function (password, salt) {
    return bcrypt.hash(password, salt);
}

const decryptPassword = function (hashPassword, originalPassword) {
    return bcrypt.compare(hashPassword,originalPassword);
}

module.exports = {
    tokenGeneration,
    encryptPassword,
    decryptPassword
}