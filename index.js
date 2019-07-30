import axios from "axios";
import _ from "lodash";

// const API_KEY = '0e4935aa81b04539beb687d04ff414e3'//process.env.REACT_APP_TMDB_API_KEY;
const API_URL = "https://api.themoviedb.org/3";

// Init function to get base config variables
// so we don't call config each time
// Variables stored
// IMG_URL, SECURE_IMG_URL
// After config, to retrieve, run function getImgURLs to get the object with above vars
let IMG_URL = "";
let SECURE_IMG_URL = "";
let API_KEY;
let TV_GENRE_OBJ;
let MOVIE_GENRE_OBJ;

/**
 * Initialization function that MUST be run before any other
 * function can be accessed.
 * Set a number of constants that can be accessed
 * by calling the getTMDBConsts() function
 * @param {string} apiKey - required API Key to access TMDB
 *
 */
export async function initTMDB(apiKey) {
  console.log("initing tmdb");
  API_KEY = apiKey;
  let resp = await getConfig();
  // TMDB API Call to get array of Id/Name objects
  let tvGenreObj = await getTVGenres();
  let movieGenreObj = await getMovieGenres();
  tvGenreObj = convertGenreToObj(tvGenreObj);
  movieGenreObj = convertGenreToObj(movieGenreObj);
  TV_GENRE_OBJ = tvGenreObj;
  MOVIE_GENRE_OBJ = movieGenreObj;
  IMG_URL = resp.data.images.base_url;
  SECURE_IMG_URL = resp.data.images.secure_base_url;
}

/**
 * This function returns the needed constants that the TDMB calls
 * need to get their data
 * @param {object}  - TMDB Constants
 *
 */
export function getTMDBConsts() {
  return {
    API_URL,
    API_KEY,
    IMG_URL,
    SECURE_IMG_URL,
    TV_GENRE_OBJ,
    MOVIE_GENRE_OBJ
  };
}

/**
 * Returns configuration information from TMDb.
 *
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getConfig = () => {
  const apiCall = `${API_URL}/configuration?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
    .then(resp => {
      return {
        data: resp.data,
        apiCall: resp.request.responseURL
      };
    })
    .catch(err => {
      console.log(`Error with config get: ${err}`);
      return {
        data: "ERROR",
        apiCall,
        msg: err
      };
    });
};

/**
 * Returns a TV Genre map from TMDb.
 *
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getTVGenres = () => {
  const apiCall = `${API_URL}/genre/tv/list?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
    .then(resp => {
      console.log(resp);
      return {
        data: resp.data,
        apiCall: resp.request.responseURL
      };
    })
    .catch(err => {
      console.log(`Error with config get: ${err}`);
      return {
        data: "ERROR",
        apiCall,
        msg: err
      };
    });
};

/**
 * Returns a Movie Genre map from TMDb.
 *
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getMovieGenres = () => {
  const apiCall = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
    .then(resp => {
      console.log(resp);
      return {
        data: resp.data,
        apiCall: resp.request.responseURL
      };
    })
    .catch(err => {
      console.log(`Error with config get: ${err}`);
      return {
        data: "ERROR",
        apiCall,
        msg: err
      };
    });
};

/**
 * Take array of genre objects and convert to object:
 * {
 *  [id]: genre name,
 * }
 * @param {array} genres
 */
function convertGenreToObj(genres) {
  return genres.data.genres.reduce((final, genre) => {
    final[genre.id] = genre.name;
    return final;
  }, {});
}

export * from "./APIRaw";
export * from "./APICurated";
