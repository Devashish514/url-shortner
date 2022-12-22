const { v4: uuidv4 } = require("uuid");
const { Url } = require("../model/url.model");
const { shortId, cacheExpTime } = require("../services/url.services");
const { urlValidation } = require("../services/validation");
const { statusCodes, shortIdUtils, successMessages, redisUtils } = require("../utils/utility");
const redisClient = require("../database/redis.index");


const setUrl = async function (req, res) {
    try {
        let data = req.body;
        const { error } = urlValidation(data);
        if (error) return res.status(statusCodes[400].value).send({ msg: error.details[0].message });
        data.urlCode = shortId(shortIdUtils.shortIdLength);
        data.shortUrl = shortIdUtils.baseUrl + "/" + data.urlCode;
        data.uuid = uuidv4();
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
        const { urlCode } = req.params;
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