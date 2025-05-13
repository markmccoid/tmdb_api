import axios from "axios";
import _, { sortBy } from "lodash";
import watchProviders from "./watchProviders.json";

const API_URL = "https://api.themoviedb.org/3";

class TMDBConfigManager {
  static instance = null;
  config = null;

  constructor() {}

  static getInstance() {
    if (!TMDBConfigManager.instance) {
      TMDBConfigManager.instance = new TMDBConfigManager();
    }
    return TMDBConfigManager.instance;
  }

  //~~ - - - - - - - - - - - - - - - -
  //~~ Index.js import the exported instance (singleton)
  //~~ and implements a function that will call this intiialize
  //~~ function, passing the tmdb apiKey
  //~~ We return an object with all of the options that were set.
  async initialize(apiKey, options) {
    // Perform your async initialization here
    let resp = await getTMDBConfig(apiKey);

    // TMDB API Call to get array of Id/Name objects
    const tvGenreObj = await getTVGenres(apiKey, true);
    const movieGenreObj = await getMovieGenres(apiKey, true);
    // Make sure config was returned with data
    let IMG_URL = "http://image.tmdb.org/t/p/";
    let SECURE_IMG_URL = "https://image.tmdb.org/t/p/";
    if (resp.data === "ERROR" || !resp.data.images.base_url || !resp.data.images.secure_base_url) {
      IMG_URL = "http://image.tmdb.org/t/p/";
      SECURE_IMG_URL = "https://image.tmdb.org/t/p/";
    } else {
      IMG_URL = resp.data.images.base_url;
      SECURE_IMG_URL = resp.data.images.secure_base_url;
    }
    this.config = {
      IMG_URL,
      SECURE_IMG_URL,
      API_KEY: apiKey,
      API_URL: "https://api.themoviedb.org/3",
      TV_GENRE_OBJ: tvGenreObj.data,
      MOVIE_GENRE_OBJ: movieGenreObj.data,
      WATCH_PROVIDERS: resp.data.WATCH_PROVIDERS.map((wp) => ({
        providerId: wp.provider_id,
        provider: wp.providerName,
        displayPriority: wp.display_priority,
        logoPath: wp.logoPath,
      })),
      API_OPTIONS: {
        dateFormatString: "MM-dd-yyyy",
        defaultAPIParams: { include_adult: false },
        ...(options || {}),
      },
    };
  }

  getConfig() {
    if (!this.config) {
      throw new Error("TMDB Config not initialized. Call initialize() first.");
    }
    return this.config;
  }
}

/**
 * Returns configuration information from TMDb.
 *
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getTMDBConfig = async (apiKey) => {
  // const sortedWatchProviders = _.sortBy(watchProviders, ["providerPriority", "providerId"]);
  const watchAPICall = `${API_URL}/watch/providers/tv?watch_region=US&api_key=${apiKey}`;
  const watchResults = await axios.get(watchAPICall);
  const sortedWatchProviders = sortProviders(watchResults.data.results);
  // console.log(
  //   "WATCH",
  //   watchAPICall,
  //   sortedWatchProviders,
  //   watchResults.data.results
  //     .filter((el) => el.display_priorities.US < 100)
  //     .sort((a, b) => a.display_priorities.US - b.display_priorities.US)
  // );
  const apiCall = `${API_URL}/configuration?api_key=${apiKey}`;

  return axios
    .get(apiCall)
    .then((resp) => {
      return {
        data: { ...resp.data, WATCH_PROVIDERS: sortedWatchProviders },
        apiCall: resp.request.responseURL,
      };
    })
    .catch((err) => {
      console.log(`Error with config get: ${err}`);
      return {
        data: "ERROR",
        apiCall,
        msg: err,
      };
    });
};

function sortProviders(providers) {
  providers = providers.map((el) => ({
    provider_id: el.provider_id,
    provider_name: el.provider_name,
    logo_path: el.logo_path,
    display_priority: el.display_priorities.US,
  }));

  return sortBy(providers, ["display_priority"]);
}
/**
 * Returns a TV Genre map from TMDb.
 *
 * @param {bool} [convertToObjectFlag=false] flag determines if we will convert the genres to from an Array of Object {id, name}
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
const getTVGenres = (apiKey, convertToObjectFlag = false) => {
  const apiCall = `${API_URL}/genre/tv/list?api_key=${apiKey}`;
  return axios
    .get(apiCall)
    .then((resp) => {
      return {
        data: convertToObjectFlag ? convertGenreToObj(resp.data, "tv") : resp.data,
        apiCall: resp.request.responseURL,
      };
    })
    .catch((err) => {
      console.log(`Error with config get: ${err}`);
      return {
        data: convertToObjectFlag
          ? convertGenreToObj({ genres: "ERROR" }, "tv")
          : genreTVDefaultObj, //this will return default genres
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
export const getMovieGenres = (apiKey, convertToObjectFlag = false) => {
  const apiCall = `${API_URL}/genre/movie/list?api_key=${apiKey}`;
  return axios
    .get(apiCall)
    .then((resp) => {
      return {
        data: convertToObjectFlag ? convertGenreToObj(resp.data, "movies") : resp.data,
        apiCall: resp.request.responseURL,
      };
    })
    .catch((err) => {
      console.log(`Error with config get: ${err}`);
      return {
        data: convertToObjectFlag
          ? convertGenreToObj({ genres: "ERROR" }, "movie")
          : genreMovieDefaultObj, //this will return default genres
        apiCall,
        msg: err,
      };
    });
};

const genreTVDefaultObj = [
  { id: 10751, name: "Family" },
  { id: 10759, name: "Action & Adventure" },
  { id: 10762, name: "Kids" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 16, name: "Animation" },
  { id: 18, name: "Drama" },
  { id: 35, name: "Comedy" },
  { id: 37, name: "Western" },
  { id: 80, name: "Crime" },
  { id: 9648, name: "Mystery" },
  { id: 99, name: "Documentary" },
];

const genreMovieDefaultObj = [
  { id: 10402, name: "Music" },
  { id: 10749, name: "Romance" },
  { id: 10751, name: "Family" },
  { id: 10752, name: "War" },
  { id: 10770, name: "TV Movie" },
  { id: 12, name: "Adventure" },
  { id: 14, name: "Fantasy" },
  { id: 16, name: "Animation" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 36, name: "History" },
  { id: 37, name: "Western" },
  { id: 53, name: "Thriller" },
  { id: 80, name: "Crime" },
  { id: 878, name: "Science Fiction" },
  { id: 9648, name: "Mystery" },
  { id: 99, name: "Documentary" },
];
/**
 * Take array of genre objects and convert to object:
 * {
 *  [id]: genre name,
 * }
 * @param {object} genres
 */
export function convertGenreToObj(genreData, genreType) {
  const { genres } = genreData;

  if (genres === "ERROR") {
    // If there was an error getting genres, return canned ones below
    return genreType === "movie"
      ? {
          10402: "Music",
          10749: "Romance",
          10751: "Family",
          10752: "War",
          10770: "TV Movie",
          12: "Adventure",
          14: "Fantasy",
          16: "Animation",
          18: "Drama",
          27: "Horror",
          28: "Action",
          35: "Comedy",
          36: "History",
          37: "Western",
          53: "Thriller",
          80: "Crime",
          878: "Science Fiction",
          9648: "Mystery",
          99: "Documentary",
        }
      : {
          10751: "Family",
          10759: "Action & Adventure",
          10762: "Kids",
          10763: "News",
          10764: "Reality",
          10765: "Sci-Fi & Fantasy",
          10766: "Soap",
          10767: "Talk",
          10768: "War & Politics",
          16: "Animation",
          18: "Drama",
          35: "Comedy",
          37: "Western",
          80: "Crime",
          9648: "Mystery",
          99: "Documentary",
        };
  }
  // genre data from API is an array of object {id, name}
  // convert that into a single object for easy lookups.
  return genres.reduce((final, genre) => {
    final[genre.id] = genre.name;
    return final;
  }, {});
}

export const tmdbConfig = TMDBConfigManager.getInstance();
