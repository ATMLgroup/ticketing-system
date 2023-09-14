/**
 * @module
 * @description return 401 status code
 * @param {Object}res
 */
module.exports = (res) => {
    res.status(401)
        .send({
            type: "unauthorized",
            message: "error in authorization",
            detail: "please return token in authorization header"
        })
        .end()
}