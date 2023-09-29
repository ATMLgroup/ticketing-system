const argon = require("argon2")
const serverErrorResponse = require("../../response/serverError")
const badRequestResponse = require("../../response/badRequest")
const successResponse = require("../../response/success")
const selectByEmail = require("../../models/selectByEmailInCustomerTable")
const updatePasswordByEmail = require("../../models/updatePasswordByEmailInCustomerTable")

module.exports = async (request, response) => {
    try {
        const {newPassword, email} = request.body
        const check = await checkExistsUser(email)
        if (check) {
            await updateCustomerPassword(email, newPassword)
            successResponse(response, {message: "Password successfully updated"})
        } else {
            badRequestResponse(response, "error", "The user is not exists")
        }
    } catch (err) {
        console.log(err)
        serverErrorResponse(response)
    }
}

/**
 * @function
 * @description This function checks that the user is exists
 * @param {String}email
 * @returns {Promise<boolean>}
 */
const checkExistsUser = async (email) => {
    try {
        const {items} = await selectByEmail(email)
        return !!items.password;
    } catch (err) {
        console.log(err)
    }
}

/**
 * @function
 * @description This function is responsible for updating the password
 * @param {String}email
 * @param {String}newPassword
 * @returns {Promise<boolean>}
 */
const updateCustomerPassword = async (email, newPassword) => {
    try {
        const hashedNewPassword = await argon.hash(newPassword)
        const {status} = await updatePasswordByEmail(email, hashedNewPassword)
        if (status) {
            return true
        } else {
            throw new Error("database error")
        }
    } catch (err) {
        console.log(err)
    }
}