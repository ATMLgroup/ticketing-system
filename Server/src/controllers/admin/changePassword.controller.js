const argon = require("argon2")
const serverErrorResponse = require("../../response/serverError")
const badRequestResponse = require("../../response/badRequest")
const successResponse = require("../../response/success")
const selectByEmail = require("../../models/selectByEmailInAdminsTable")
const updatePasswordByEmail = require("../../models/updatePasswordByEmailInAdminsTable")

module.exports = async (request, response) => {
    try {
        const {currentPassword, newPassword} = request.body
        const email = request.email
        const check = await checkCurrentPassword(email, currentPassword)
        if (check) {
            await updateCustomerPassword(email, newPassword)
            successResponse(response, {message: "Password successfully updated"})
        } else {
            badRequestResponse(response, "error", "The current password is wrong")
        }
    } catch (err) {
        console.log(err)
        serverErrorResponse(response)
    }
}

/**
 * @function
 * @description This function checks that the current password is entered correctly
 * @param {String}email
 * @param {String}currentPassword
 * @returns {Promise<boolean>}
 */
const checkCurrentPassword = async (email, currentPassword) => {
    try {
        const {items} = await selectByEmail(email)
        return argon.verify(items.password, currentPassword)
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