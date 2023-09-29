const argon2 = require("argon2")
const insertAdmin = require("../../models/insertIntoAdminsTable")
const successResponse = require("../../response/success")
const badRequest = require("../../response/badRequest")
const serverError = require("../../response/serverError")

module.exports = async (request, response) => {
    try {
        const {firstName, lastName, email, password} = request.body
        const hashedPassword = await argon2.hash(password)
        const databaseStatus = await insertAdmin(firstName, lastName, email, hashedPassword)
        if (databaseStatus.status) {
            successResponse(response, "signup successfully")
        } else {
            badRequest(response, "error in signUp", databaseStatus.message)
        }
    } catch (err) {
        console.log(err)
        serverError(response)
    }
}