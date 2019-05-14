import axios from 'axios';
import { getTMDBConsts } from './index';
// const API_KEY = '0e4935aa81b04539beb687d04ff414e3'//process.env.REACT_APP_TMDB_API_KEY;
// const API_URL = 'https://api.themoviedb.org/3';

/**
 * Returns data from search by searchString
 * 
 * @param {string} searchString - String of title to search for
 * @param {number} [page=1] - page number to return if multiple pages from search 
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const searchTVByTitle = (searchString, page=1) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/search/tv?api_key=${API_KEY}&page=${page}&include_adult=false&query=${searchString}`; 
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      })
      .catch((err) => {
        console.log(`Error with searchTVByTitle get: ${err}`)
        return err;
      });
};

/**
 * Returns show details for passed TMDb showId
 * 
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getShowDetails = (showId) => {
  let { API_KEY, API_URL } = getTMDBConsts();  
  const apiCall = `${API_URL}/tv/${showId}?api_key=${API_KEY}`;
  return axios
    .get (apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        };
      })
      .catch((err) => {
        console.log(`Error with getShowDetails get: ${err}`)
        return err;
      });
};

/**
 * Return episodes from showId passed and seasonNum passed
 * 
 * @param {string} showId - TMDb show id
 * @param {number} seasonNum - season number to get episodes from
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getEpisodes = (showId, seasonNum) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/tv/${showId}/season/${seasonNum}?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      })
      .catch(err => {
        return {
          error: err,
          status: err.response.request.status,
          statusText: err.response.request.statusText,
        }
      });
};

/**
 * Returns show images for passed showId from TMDb.
 * 
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getShowImages = (showId) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/tv/${showId}/images?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      });
};

/**
 * Returns external Ids from TMDb.
 * 
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getExternalIds = (showId) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/tv/${showId}/external_ids?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      })
};

/**
 * Returns Credits from TMDb.
 * 
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getCredits = (showId) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/tv/${showId}/credits?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      })
};

/**
 * Returns Credit Details from TMDb.
 * 
 * @param {string} creditId - TMDb show id
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getCreditDetails = (creditId) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/credit/${creditId}?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      })
};

/**
 * Returns Person Details for TV from TMDb.
 * Person Id can be found in getCredits results
 * cast: [
 *  {
 *    id: this is the personId
 *    ...
 *  }
 * ]
 * @param {string} personId - TMDb show id
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getPersonDetails = (personId) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/person/${personId}?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      })
};


// export const getShowSeasons = (showId) => {
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