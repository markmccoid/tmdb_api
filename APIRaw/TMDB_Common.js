import axios from "axios";
import { getTMDBConsts } from "../index";

/**
 * Searches for person and returns results
 * @param {string} personName - Name of person to search for
 * @param {number} [page=1] - page number to return
 * @returns {object} response object
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const rawSearchForPerson = (personName, page = 1) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  let apiCall = `${API_URL}/search/person?include_adult=false&api_key=${API_KEY}&page=${page}&query=${personName}`;
  return axios.get(apiCall).then(resp => {
    return {
      data: resp.data,
      apiCall: resp.request.responseURL
    };
  });
};
