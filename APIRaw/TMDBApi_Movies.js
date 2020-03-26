import { format } from "date-fns";
import { apiTMDB } from "../apiCalls";
import { flattenArray } from "../helpers";

// const API_KEY = '0e4935aa81b04539beb687d04ff414e3'//process.env.REACT_APP_TMDB_API_KEY;
// const API_URL = 'https://api.themoviedb.org/3';

/**
 * Raw API calls to the tmdb api end points for **Movies**.
 *
 * These calls return the raw data from the calls to the tmdb api
 *
 * @namespace Raw_API_Movies
 *
 */

/**
 * Returns data from search by searchString
 *
 * @memberOf Raw_API_Movies
 * @param {string} searchString - String of title to search for
 * @param {number} [page=1] - page number to return if multiple pages from search
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawMovieSearchByTitle(searchString, page = 1) {
  const config = {
    params: {
      page,
      include_adult: false,
      query: searchString
    }
  };
  return apiTMDB("/search/movie", config);
}

/**
 * Returns movie details for passed TMDb movieId
 *
 * @memberOf Raw_API_Movies
 * @param {string} movieId - TMDb movie id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawMovieGetDetails(movieId) {
  return apiTMDB(`/movie/${movieId}`);
}

/**
 * Returns show images for passed movieId from TMDb.
 *
 * @memberOf Raw_API_Movies
 * @param {string} movieId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawMovieGetImages(movieId) {
  return apiTMDB(`/movie/${movieId}/images`);
}

/**
 * Returns Person Details for Movies from TMDb.
 * Person Id can be found in getCredits results
 * cast: [
 *  {
 *    id: this is the personId
 *    ...
 *  }
 * ]
 * @memberOf Raw_API_Movies
 * @param {number} personId - TMDb personId
 * @returns {object} response object
 *  on success { data: data from api call, apiCall: API call}
 */
function rawMovieGetPersonCredits(personId) {
  return apiTMDB(`/person/${personId}/movie_credits`);
}

/**
 * Returns the credits for Movies from TMDb.
 * Person Id can be found in getCredits results
 * cast: [
 *  {
 *    id: this is the personId
 *    ...
 *  }
 * ],
 * crew: [
 *  {
 *    id: this is the personId
 *    ...
 *  }
 * ]
 * @memberOf Raw_API_Movies
 * @param {number} movieId - TMDb movieId
 * @returns {object} response object
 *  on success { data: data from api call, apiCall: API call}
 */
function rawMovieGetCredits(movieId) {
  return apiTMDB(`/movie/${movieId}/credits`);
}

/**
 * criteriaObj {
 *  genres: [] // genre Ids
 *  releaseYear: int // Primary Release Year
 *  releaseDateGTE: date // movies with release date >= date YYYY-MM-DD
 *  releaseDateLTE: date // movies with release date <= date YYYY-MM-DD
 *  cast: [] // person Ids. Only include movies that have one of the Id's added as an actor.,
 *  crew: [] // person Ids. Only include movies that have one of the Id's added as a crew member.,
 *  sortBy: one of the following:
 *    - popularity.asc
 *    - popularity.desc **Default
 *    - release_date.asc
 *    - release_date.desc
 *    - revenue.asc
 *    - revenue.desc
 *    - primary_release_date.asc
 *    - primary_release_date.desc
 *    - original_title.asc
 *    - original_title.desc
 *    - vote_average.asc
 *    - vote_average.desc
 *    - vote_count.asc
 *    - vote_count.desc
 * }
 * @memberOf Raw_API_Movies
 * @param {object} criteriaObj - object with criteria to search with
 * @returns {object} response object {data, apiCall}
 */
function rawMovieDiscover(criteriaObj, page = 1) {
  const { releaseDateGTE, releaseDateLTE } = criteriaObj;
  // This is the config object that will be passed to the api call
  let config = {
    params: {
      with_genres: flattenArray(criteriaObj.genres),
      primary_release_year: criteriaObj.releaseYear,
      [`primary_release_date.lte`]:
        typeof releaseDateLTE === "date"
          ? format(releaseDateLTE, "YYYY-MM-DD")
          : releaseDateLTE,
      [`primary_release_date.gte`]:
        typeof releaseDateGTE === "date"
          ? format(releaseDateGTE, "YYYY-MM-DD")
          : releaseDateGTE,
      with_crew: flattenArray(criteriaObj.crew),
      with_cast: flattenArray(criteriaObj.cast)
    }
  };

  return apiTMDB("/discover/movie", config);
}

export {
  rawMovieSearchByTitle,
  rawMovieGetDetails,
  rawMovieGetImages,
  rawMovieGetPersonCredits,
  rawMovieDiscover,
  rawMovieGetCredits
};
