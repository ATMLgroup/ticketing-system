const prismaClient = require("./prismaClient")

/**
 * @module
 * @description insert into Admins table
 * @param {String}firstName
 * @param {String}lastName
 * @param {String}email
 * @param {String}password
 * @returns {Promise<{message: string, status: boolean}>}
 */
module.exports = async (firstName, lastName, email, password) => {
    let response = {
        status: true,
        message: ""
    }
    try {
        await prismaClient.admins.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
        })
    } catch (err) {
        response.status = false
        if (err.code === "P2002") {
            response.message = "Email is already exist"
        } else {
            response.message = "Unknown error"
        }
    }
    return response
}