const redisClient = require("../database/redis.index");
const { incrementCachedTime } = require("../services/url.services");
const { shortIdUtils, statusCodes } = require("../utils/utility");

const cache = async (req, res, next) => {
    try {
        const { urlCode } = req.params;
        let shortUrl = shortIdUtils.baseUrl + "/" + urlCode;
        const cachedData = await redisClient.get(shortUrl);
        if (cachedData !== null) {
            // const timeLeftToExp = await redisClient.TTL(shortUrl);
            // let dateIncre = incrementCachedTime(timeLeftToExp,7);
            // await redisClient.EXPIREAT(shortUrl,dateIncre,"XX");
            return res.status(statusCodes[200].value).send({ msg: "coming from cache", data: cachedData });
        } else {
            next();
        }
    } catch (err) {
        console.error(err);
        return res.status(statusCodes[500].value).send({ msg: err.message });
    }
}

module.exports = { cache };