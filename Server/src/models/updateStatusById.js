const prismaClient = require("./prismaClient")

/**
 * @module
 * @description update open status in Ticket table where id === id
 * @param {String}id
 * @param {String}status Open & Pending & Close
 * @returns {Promise<{items: *[], status: boolean}>}
 */
module.exports = async (id, status) => {
    let response = {
        status: true,
        items: []
    }
    try {
        response.items = await prismaClient.tickets.update({
            where: {
                id: Number(id)
            },
            data: {
                status: status
            }
        })
    } catch (err) {
        console.log(err)
        response.status = false
    }
    return response
}