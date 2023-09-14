const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const {PORT} = require("./config/server")
const routes = require("./routes")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(PORT, function () {
    console.log("Started listening on port " + PORT)
})

module.exports = app