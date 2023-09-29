const argon2 = require("argon2")
const selectByEmail = require("../../models/selectByEmailInAdminsTable")
const successResponse = require("../../response/success")
const badRequestResponse = require("../../response/badRequest")
const serverErrorResponse = require("../../response/serverError")
const createToken = require("../../service/jsonWebToken/createToken")

module.exports = async (request, response) => {
    try {
        const {email, password} = request.body
        const databaseResponse = await selectByEmail(email)
        const hashedPassword = databaseResponse.items?.password || undefined
        if (databaseResponse.status && hashedPassword) {
            const comparePassword = await argon2.verify(hashedPassword, password)
            if (comparePassword) {
                const token = await createToken(email, databaseResponse.items.id)
                if (token.status) {
                    successResponse(response, {token: token.token})
                } else {
                    throw new Error("internal server error")
                }
            } else {
                badRequestResponse(response, "error", "password mismatch")
            }
        } else {
            badRequestResponse(response, "error", "There is no email")
        }
    } catch (err) {
        console.log(err)
        serverErrorResponse(response)
    }
}