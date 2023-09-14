/**
 * @module
 * @description return 400 status code
 * @param {Object}res
 * @param {String}detail
 */
module.exports = (res, detail) => {
    res.status(400)
        .send({
            type: "validation",
            message: "Error in data entry",
            detail: detail
        })
        .end()
}