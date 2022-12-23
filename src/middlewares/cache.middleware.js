const redisClient = require("../database/redis.index");
const { incrementCachedTime } = require("../services/url.services");
const { shortIdUtils, statusCodes, redisUtils } = require("../utils/utility");

const cache = async (req, res, next) => {
    try {
        const { id, urlCode } = req.params;
        if (req.validateUser !== id) {
            return res.status(statusCodes[401].value).send({ msg: statusCodes[401].message });
        }
        let shortUrl = shortIdUtils.baseUrl + "/" + urlCode;
        const cachedData = await redisClient.get(shortUrl);
        if (cachedData !== null) {
            const timeLeftToExp = await redisClient.TTL(shortUrl);
            if (timeLeftToExp > 0) {   //refresh caching solution
                var incrementTime = timeLeftToExp + incrementCachedTime(redisUtils.incrementTime);
            };
            await redisClient.EXPIRE(shortUrl, incrementTime);
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