import axios from "axios";
import { getTMDBConsts } from "../index";

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
export const rawSearchMovieByTitle = (searchString, page = 1) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/search/movie?api_key=${API_KEY}&page=${page}&include_adult=false&query=${encodeURI(
    searchString
  )}`;
  return axios
    .get(apiCall)
    .then(resp => {
      return {
        data: resp.data,
        apiCall: resp.request.responseURL
      };
    })
    .catch(err => {
      console.log(`Error with searchMovieByTitle get: ${err}`);
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
export const rawGetMovieDetails = movieId => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
    .then(resp => {
      return {
        data: resp.data,
        apiCall: resp.request.responseURL
      };
    })
    .catch(err => {
      console.log(`Error with getMovieDetails get: ${err}`);
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
export const rawGetMovieImages = movieId => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/movie/${movieId}/images?api_key=${API_KEY}`;
  return axios.get(apiCall).then(resp => {
    return {
      data: resp.data,
      apiCall: resp.request.responseURL
    };
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
 * @param {number} personId - TMDb show id
 * @returns {object} response object
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const rawGetPersonDetails_Movie = personId => {
  let { API_KEY, API_URL } = getTMDBConsts();
  const apiCall = `${API_URL}/person/${personId}/movie_credits?api_key=${API_KEY}`;
  return axios.get(apiCall).then(resp => {
    return {
      data: resp.data,
      apiCall: resp.request.responseURL
    };
  });
};

/**
 * criteriaObj {
 *  genres: [] // genre Ids
 *  releaseYear: int // Primary Release Year
 *  releaseDateGTE: date // movies with release date >= date YYYY-MM-DD
 *  releaseDateLTE: date // movies with release date <= date YYYY-MM-DD
 *  cast: [] // person Ids. Only include movies that have one of the Id's added as an actor.
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
 * @param {object} criteriaObj - object with criteria to search with
 * @returns {object} response object {data, apiCall}
 */
export const rawDiscoverMovies = (criteriaObj, page = 1) => {
  let { API_KEY, API_URL } = getTMDBConsts();
  let apiCall = `${API_URL}/discover/movie?api_key=${API_KEY}&page=${page}`;

  let criteriaMap = Object.keys(criteriaObj).map(criteriaKey => [
    criteriaKey,
    criteriaObj[criteriaKey]
  ]);
  // Loop through the array created from the keys of the criteriaObj
  // This is an Array of arrays with each inner array holding the criteria name in position 0
  // and the criteria value in position 1
  criteriaMap.forEach(criteriaArray => {
    console.log("rawDiscoverMovies ForEach", criteriaArray);
    // Check to see if any data in criteriaObject key we are on
    // If not, then exist this iteration, i.e. continue with next
    if (!criteriaArray[1]) return;
    switch (criteriaArray[0]) {
      case "genres":
        //Build the with genres criteria
        apiCall += `&with_genres=`;
        criteriaArray[1].forEach((genreId, idx) => {
          return (apiCall += idx === 0 ? genreId : `,${genreId}`);
        });
        break;
      case "releaseYear":
        apiCall += `&primary_release_year=${criteriaArray[1]}`;
        break;
      case "releaseDateGTE":
        console.log("releaseDate in");
        apiCall += `&primary_release_date.gte=${criteriaArray[1]}`;
        console.log("releaseDate out", apiCall);
        break;
      case "releaseDateLTE":
        apiCall += `&primary_release_date.lte=${criteriaArray[1]}`;
        break;
      case "cast":
        //Build the with genres criteria
        apiCall += `&with_cast=`;
        criteriaArray[1].forEach((personId, idx) => {
          return (apiCall += idx === 0 ? personId : `,${personId}`);
        });
        break;
      default:
        break;
    }
  });
  return axios.get(encodeURI(apiCall)).then(resp => {
    return {
      data: resp.data,
      apiCall: resp.request.responseURL
    };
  });
};
