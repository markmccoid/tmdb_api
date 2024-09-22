/**
 * Helper functions
 *
 * @namespace axios
 *
 */
import axios from "axios";
import { tmdbConfig } from "./config";
// import { getTMDBConsts } from "./index";

/**
 * @typeDef {Object} ErrorObj
 * @property {Object} error the error object thrown from original error. Assuming from axios
 * @property {string} status err.response.request.status
 * @property {string} status err.response.request.statusText
 * @property {string} status err.response.request.responseURL
 */
/**
 * When passed an error object, function will return a standardized error
 * object that can be thrown.
 * This is for the raw TMDB API calls.
 *
 * @memberof axios
 * @param {*} err - error object from an TMDB API Call
 * @returns {ErrorObj} - formatted error object
 * { error,
 *   status,
 *   statusText,
 *   apiCall
 *  }
 */
function buildRawError(err) {
  return {
    error: err,
    status: err.response ? err.response.request.status : null,
    statusText: err.response ? err.response.request.statusText : null,
    apiCall: err.response ? err.response.request.responseURL : err.config ? err.config.url : null,
  };
}

/**
 * Since all Raw TMDB Api calls return the same shape object
 * this function wraps that functionality, so a raw API calls
 * just needs the URL to be passed here.
 *
 * @memberof axios
 * @param {string} apiCall
 * @returns {promise}
 */
function callTMDB(apiCall) {
  return axios
    .get(apiCall)
    .then((resp) => {
      return {
        data: resp.data,
        apiCall: resp.request.responseURL,
      };
    })
    .catch((err) => {
      let errorObj = buildRawError(err);
      throw errorObj;
    });
}

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
function apiTMDB(apiCall, config = {}) {
  const { API_KEY, API_URL, API_OPTIONS } = tmdbConfig.getConfig();
  const {
    defaultAPIParams: { include_adult },
  } = API_OPTIONS;

  // set the baseURL
  config = { ...config, baseURL: API_URL };
  // Pull out the params if passed in config object, if any
  const params = config.params || {};
  // merge api_key into params object passed if it exists
  config.params = { ...params, include_adult: !!include_adult, api_key: API_KEY };
  // actual API call
  return axios
    .get(apiCall, config)
    .then((resp) => {
      return {
        data: resp.data,
        apiCall: resp.request.responseURL,
      };
    })
    .catch((err) => {
      let errorObj = buildRawError(err);
      throw errorObj;
    });
}

export { callTMDB, apiTMDB };
