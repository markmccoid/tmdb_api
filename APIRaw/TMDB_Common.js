import axios from "axios";
import { buildRawError } from "../helpers";
import { getTMDBConsts } from "../index";

/**
 * Raw API calls to the tmdb api end points that are **COMMON across TV and Movies**.
 *
 * These calls all reference their raw counterparts, but only return selected data points.
 * Also, things like dates are converted to javascript date formats and image data are
 * converted to URL strings.
 * @namespace Raw_API_Common
 *
 */

/**
 * Searches for person and returns results
 *
 * @memberOf Raw_API_Common
 * @param {string} personName - Name of person to search for
 * @param {number} [page=1] - page number to return
 * @returns {object} response object
 * On success { data: data from api call, apiCall: API call}
 *
 * On error throws {@link ErrorObj}
 */
function rawSearchForPerson(personName, page = 1) {
  let { API_KEY, API_URL } = getTMDBConsts();
  let apiCall = `${API_URL}/search/person?include_adult=false&api_key=${API_KEY}&page=${page}&query=${personName}`;
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
 * Returns Person Details from TMDb.
 * Details of the person, not the show or movies they are in.
 *
 * TMDB Developer API Docs - {@link https://developers.themoviedb.org/3/credits/get-credit-details}
 * @memberOf Raw_API_Common
 * @param {string} personId - TMDb show id
 * @returns {object} response object {data, msg}
 *
 * On success { data: data from api call, apiCall: API call}
 *
 * On error throws {@link ErrorObj}
 */
function rawGetPersonDetails(personId) {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/person/${personId}?api_key=${API_KEY}`;
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
 * Returns images for passed PersonId from TMDb.
 *
 * TMDB Developer API Docs - {@link https://developers.themoviedb.org/3/people/get-person-images}
 * @memberOf Raw_API_Common
 * @param {string} personId - TMDb show id
 * @returns {object} response object
 * On success { data: data from api call, apiCall: API call}
 *
 * On error throws {@link ErrorObj}
 */
function rawGetPersonImages(personId) {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/person/${personId}/images?api_key=${API_KEY}`;
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
 * Returns a Person's combined credits from TMDb.
 * These will be credits from TV and Movies.  If you only want TV {@see rawTVGetPersonCredits}
 *
 * TMDB Developer API Docs - {@link https://developers.themoviedb.org/3/people/get-person-combined-credits}
 * @memberOf Raw_API_Common
 * @param {string} personId - TMDb show id
 * @returns {object} response object
 * On success { data: data from api call, apiCall: API call}
 *
 * On error {@link ErrorObj}
 */
function rawGetPersonCombinedCredits(personId) {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/person/${personId}/combined_credits?api_key=${API_KEY}`;
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

export {
  rawSearchForPerson,
  rawGetPersonDetails,
  rawGetPersonImages,
  rawGetPersonCombinedCredits
};
