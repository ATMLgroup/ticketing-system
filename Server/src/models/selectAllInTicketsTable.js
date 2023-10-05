const prismaClient = require("./prismaClient")

/**
 * @module
 * @description select Customers table where email === email
 * @param {Number}ticketId
 * @returns {Promise<{items: *[], status: boolean}>}
 */
module.exports = async (ticketId) => {
    let response = {
        status: true,
        items: []
    }
    let include = {}
    let where = {}

    if (ticketId) {
        where = {id: Number(ticketId)}
        include = {
            Chats: {
                select: {
                    id: true,
                    createdAt: true,
                    content: true,
                },
            },
        }
    }

    try {
        response.items = await prismaClient.tickets.findMany({where: where, include})
    } catch (err) {
        console.log(err)
        response.status = false
    }
    return response
}