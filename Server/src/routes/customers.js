const express = require('express');
let router = express.Router();

const authenticationMiddleware = require("../middlewares/authentication.middleware")
const signUpMiddleware = require("../middlewares/customers/signUp.middleware")
const signInMiddleware = require("../middlewares/customers/signIn.middleware")
const changePasswordMiddleware = require("../middlewares/customers/changePassowrd.middleware")
const addMiddleware = require("../middlewares/customers/add.middleware")

const signUpController = require("../controllers/customers/signUp.controller")
const signInController = require("../controllers/customers/signIn.controller")
const changePasswordController = require("../controllers/customers/changePassword.controller")
const addController = require("../controllers/customers/add.controller")

router.post("/signup", signUpMiddleware, signUpController)
router.post("/signin", signInMiddleware, signInController)
router.use(authenticationMiddleware)
router.post("/change_password", changePasswordMiddleware, changePasswordController)
router.post("/add", addMiddleware, addController)

module.exports = router