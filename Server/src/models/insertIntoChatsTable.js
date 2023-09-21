const prismaClient = require("./prismaClient")

/**
 * @module
 * @description insert into Tickets table
 * @param {Number}ticketId
 * @param {String}content
 * @param {String}author
 * @returns {Promise<{message: string, status: boolean}>}
 */
module.exports = async (ticketId, content, author) => {
    let response = {
        status: true,
        message: ""
    }

    try {
        let customContent = JSON.stringify({content: content, author: author})
        await prismaClient.chats.create({
            data: {
                content: customContent,
                ticketId: ticketId
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