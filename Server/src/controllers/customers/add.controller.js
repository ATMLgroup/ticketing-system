const successResponse = require("../../response/success")
const badRequestResponse = require("../../response/badRequest")
const serverErrorResponse = require("../../response/serverError")
const insertIntoTicketTable = require("../../models/insertIntoTicketsTable")

module.exports = async (request, response) => {
    try {
        const {title, description, priority} = request.body
        const email = request.email
        const id = request.id
        const {status, message} = await insertIntoTicketTable(id, title, priority, description)
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