const prismaClient = require("./prismaClient")

/**
 * @module
 * @description update Customers table where email === email
 * @param {String}email
 * @param {String}password
 * @returns {Promise<{items: *[], status: boolean}>}
 */
module.exports = async (email, password) => {
    let response = {
        status: true,
        items: []
    }
    try {
        response.items = await prismaClient.customers.update({
            where: {
                email: email
            },
            data: {
                password: password
            }
        })
    } catch (err) {
        console.log(err)
        response.status = false
    }
    return response
}