const prismaClient = require("./prismaClient")

/**
 * @module
 * @description select Customers table where email === email
 * @param {String}email
 * @returns {Promise<{items: *[], status: boolean}>}
 */
module.exports = async (email) => {
    let response = {
        status: true,
        items: []
    }
    try {
        response.items = await prismaClient.customers.findFirst({where: {email: email}})
    } catch (err) {
        console.log(err)
        response.status = false
    }
    return response
}