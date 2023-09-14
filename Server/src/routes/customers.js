const express = require('express');
let router = express.Router();

const signUpMiddleware = require("../middlewares/customers/signUp.middleware")
const signUpController = require("../controllers/customers/signUp.controller")

router.post("/signUp",signUpMiddleware ,signUpController )

module.exports = router