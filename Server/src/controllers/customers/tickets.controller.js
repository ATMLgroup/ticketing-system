const successResponse = require("../../response/success")
const badRequestResponse = require("../../response/badRequest")
const serverErrorResponse = require("../../response/serverError")
const selectByIdInTicketsTable = require("../../models/selectByIdInTicketsTable")

module.exports = async (request, response) => {
    try {
        const id = request.id
        const {ticket_id: ticketId} = request.query
        const {status, items} = await selectByIdInTicketsTable(id, ticketId || undefined)
        if (status) {
            successResponse(response, cleanObject(items))
        } else {
            badRequestResponse(response, "error", "error in database. please try again later")
        }
    } catch (error) {
        console.log(error)
        serverErrorResponse(response)
    }
}

/**
 * @function
 * @description It is responsible for deleting the customersId key
 * @param {Object}object
 * @returns {*}
 */
function cleanObject(object) {
    for (const key in object) {
        delete object[key].customerId
    }
    return object
}