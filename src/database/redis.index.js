require("dotenv").config();
const redis = require("redis");

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    
});

// const redisClient = redis.createClient(REDIS_PORT);

(async () => {
    await redisClient.connect()
})();

redisClient.on("connect", () => console.log(`Redis Connected`));
redisClient.on("error", (err) => console.error(err));

module.exports = redisClient;