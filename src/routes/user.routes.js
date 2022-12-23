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
 * /api/v1/createUser?key=email:
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
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - phone
 *             properties:    
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type:string
 *               password:
 *                 type:string
 *               phone:
 *                 type:string
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


/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: login API
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "deva@gmail.com"
 *               password: "Password@123"
 
 *     responses:
 *       "200":
 *         description: Verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *              
 *       
 */


/**
 * @swagger
 * /api/v1//setUrl/:id:
 *   post:
 *     summary: upload longurl
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - longUrl
 *             properties:
 *               longUrl:
 *                 type: string
 *             example:
 *               longUrl: "https://amazonprimevideos/movies=jack/uuid=lkjh-ijsnss"
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

/**
 * @swagger
 * /api/v1//getUrl/:id/:urlCode:
 *   get:
 *     summary: get Short Url
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - urlCode
 
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *              
 *       
 */