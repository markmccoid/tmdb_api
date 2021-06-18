/**
 * Since all Raw TMDB Api calls return the same shape object
 * this function wraps that functionality, so a raw API calls
 * just needs the URL to be passed here.
 *
 * @memberof axios
 * @param {string} apiCall
 * @returns {promise}
 */
export function callTMDB(apiCall: string): Promise<any>;
/**
 * Since all Raw TMDB Api calls return the same shape object
 * this function wraps that functionality.
 * This call is enhanced by already have the Base URL and the API_KEY
 * embedded in the call.
 * You will just need to send the "apiCall", meaning the rest of the URL
 * path ('/search/tv')...
 * And the config object passing any parameters that you want included. Most likely you will
 * send and object with the params property:
 * {
 *  params: {
 *    page: 2,
 *    query: "watchment"
 *  }
 * }
 *
 * The params will be encoded for you via the axios module.
 *
 * @memberof axios
 * @param {string} apiCall - the URL of the call to the TMDB api.  This does NOT include the Base URL
 * @param {string} config
 * @returns {promise}
 */
export function apiTMDB(apiCall: string, config?: string): Promise<any>;
