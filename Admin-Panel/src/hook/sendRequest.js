import axios from "axios"
const Cookies = require("js-cookie");
const {url} = require("../config/server")

/**
 * @module
 * @description
 * @param {string}path
 * @param {string}method
 * @param {object}body
 * @return {Promise<{data: *[], error: *[]}>}
 */
export default async (path, method, body) => {
    const config = {
        url: path,
        method: method,
        baseURL: url + "/api",
        data: body,
        headers: {"authorization": Cookies.get("token")}
    }
    let response = {
        data: [],
        error: [],
    }
    try {
        const fetch = await axios(config)
        response.data = fetch.data
    } catch (error) {
        response.error = error
    }
    return response
};