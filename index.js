/**
 *  @fileOverview TMDB API Wrapper module.
 *
 *  @author       Mark McCoid
 */

import axios from 'axios';
import _ from 'lodash';
const watchProviders = require('./watchProviders.json');

export const API_URL = 'https://api.themoviedb.org/3';

// Init function to get base config variables
// so we don't call config each time
// Variables stored
// IMG_URL, SECURE_IMG_URL
// After config, to retrieve, run function getImgURLs to get the object with above vars
export let IMG_URL = '';
export let SECURE_IMG_URL = '';
export let API_KEY;
export let TV_GENRE_OBJ;
export let MOVIE_GENRE_OBJ;
export let API_OPTIONS = {
  dateFormatString: 'MM-dd-yyyy',
};

/**
 * Initialization function that MUST be run before any other
 * function can be accessed.
 * Set a number of constants that can be accessed
 * by calling the getTMDBConsts() function or by importing the
 * constants themselves
 * @param {string} apiKey - required API Key to access TMDB
 * @param {object} options - options object {
 *  dateFormatString //dateFormatString as used by fns-date https://date-fns.org/v2.7.0/docs/format
 * }
 */
export async function initTMDB(apiKey, options = {}) {
  API_OPTIONS = { ...API_OPTIONS, ...options };
  API_KEY = apiKey;
  let resp = await getConfig();
  // TMDB API Call to get array of Id/Name objects
  let tvGenreObj = await getTVGenres(true);
  let movieGenreObj = await getMovieGenres(true);
  TV_GENRE_OBJ = tvGenreObj.data;
  MOVIE_GENRE_OBJ = movieGenreObj.data;
  // Make sure config was returned with data
  if (
    resp.data === 'ERROR' ||
    !resp.data.images.base_url ||
    !resp.data.images.secure_base_url
  ) {
    IMG_URL = 'http://image.tmdb.org/t/p/';
    SECURE_IMG_URL = 'https://image.tmdb.org/t/p/';
  } else {
    IMG_URL = resp.data.images.base_url;
    SECURE_IMG_URL = resp.data.images.secure_base_url;
  }
  return;
}

/**
 * Updates the API_OPTIONS objects
 *
 * @param {object} options - options object {
 *  dateFormatString //dateFormatString as used by fns-date https://date-fns.org/v2.7.0/docs/format
 * }
 */
export function updateAPIOptions(options = {}) {
  API_OPTIONS = { ...API_OPTIONS, ...options };
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
    MOVIE_GENRE_OBJ,
    API_OPTIONS,
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
  const sortedWatchProviders = _.sortBy(watchProviders, [
    'providerPriority',
    'providerId',
  ]);
  const apiCall = `${API_URL}/configuration?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
    .then((resp) => {
      return {
        data: { ...resp.data, sortedWatchProviders },
        apiCall: resp.request.responseURL,
      };
    })
    .catch((err) => {
      console.log(`Error with config get: ${err}`);
      return {
        data: 'ERROR',
        apiCall,
        msg: err,
      };
    });
};

/**
 * Returns a TV Genre map from TMDb.
 *
 * @param {bool} [convertToObjectFlag=false] flag determines if we will convert the genres to from an Array of Object {id, name}
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getTVGenres = (convertToObjectFlag = false) => {
  const apiCall = `${API_URL}/genre/tv/list?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
    .then((resp) => {
      return {
        data: convertToObjectFlag
          ? convertGenreToObj(resp.data, 'tv')
          : resp.data,
        apiCall: resp.request.responseURL,
      };
    })
    .catch((err) => {
      console.log(`Error with config get: ${err}`);
      return {
        data: convertGenreToObj('ERROR', 'tv'), //this will return default genres
        apiCall,
        msg: err,
      };
    });
};

/**
 * Returns a Movie Genre map from TMDb.
 *
 * @param {bool} [convertToObjectFlag=false] flag determines if we will convert the genres to from an Array of Object {id, name}
 * to a single object where the genre ids are the keys and the names are the values { 123: 'Horror', 234: 'Comedy', ...}
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getMovieGenres = (convertToObjectFlag = false) => {
  const apiCall = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
    .then((resp) => {
      return {
        data: convertToObjectFlag
          ? convertGenreToObj(resp.data, 'movies')
          : resp.data,
        apiCall: resp.request.responseURL,
      };
    })
    .catch((err) => {
      console.log(`Error with config get: ${err}`);
      return {
        data: convertGenreToObj('ERROR', 'movie'), //this will return default genres
        apiCall,
        msg: err,
      };
    });
};

/**
 * Take array of genre objects and convert to object:
 * {
 *  [id]: genre name,
 * }
 * @param {object} genres
 */
function convertGenreToObj(genreData, genreType) {
  const { genres } = genreData;

  if (genres === 'ERROR') {
    // If there was an error getting genres, return canned ones below
    return genreType === 'movie'
      ? {
          10402: 'Music',
          10749: 'Romance',
          10751: 'Family',
          10752: 'War',
          10770: 'TV Movie',
          12: 'Adventure',
          14: 'Fantasy',
          16: 'Animation',
          18: 'Drama',
          27: 'Horror',
          28: 'Action',
          35: 'Comedy',
          36: 'History',
          37: 'Western',
          53: 'Thriller',
          80: 'Crime',
          878: 'Science Fiction',
          9648: 'Mystery',
          99: 'Documentary',
        }
      : {
          10751: 'Family',
          10759: 'Action & Adventure',
          10762: 'Kids',
          10763: 'News',
          10764: 'Reality',
          10765: 'Sci-Fi & Fantasy',
          10766: 'Soap',
          10767: 'Talk',
          10768: 'War & Politics',
          16: 'Animation',
          18: 'Drama',
          35: 'Comedy',
          37: 'Western',
          80: 'Crime',
          9648: 'Mystery',
          99: 'Documentary',
        };
  }
  // genre data from API is an array of object {id, name}
  // convert that into a single object for easy lookups.

  return genres.reduce((final, genre) => {
    final[genre.id] = genre.name;
    return final;
  }, {});
}

export * from './APIRaw';
export * from './APICurated';
