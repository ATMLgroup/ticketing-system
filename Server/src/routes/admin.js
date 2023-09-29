const express = require('express');
let router = express.Router();

const signUpMiddleware = require("../middlewares/admin/signUp.middleware");
const signInMiddleware = require("../middlewares/admin/signIn.middleware");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const changePasswordMiddleware = require("../middlewares/admin/changePassowrd.middleware");

const signUpController = require("../controllers/admin/signUp.controller");
const signInController = require("../controllers/admin/signIn.controller");
const changePasswordController = require("../controllers/admin/changePassword.controller");

router.post("/signup", signUpMiddleware, signUpController)
router.post("/signin", signInMiddleware, signInController)
router.use(authenticationMiddleware)
router.post("/change_password", changePasswordMiddleware, changePasswordController)

module.exports = router;