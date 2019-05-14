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
export const searchMovieByTitle = (searchString, page=1) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/search/movie?api_key=${API_KEY}&page=${page}&include_adult=false&query=${searchString}`; 
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      })
      .catch((err) => {
        console.log(`Error with searchMovieByTitle get: ${err}`)
        return err;
      });
};

/**
 * Returns movie details for passed TMDb movieId
 * 
 * @param {string} movieId - TMDb movie id
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getMovieDetails = (movieId) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;
  return axios
    .get (apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        };
      })
      .catch((err) => {
        console.log(`Error with getMovieDetails get: ${err}`)
        return err;
      });
};


/**
 * Returns show images for passed movieId from TMDb.
 * 
 * @param {string} movieId - TMDb show id
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getMovieImages = (movieId) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/movie/${movieId}/images?api_key=${API_KEY}`;
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
 * Returns Person Details for Movies from TMDb.
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
export const getPersonDetails_Movie = (personId) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/person/${personId}/movie_credits?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      })
};
