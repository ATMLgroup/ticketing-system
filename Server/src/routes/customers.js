const express = require('express');
let router = express.Router();

const signUpMiddleware = require("../middlewares/customers/signUp.middleware")
const signInMiddleware = require("../middlewares/customers/signIn.middleware")
const signUpController = require("../controllers/customers/signUp.controller")
const signInController = require("../controllers/customers/signIn.controller")

router.post("/signUp", signUpMiddleware, signUpController)
router.post("/signIn", signInMiddleware, signInController)

module.exports = router