const prismaClient = require("./prismaClient")

/**
 * @module
 * @description insert into Customers table
 * @param {String}firstName
 * @param {String}lastName
 * @param {String}email
 * @param {String}password
 * @param {String}phoneNumber
 * @returns {Promise<{message: string, status: boolean}>}
 */
module.exports = async (firstName, lastName, email, password, phoneNumber) => {
    let response = {
        status: true,
        message:""
    }
    try {
        await prismaClient.customers.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phoneNumber: phoneNumber
            }
        })
    } catch (err) {
        response.status = false
        if(err.code === "P2002") {
            response.message = "Email is already exist"
        } else {
            response.message = "Unknown error"
        }
    }
    return response
}