const prismaClient = require("./prismaClient")

/**
 * @module
 * @description insert into Tickets table
 * @param {Number}customerId
 * @param {String}title
 * @param {String}priority
 * @returns {Promise<{message: string, status: boolean,item: object}>}
 */
module.exports = async (customerId, title, priority) => {
    let response = {
        status: true,
        item: {},
        message: ""
    }

    try {
        response.item = await prismaClient.tickets.create({
            data: {
                customerId: customerId,
                title: title,
                priority: priority,
                status: "Pending"
            }
        })
    } catch (err) {
        response.status = false
        console.log(err)
        if (err.code === "P2002") {
            response.message = "Email is already exist"
        } else {
            response.message = "Unknown error"
        }
    }
    return response
}