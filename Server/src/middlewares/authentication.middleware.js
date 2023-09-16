const unauthorizedResponse = require("../response/unauthorized")
const verifyToken = require("../service/jsonWebToken/verifyToken")

module.exports = async (request, response, next) => {
    const {authorization} = request.headers
    const {email, status} = await verifyToken(authorization)
    if (status) {
        request.email = email
        next()
    } else {
        unauthorizedResponse(response)
    }
}