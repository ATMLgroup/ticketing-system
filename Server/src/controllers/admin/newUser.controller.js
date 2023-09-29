const argon2 = require("argon2")
const insertCustomer = require("../../models/insertIntoCustomersTable")
const successResponse = require("../../response/success")
const badRequest = require("../../response/badRequest")
const serverError = require("../../response/serverError")

module.exports = async (request, response) => {
    try {
        const {firstName, lastName, email, password, phoneNumber} = request.body
        const hashedPassword = await argon2.hash(password)
        const databaseStatus = await insertCustomer(firstName, lastName, email, hashedPassword, phoneNumber)
        if (databaseStatus.status) {
            successResponse(response, "signup successfully")
        } else {
            badRequest(response, "error in signUp", databaseStatus.message)
        }
    } catch (err){
        console.log(err)
        serverError(response)
    }
}