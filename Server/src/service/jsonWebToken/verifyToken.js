const jwt = require('jsonwebtoken');
const {readFileSync} = require("fs")
const {join} = require("path")

/**
 * @module
 * @description This module is responsible for verifying token
 * @param {String}token return token for authentication
 * @returns {{status: boolean, email: string}}
 */
module.exports = async (token) => {

    let response = {
        status: true,
        email: ""
    }

    try {
        const publicKey = readFileSync(join('cert', 'jwt', 'rsa.public.key'), 'utf8')
        const data = await jwt.verify(token, publicKey, {algorithm: 'RS256'});
        response.email = data.email
    } catch (err) {
        console.log(err)
        response.status = false
    }
    return response
}