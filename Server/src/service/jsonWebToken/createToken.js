const jwt = require('jsonwebtoken');
const {readFileSync} = require("fs")
const {join} = require("path")

/**
 * @module
 * @description This module is responsible for creating authentication token
 * @param {String}email return email for create token
 * @returns {{status: boolean, token: string}}
 */
module.exports = async (email) => {

    let response = {
        status: true,
        token: ""
    }

    try {
        const privateKey = readFileSync(join('cert', 'jwt', 'rsa.key'), 'utf8')
        response.token = await jwt.sign({email}, privateKey, {algorithm: 'RS256'});
    } catch (err) {
        console.log(err)
        response.status = false
    }
    return response
}