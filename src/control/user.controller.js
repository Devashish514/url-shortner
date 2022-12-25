const { User } = require('../model/user.model');
const { statusCodes, jwtUtils, errMessages, successMessages, queryParams, bcryptSaltRound } = require('../utils/utility');
const { registerValidation, loginValidation } = require('../services/validation');
const { v4: uuidv4 } = require("uuid");
const { encryptPassword, tokenGeneration, decryptPassword } = require('../services/userService');
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
            data.password = await encryptPassword(data.password, bcryptSaltRound.saltRound);
            data.uuid = uuidv4();
            const savedUser = await User.create(data);
            if (savedUser) {
                var tokenData = tokenGeneration({ id: savedUser.uuid }, jwtUtils.secretKey, jwtUtils.expireTime);
            }
            return res.status(statusCodes[201].value).send({ msg: successMessages.registered, jwt: tokenData, data: savedUser });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: statusCodes[500].message, msg: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
        if (error) return res.status(statusCodes[400].value).send({ msg: error.details[0].message });
        let { email, password } = req.body;
        const authenticateUser = await User.findOne({ where: { email } });
        if (authenticateUser !== null) {
            if (!await decryptPassword(password, authenticateUser.password)) {
                return res.status(statusCodes[400].value).send({ status: statusCodes[400].message, msg: errMessages.incorrectPassword });
            } else {
                const tokenData = tokenGeneration({ id: authenticateUser.uuid }, jwtUtils.secretKey, jwtUtils.expireTime);
                return res.status(statusCodes[201].value).send({ msg: successMessages.login, jwt: tokenData, data: authenticateUser });
            }
        } else {
            return res.status(statusCodes[404].value).send({ status: statusCodes[404].message, msg: errMessages.userNotFound });
        }
    } catch (error) {
        console.error(error);
        return res.status(statusCodes[500].value).send({ msg: error.message });
    }
}

const getAllUsersList = async (req, res) => {
    const { identification } = req.query;
    if (identification !== process.env.Identify) {
        return res.status(statusCodes[401].value).send({ msg: statusCodes[401].message });
    } else {
        const allUsers = await User.findAll();
        return res.status(statusCodes[200].value).send({ status: statusCodes[200].message, data: allUsers });
    }
}

module.exports = {
    createUser,
    login,
    getAllUsersList
}