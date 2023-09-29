const express = require("express");
const app = express()

app.use("/api/customers", require("./src/routes/customers"))
app.use("/api/admin", require("./src/routes/admin"))

module.exports = app