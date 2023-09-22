const successResponse = require("../../response/success")
const badRequestResponse = require("../../response/badRequest")
const serverErrorResponse = require("../../response/serverError")
const selectByIdInTicketsTable = require("../../models/selectByIdInTicketsTable")
const insertIntoChatsTable = require("../../models/insertIntoChatsTable")

module.exports = async (request, response) => {
    try {
        const id = request.id
        const {ticketId, content} = request.body

        const checkOwner = await checkTicketOwner(ticketId, id)

        if (checkOwner) {
            const {status, message} = await insertIntoChatsTable(ticketId, content, "user")

            if (status) {
                successResponse(response, {message: "add reply successfully"})
            } else {
                badRequestResponse(response, "error in add ticket", message)
            }
        } else {
            badRequestResponse(response, "permission denied", "you don't have permission to access this ticket")
        }
    } catch (error) {
        console.log(error)
        serverErrorResponse(response)
    }
}

/**
 * @function
 * @description It is responsible for checking this ticket is owned by the user
 * @param {Number}ticketId
 * @param {Number}customerId
 * @returns {Promise<boolean>}
 */
async function checkTicketOwner(ticketId, customerId) {
    const {items} = await selectByIdInTicketsTable(customerId, ticketId)
    return items.length !== 0
}