const prismaClient = require("./prismaClient")

/**
 * @module
 * @description insert into Tickets table
 * @param {Number}customerId
 * @param {String}title
 * @param {String}priority
 * @param {String}description
 * @returns {Promise<{message: string, status: boolean}>}
 */
module.exports = async (customerId, title, priority, description) => {
    let response = {
        status: true,
        message: ""
    }
    console.log(customerId, title, priority, description)
    try {
        await prismaClient.tickets.create({
            data: {
                customersId: customerId,
                title: title,
                priority: priority,
                description: description
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