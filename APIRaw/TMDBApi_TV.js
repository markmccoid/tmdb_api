import { callTMDB } from "../helpers";
import { getTMDBConsts } from "../index";
// const API_KEY = '0e4935aa81b04539beb687d04ff414e3'//process.env.REACT_APP_TMDB_API_KEY;
// const API_URL = 'https://api.themoviedb.org/3';
/**
 * Raw API calls to the tmdb api end points for **TV Shows**.
 *
 * @namespace Raw_API_TV
 *
 */

/**
 * Returns data from search by searchString
 *
 * @memberOf Raw_API_TV
 * @param {string} searchString - String of title to search for
 * @param {number} [page=1] - page number to return if multiple pages from search
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVSearchByTitle(searchString, page = 1) {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/search/tv?api_key=${API_KEY}&page=${page}&include_adult=false&query=${searchString}`;
  return callTMDB(apiCall);
}

/**
 * Returns show details for passed TMDb showId
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetShowDetails(showId) {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/tv/${showId}?api_key=${API_KEY}`;
  return callTMDB(apiCall);
}

/**
 * Return episodes from showId passed and seasonNum passed
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @param {number} seasonNum - season number to get episodes from
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetEpisodes(showId, seasonNum) {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/tv/${showId}/season/${seasonNum}?api_key=${API_KEY}`;
  return callTMDB(apiCall);
}

/**
 * Returns show images for passed showId from TMDb.
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetShowImages(showId) {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/tv/${showId}/images?api_key=${API_KEY}`;
  return callTMDB(apiCall);
}

/**
 * Returns external Ids from TMDb.
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetExternalIds(showId) {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/tv/${showId}/external_ids?api_key=${API_KEY}`;
  return callTMDB(apiCall);
}

/**
 * Returns Credits for a show from TMDb.
 * Looks like it return the main cast and crew for a show.
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetShowCredits(showId) {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/tv/${showId}/credits?api_key=${API_KEY}`;
  return callTMDB(apiCall);
}

/**
 * Returns Credit Details from TMDb.  Use rawTVGetShowCredits to get a creditId.
 * Not sure of the usefullness of this one.
 *
 * @memberOf Raw_API_TV
 * @param {string} creditId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetCreditDetails(creditId) {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/credit/${encodeURI(creditId)}?api_key=${API_KEY}`;
  return callTMDB(apiCall);
}

// function getShowSeasons = (showId) => {
//   return axios
//     .get (`${API_URL}/tv/${showId}/season?api_key=${API_KEY}`)
//       .then((resp) => {
//         return {
//           data: resp.data,
//           msg: resp.request.responseURL
//         };
//       })
//       .catch((err) => {
//         console.log(`Error with getShowDetails get: ${err}`)
//         return err;
//       });
// };

export {
  rawTVGetCreditDetails,
  rawTVGetShowCredits,
  rawTVGetEpisodes,
  rawTVGetExternalIds,
  rawTVGetShowDetails,
  rawTVGetShowImages,
  rawTVSearchByTitle
};
