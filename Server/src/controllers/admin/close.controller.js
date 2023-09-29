const successResponse = require("../../response/success")
const badRequestResponse = require("../../response/badRequest")
const serverErrorResponse = require("../../response/serverError")
const updateStatusById = require("../../models/updateStatusById")

module.exports = async (request, response) => {
    try {
        const id = request.id
        const {ticket_id: ticketId} = request.query
        if (ticketId) {
            await updateStatusById(ticketId, "Close")
            successResponse(response, {message: "Close ticket successfully"})
        } else {
            badRequestResponse(response, "error in parameters", "enter ticket_id praram")
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