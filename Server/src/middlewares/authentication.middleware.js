const unauthorizedResponse = require("../response/unauthorized")
const verifyToken = require("../service/jsonWebToken/verifyToken")

module.exports = async (request, response, next) => {
    const {authorization} = request.headers
    if (authorization) {
        const {email, id, status} = await verifyToken(authorization)
        if (status) {
            request.email = email
            request.id = id
            next()
        } else {
            unauthorizedResponse(response)
        }
    } else {
        unauthorizedResponse(response)
    }
}