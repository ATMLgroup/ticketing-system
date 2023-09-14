const argon2 = require("argon2")
const selectByEmail = require("../../models/selectByEmailInCustomerTable")
const successResponse = require("../../response/success")
const badRequestResponse = require("../../response/badRequest")
const serverErrorResponse = require("../../response/serverError")
const createToken = require("../../service/jsonWebToken/createToken")

module.exports = async (request, response) => {
    try {
        const {email, password} = request.body
        const databaseResponse = await selectByEmail(email)
        if (databaseResponse.status) {
            const hashedPassword = databaseResponse.items.password
            const comparePassword = await argon2.verify(hashedPassword, password)
            if (comparePassword) {
                const token = await createToken(email)
                if (token.status) {
                    successResponse(response, {token: token.token})
                } else {
                    throw new Error("internal server error")
                }
            } else {
                badRequestResponse(response, "error", "password mismatch")
            }
        } else {
            throw new Error("database error")
        }
    } catch (err) {
        console.log(err)
        serverErrorResponse(response)
    }
}