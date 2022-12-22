const { User } = require('../model/user.model');
const { statusCodes, jwtUtils, errMessages, successMessages, queryParams, bcryptSaltRound } = require('../utils/utility');
const { registerValidation, updateUserValidation } = require('../services/validation');
const { v4: uuidv4 } = require("uuid");
const { encryptPassword, tokenGeneration } = require('../services/userService');
const { Sequelize } = require('sequelize');

const createUser = async (req, res) => {
    try {
        const identify = req.query;
        if (identify.key === queryParams.emailLogin) {
            const { error } = registerValidation(req.body);
            if (error) return res.status(statusCodes[400].value).send({ msg: error.details[0].message });
            const data = req.body;
            const alreadyExists = await User.findOne({ where: Sequelize.or({ email: data.email }, { phone: data.phone }) });
            if (alreadyExists) {
                return res.status(statusCodes[401].value).send({ msg: errMessages.unique });
            }
            data.password = await encryptPassword(data.password,bcryptSaltRound.saltRound);
            data.uuid = uuidv4();
            const savedUser = await User.create(data);
            if(savedUser){
                var tokenData = tokenGeneration({id:savedUser.uuid},jwtUtils.secretKey,jwtUtils.expireTime);
            }
            return res.status(statusCodes[201].value).send({ msg: successMessages.registered,jwt:tokenData, data: savedUser});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: statusCodes[500].message, msg: error.message });
    }
}

module.exports = {
    createUser
}