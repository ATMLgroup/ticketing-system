/**
 * @module
 * @description return 200 status code
 * @param {Object}res
 * @param {Object}data
 */
module.exports = (res, data) => {
    res.status(200)
        .send({
            type: "success",
            data: data
        })
        .end()
}