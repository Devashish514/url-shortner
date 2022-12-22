const express = require("express");
const { setUrl, getUrl } = require("../control/urlShortner");
const router = express.Router();

const { createUser } = require("../control/user.controller");
const { cache } = require("../middlewares/cache.middleware");

router.post("/createUser", createUser);
router.post("/setUrl", setUrl);
router.get("/getUrl/:urlCode", cache, getUrl);

module.exports = router;