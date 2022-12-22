const jwt = require("jsonwebtoken");
const { statusCodes, jwtUtils } = require("../utils/utility");

const auth = async function (req, res, next) {
    try {
        let token = req.header("Authorization", "Bearer Token");
        if (!token) {
            return res.status(statusCodes[404].value).send({ status: statusCodes[404].message, message: "Set token" });
        }
        let tokenData = token.split(" ");
        let verifyToken = jwt.verify(tokenData[1], jwtUtils.secretKey);
        if (!verifyToken) {
            return res.status(statusCodes[401].value).send({ status: statusCodes[401].message });
        } else {
            if (Date.now() > (verifyToken.exp) * 1000) {
                return res.status(statusCodes[401].value).send({ status: statusCodes[401].message, message: `Session Expired, please login again` });
            } else {
                req.validateUser = verifyToken.id;
                next();
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(statusCodes[500].value).send({ status: statusCodes[500].message, message: err.message });
    }

}
module.exports = { auth };