import sendRequest from "./sendRequest";

/**
 * @module
 * @description send request to server and get items
 * @return {Promise<any>}
 * @constructor
 */
export default async () => {
    try {
        const {data, error} = await sendRequest("admin/tickets", "GET", {})

        if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length !== 0) {
            return data
        } else {
            throw new Error(error)
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};