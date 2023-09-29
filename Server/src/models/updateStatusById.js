const prismaClient = require("./prismaClient")

/**
 * @module
 * @description update open status in Ticket table where id === id
 * @param {Number}id
 * @returns {Promise<{items: *[], status: boolean}>}
 */
module.exports = async (id) => {
    let response = {
        status: true,
        items: []
    }
    try {
        response.items = await prismaClient.tickets.update({
            where: {
                id: id
            },
            data: {
                status: "Open"
            }
        })
    } catch (err) {
        console.log(err)
        response.status = false
    }
    return response
}