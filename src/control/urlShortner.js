const { v4: uuidv4 } = require("uuid");
const { Url } = require("../model/url.model");
const { shortId, cacheExpTime } = require("../services/url.services");
const { urlValidation } = require("../services/validation");
const { statusCodes, shortIdUtils, successMessages, redisUtils, errMessages } = require("../utils/utility");
const redisClient = require("../database/redis.index");
const { Sequelize } = require("sequelize");


const setUrl = async function (req, res) {
    try {
        let data = req.body;
        const { id } = req.params;
        if (req.validateUser !== id) {
            return res.status(statusCodes[401].value).send({ msg: statusCodes[401].message });
        }
        const { error } = urlValidation(data);
        if (error) return res.status(statusCodes[400].value).send({ msg: error.details[0].message });
        data.urlCode = shortId(shortIdUtils.shortIdLength);
        data.shortUrl = shortIdUtils.baseUrl + "/" + data.urlCode;
        data.uuid = uuidv4();
        const checkUnique = await Url.findAll({ where: Sequelize.and({ longUrl: data.longUrl }, { shortUrl: data.shortUrl }) });
        if (checkUnique.length !== 0) {
            return res.status(statusCodes[403].value).send({ status: statusCodes[403].message, msg: errMessages.wentWrong });
        }
        await redisClient.setEx(data.shortUrl, cacheExpTime(redisUtils.expirationTime), data.longUrl);
        const saveData = await Url.create(data);
        return res.status(statusCodes[201].value).send({ msg: statusCodes[201].message, data: saveData });
    } catch (err) {
        console.error(err);
        return res.status(statusCodes[500].value).send({ msg: err.message });
    }
}

const getUrl = async (req, res) => {
    try {
        const { id, urlCode } = req.params;
        console.log(req.validateUser)
        if (req.validateUser !== id) {
            return res.status(statusCodes[401].value).send({ msg: statusCodes[401].message });
        }
        let shortUrl = shortIdUtils.baseUrl + "/" + urlCode;
        const findUrl = await Url.findOne({ where: { shortUrl } });
        if (findUrl) {
            await redisClient.setEx(shortUrl, redisUtils.expirationTime, findUrl.longUrl);
            return res.status(statusCodes[200].value).send({ msg: "coming from DB/cache Miss", data: findUrl });
        } else {
            return res.status(statusCodes[404].value).send({ msg: statusCodes[404].message });
        }
    } catch (err) {
        console.error(err);
        return res.status(statusCodes[500].value).send({ msg: err.message });
    }
}


module.exports = { setUrl, getUrl };