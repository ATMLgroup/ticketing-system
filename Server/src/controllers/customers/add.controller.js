const successResponse = require("../../response/success")
const badRequestResponse = require("../../response/badRequest")
const serverErrorResponse = require("../../response/serverError")
const insertIntoTicketTable = require("../../models/insertIntoTicketsTable")
const insertIntoChatsTable = require("../../models/insertIntoChatsTable")

module.exports = async (request, response) => {
    try {
        const {title, description, priority} = request.body
        const id = request.id

        const {status, message} = await insertData(id, title, priority, description)

        if (status) {
            successResponse(response, {message: "add ticket successfully"})
        } else {
            badRequestResponse(response, "error in add ticket", message)
        }
    } catch (error) {
        console.log(error)
        serverErrorResponse(response)
    }
}

/**
 * @function
 * @description Sending requests to databases and checking the received outputs
 * @param {Number}id
 * @param {String}title
 * @param {String}priority
 * @param {String}description
 * @returns {Promise<{message: string, status: boolean}>}
 */
async function insertData(id, title, priority, description) {
    const response = {
        status: true,
        message: ""
    }

    const insertTicketTableResponse = await insertIntoTicketTable(id, title, priority)

    if (insertTicketTableResponse.status) {

        const insertChatTableResponse =
            await insertIntoChatsTable(insertTicketTableResponse.item.id, description, "user")

        if (!insertChatTableResponse.status) {
            response.message = insertChatTableResponse.message
        }

    } else {
        response.message = insertTicketTableResponse.message
    }

    return response
}