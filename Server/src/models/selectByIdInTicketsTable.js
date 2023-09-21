const prismaClient = require("./prismaClient")

/**
 * @module
 * @description select Customers table where email === email
 * @param {Number}customerId
 * @param {Number}ticketId
 * @returns {Promise<{items: *[], status: boolean}>}
 */
module.exports = async (customerId, ticketId) => {
    let response = {
        status: true,
        items: []
    }
    let where = {customerId: customerId}

    if (ticketId) {
        where = {id: Number(ticketId)}
    }

    try {
        response.items = await prismaClient.tickets.findMany({where: where})
    } catch (err) {
        console.log(err)
        response.status = false
    }
    return response
}