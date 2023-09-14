/**
 * @module
 * @description return 400 status code
 * @param {object}res
 * @param {string}message
 * @param {string}detail
 */
module.exports = (res, message, detail) => {
    res.status(400)
        .send({
            type: "bad-request",
            message: message,
            detail: detail
        })
        .end()
}