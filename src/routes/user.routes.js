const express = require("express");
const { setUrl, getUrl } = require("../control/urlShortner");
const router = express.Router();

const { createUser, login } = require("../control/user.controller");
const { auth } = require("../middlewares/auth.middleware");
const { cache } = require("../middlewares/cache.middleware");

router.post("/createUser", createUser);
router.post("/login", login);
router.post("/setUrl/:id", auth, setUrl);
router.get("/getUrl/:id/:urlCode", auth, cache, getUrl);

module.exports = router;



/**
 * @swagger
 * /createUser?key=email:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName,
 *               - lastName,
 *               - email
 *               - password
 *               - phone
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *              
 *       
 */