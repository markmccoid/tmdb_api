/**
 * Helper functions
 *
 * @namespace axios
 *
 */
import axios from "axios";
import { getTMDBConsts } from "./index";

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
    .then(resp => {
      return {
        data: resp.data,
        apiCall: resp.request.responseURL
      };
    })
    .catch(err => {
      let errorObj = buildRawError(err);
      throw errorObj;
    });
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
function apiTMDBtv(apiCall, config = {}) {
  const { API_URL, API_KEY } = getTMDBConsts();
  const params = config.params || {};
  //merge api_key into params object if it exists
  config.params = { ...params, api_key: API_KEY };
  return axios
    .get(apiCall, config)
    .then(resp => {
      return {
        data: resp.data,
        apiCall: resp.request.responseURL
      };
    })
    .catch(err => {
      let errorObj = buildRawError(err);
      throw errorObj;
    });
}

export { callTMDB, apiTMDBtv };
