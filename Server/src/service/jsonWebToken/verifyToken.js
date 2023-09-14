const jwt = require('jsonwebtoken');
const {readFileSync} = require("fs")
const {join} = require("path")

/**
 * @module
 * @description This module is responsible for verifying token
 * @param {String}token return token for authentication
 * @returns {{status: boolean, token: string}}
 */
module.exports = async (token) => {

    let response = {
        status: true,
        response: ""
    }

    try {
        const publicKey = readFileSync(join('cert', 'jwt', 'rsa.public.key'), 'utf8')
        return jwt.verify(token, publicKey, { algorithm: 'RS256'});
    } catch (err) {
        console.log(err)
        response.status = false
    }
    return response
}