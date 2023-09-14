const express = require("express");
const app = express()

app.use("/api/customers", require("./src/routes/customers"))

module.exports = app