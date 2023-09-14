/**
 * @module
 * @description return 500 status code
 * @param {object}res
 */
module.exports = (res) => {
    res.status(500)
        .send({
            type: "server error",
            message: "internal server error",
            detail: "please try again later"
        })
        .end()
}