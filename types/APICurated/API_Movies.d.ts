import { GenresObject } from "./../index.d";
import { dateResultsType } from "./API_Common";

export type imagesReturn_typedef = {
  /**
   * Array of image URLs
   */
  data: any[];
  /**
   * the API call used to hit endpoint
   */
  apiCall: string;
};
export type movieWatchProviders_typedef = {
  /**
   * the data object
   */
  data: {
    movieId: number;
    results: any[];
  };
  /**
   * the API call used to hit endpoint
   */
  apiCall: string;
};

type videoResultsType = {
  videoURL: string;
  videoThumbnailURL: string;
  id: string;
  language: string;
  country: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
};
type movieSearchByTitle_Results = {
  /** the movieId */
  id: number;
  title: string;
  overview: string;
  /** - returns an object with options for date {date, epoch, formatted} */
  releaseDate: dateResultsType;
  posterURL: string;
  backdropURL: string;
  /**array of genre names */
  genres: string[];
  videos?: videoResultsType[];
};
export type movieSearchByTitle_typedef = {
  /**
   * the data object
   */
  data: {
    page: number;
    totalResults: number;
    totalPages: number;
    results: movieSearchByTitle_Results[];
  };
  apiCall: string;
};
export type movieDetails_typedef = {
  /**
   * the data object
   */
  data: {
    id: number;
    title: string;
    tagline: string;
    overview: string;
    status: string;
    runtime: number;
    budget: number;
    revenue: number;
    releaseDate: object;
    posterURL: string;
    backdropURL: string;
    imdbId: string;
    imdbURL: string;
    genres: string[];
    videos?: videoResultsType[];
  };
  /**
   * the API call used to hit endpoint
   */
  apiCall: string;
};
export type movieVideos_typedef = {
  /**
   * the data array is an array of objects
   */
  data: any[];
  /**
   * the videoId
   */
  id: string;
  language: string;
  country: string;
  key: string;
  name: string;
  site: number;
  size: number;
  type: number;
  videoURL: object;
  videoThumbnailURL: string;
  /**
   * the API call used to hit endpoint
   */
  apiCall: string;
};
export type moviesRecommendations_typedef = {
  /**
   * the data object
   */
  data: {
    page: number;
    totalResults: number;
    totalPages: number;
    results: any[];
  };
  /**
   * the movieId
   */
  id: number;
  title: string;
  overview: string;
  /**
   * - returns an object with options for date {date, epoch, formatted}
   */
  releaseDate: any;
  posterURL: string;
  backdropURL: string;
  /**
   * array of genre names
   */
  genres: any;
  /**
   * the API call used to hit endpoint
   */
  apiCall: string;
};
export type moviesPopular_typedef = {
  /**
   * the data object
   */
  data: {
    page: number;
    totalResults: number;
    totalPages: number;
    results: any[];
  };
  /**
   * the movieId
   */
  id: number;
  title: string;
  overview: string;
  /**
   * - returns an object with options for date {date, epoch, formatted}
   */
  releaseDate: any;
  posterURL: string;
  backdropURL: string;
  /**
   * array of genre names
   */
  genres: any;
  /**
   * the API call used to hit endpoint
   */
  apiCall: string;
};
export type movieCredits_typedef = {
  /**
   * the data object
   */
  data: {
    cast: any[];
  };
  personId: number;
  name: string;
  characterName: string;
  creditId: string;
  /**
   * 1 is Female, 2 is Male
   */
  gender: number;
  profileURL: string;
  /**
   * the crew array
   */
  crew: string;
  job: string;
  department: string;
  /**
   * the API call used to hit endpoint
   */
  apiCall: string;
};
export type moviePersonCredits_typedef = {
  /**
   * the data object
   */
  data: {
    cast: {
      movieId: number;
      title: string;
      overview: string;
      releaseDate: dateResultsType;
      creditId: string;
      characterName: string;
      genres: string[];
      posterURL: string;
      backdropURL: string;
      orginalLanguage: string;
    }[];
    crew: {
      movieId: number;
      title: string;
      overview: string;
      releaseDate: dateResultsType;
      creditId: string;
      job: string;
      department: string;
      genres: string[];
      posterURL: string;
      backdropURL: string;
      orginalLanguage: string;
    }[];
  };
  apiCall: string;
};
export type movieDiscover_typedef = {
  /**
   * the data object
   */
  data: {
    page: number;
    totalResults: number;
    totalPages: number;
    results: {
      /**
       * the movieId
       */
      id: number;
      title: string;
      popularity: number;
      originalLanguage: string;
      overview: string;
      releaseDate: dateResultsType;
      posterURL: string;
      backdropURL: string;
      /** array of genre names */
      genres: string[];
    }[];
  };

  /**
   * the API call used to hit endpoint
   */
  apiCall: string;
};
export type movieDiscoverCriteria_typedef = {
  /**
   * genre Ids
   */
  genres?: any[];
  /**
   * Primary Release Year
   */
  releaseYear?: any;
  /**
   * movies with release date >= date YYYY-MM-DD format either JS Date or string "YYYY-MM-DD"
   */
  releaseDateGTE?: any | string;
  /**
   * movies with release date <= date YYYY-MM-DD format either JS Date or string "YYYY-MM-DD"
   */
  releaseDateLTE?: any | string;
  /**
   * person Ids. Only include movies that have one of the Id's added as an actor
   */
  cast?: any[];
  /**
   * person Ids. Only include movies that have one of the Id's added as a crew member
   */
  crew?: any[];
  /**
   * Watch providers ids to search limit search by.  Couple with region if desired
   */
  watchProviders?: any[];
  /**
   * An ISO 3166-1 code. Combine this filter with with_watch_providers in order to filter your results by a specific watch provider in a specific region.  > As of 2/2021 a region must be used or no filtering will occur.  US is sent over as a default.
   */
  watchRegions?: any[];
  sortBy?:
    | "popularity.asc"
    | "popularity.desc"
    | "release_date.asc"
    | "release_date.desc"
    | "revenue.asc"
    | "revenue.desc"
    | "primary_release_date.asc"
    | "primary_release_date.desc"
    | "original_title.asc"
    | "original_title.desc"
    | "vote_average.asc"
    | "vote_average.desc"
    | "vote_count.asc"
    | "vote_count.desc";
};
/**
 * @typedef imagesReturn_typedef
 * @type {Object}
 * @property {Array} data Array of image URLs
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an array of image URLs. Filters and gives only 'en' English images
 * @memberof Curated_API_Movies
 * @method
 *
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @param {string} [imageType=posters] - *'posters', 'backdrops'
 * @returns {imagesReturn_typedef} Array of URLs to the images
 */
export function movieGetImages(movieId: any, imageType?: string): imagesReturn_typedef;
/**
 * @typedef movieSearchByTitle_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.page current page returned
 * @property {number} data.totalResults total number of movies search found
 * @property {number} data.totalPages total pages use for pagination
 * @property {Array} data.results results of the search
 * @property {number} data.results.id the movieId
 * @property {string} data.results.title
 * @property {string} data.results.overview
 * @property {int} data.results.releaseDate - returns an object with options for date {date, epoch, formatted}
 * @property {string} data.results.posterURL
 * @property {string} data.results.backdropURL
 * @property {array.<string>} data.results.genres array of genre names
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an object with an array of movies returned based on passed title.
 * @memberOf Curated_API_Movies
 * @method
 *
 * @param {(string)} searchValue - Value to search for
 * @param {number} [page=1] - page to return.  Only works if multiple pages
 * @returns {movieSearchByTitle_typedef} Object data return
 */
export function movieSearchByTitle(
  searchValue: string,
  page?: number
): Promise<movieSearchByTitle_typedef>;
/**
 * @typedef movieDetails_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.id the movieId
 * @property {string} data.title
 * @property {string} data.tagline
 * @property {string} data.overview
 * @property {string} data.status
 * @property {number} data.runtime runtime in minutes
 * @property {number} data.budget
 * @property {number} data.revenue
 * @property {object} data.releaseDate returns an object with options for date {date, epoch, formatted}
 * @property {string} data.posterURL
 * @property {string} data.backdropURL
 * @property {string} data.imdbId
 * @property {string} data.imdbURL
 * @property {array.<string>} data.genres array of genre names
 * @property {array.<object>} data.videos movieVideos_typedef -> array of video objects if withVideos=true- fields are { videoURL, videoThumbnailURL, id, language, country, key, name, site, size, type }
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an object with movie details from passed movieId
 * @method
 * @memberOf Curated_API_Movies
 * @param {number} movieId - movieId to get details for
 * @param {bool} [withVideos=false] - movieId to get details for
 * @returns {movieDetails_typedef} Object data return
 */
export function movieGetDetails(
  movieId: number,
  withVideos?: boolean
): Promise<movieDetails_typedef>;
/**
 * @typedef movieVideos_typedef
 * @type {Object}
 * @property {Array} data the data array is an array of objects
 * @property {string} data.id the videoId
 * @property {string} data.language
 * @property {string} data.country
 * @property {string} data.key
 * @property {string} data.name
 * @property {number} data.site
 * @property {number} data.size
 * @property {number} data.type
 * @property {object} data.videoURL
 * @property {string} data.videoThumbnailURL
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an object with videos for passed movieId
 * @method
 * @memberOf Curated_API_Movies
 * @param {number} movieId - movieId to get details for
 * @returns {movieVideos_typedef} Object data return
 */
export function movieGetVideos(movieId: number): Promise<movieVideos_typedef>;
/**
 * @typedef moviesRecommendations_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.page current page returned
 * @property {number} data.totalResults total number of movies search found
 * @property {number} data.totalPages total pages use for pagination
 * @property {Array} data.results results of the search
 * @property {number} data.results.id the movieId
 * @property {string} data.results.title
 * @property {string} data.results.overview
 * @property {int} data.results.releaseDate - returns an object with options for date {date, epoch, formatted}
 * @property {string} data.results.posterURL
 * @property {string} data.results.backdropURL
 * @property {array.<string>} data.results.genres array of genre names
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an object with movies that are "similar" to the passed movieId's movie
 * @method
 * @memberOf Curated_API_Movies
 * @param {number} movieId - movieId to get details for
 * @returns {moviesRecommendations_typedef} Object data return
 */
export function movieGetRecommendations(
  movieId: number,
  page?: number
): moviesRecommendations_typedef;
/**
 * @typedef moviePersonCredits_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {Array} data.cast the cast array
 * @property {number} data.cast.movieId
 * @property {string} data.cast.title
 * @property {string} data.cast.overview
 * @property {date} data.cast.releaseDate
 * @property {string} data.cast.creditId
 * @property {string} data.cast.characterName
 * @property {Array} data.cast.genres
 * @property {string} data.cast.posterURL
 * @property {string} data.cast.backdropURL
 * @property {string} data.cast.orginalLanguage
 * @property {string} data.crew the crew array
 * @property {number} data.cast.movieId
 * @property {string} data.cast.title
 * @property {string} data.cast.overview
 * @property {string} data.cast.releaseDate
 * @property {string} data.cast.creditId
 * @property {string} data.cast.job
 * @property {string} data.cast.department
 * @property {Array} data.cast.genres
 * @property {string} data.cast.posterURL
 * @property {string} data.cast.backdropURL
 * @property {string} data.cast.orginalLanguage
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an object with movies where person was part of cast or crew for passed personId
 * @memberOf Curated_API_Movies
 * @method
 * @param {number} personId - personId to get details for
 * @returns {moviePersonCredits_typedef} Object data return
 * {
 *    cast: [{}],
 *    crew: [{}],
 *    apiCall
 * }
 */
export function movieGetPersonCredits(personId: number): Promise<moviePersonCredits_typedef>;
/**
 * @typedef movieCredits_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {Array} data.cast the cast array
 * @property {number} data.cast.personId
 * @property {string} data.cast.name
 * @property {string} data.cast.characterName
 * @property {string} data.cast.creditId
 * @property {number} data.cast.gender 1 is Female, 2 is Male
 * @property {string} data.cast.profileURL
 * @property {string} data.crew the crew array
 * @property {number} data.crew.personId
 * @property {string} data.crew.name
 * @property {string} data.crew.creditId
 * @property {string} data.crew.job
 * @property {string} data.crew.department
 * @property {number} data.crew.gender 1 is Female, 2 is Male
 * @property {string} data.crew.profileURL
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an object with cast and crew for passed movieId
 * @memberOf Curated_API_Movies
 * @method
 * @param {number} movieId - movieId to get details for
 * @returns {movieCredits_typedef} Object data return
 * {
 *    cast: [{}],
 *    crew: [{}],
 *    apiCall
 * }
 */
export function movieGetCredits(movieId: number): Promise<movieCredits_typedef>;
/**
 * @typedef moviesPopular_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.page current page returned
 * @property {number} data.totalResults total number of movies search found
 * @property {number} data.totalPages total pages use for pagination
 * @property {Array} data.results results of the search
 * @property {number} data.results.id the movieId
 * @property {string} data.results.title
 * @property {string} data.results.overview
 * @property {int} data.results.releaseDate - returns an object with options for date {date, epoch, formatted}
 * @property {string} data.results.posterURL
 * @property {string} data.results.backdropURL
 * @property {array.<string>} data.results.genres array of genre names
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an object with movies that are "similar" to the passed movieId's movie
 * @method
 * @memberOf Curated_API_Movies
 * @param {number} movieId - movieId to get details for
 * @returns {moviesSimilar_typedef} Object data return
 */
export function movieGetPopular(page?: number, language?: string): Promise<any>;
export function movieGetNowPlaying(page?: number, language?: string): Promise<any>;
export function movieGetUpcoming(page?: number, language?: string): Promise<any>;
/**
 * @typedef movieWatchProviders_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.id the movie id
 * @property {Array} data.results results of the call
 * @property {number} data.results.id the movieId
 * @property {string} data.results.[countryCode] - Based on the array of country codes sent (defaults to just US)
 * @property {string} data.results.[countryCode].justWatchLink - Link to tmdb API's just watch page
 * @property {array.<object>} data.results.[countryCode].stream - array of objects, each with streaming information for a provider
 * @property {number} data.results.[countryCode].stream.displayPriority -
 * @property {string} data.results.[countryCode].stream.logoURL - URL to the logo image of the provider (Square, usually 100x100)
 * @property {number} data.results.[countryCode].stream.providerId -
 * @property {string} data.results.[countryCode].stream.provider - Name of provider (Netflix, Amazon Prime, etc)
 * @property {array.<object>} data.results.[countryCode].buy - array of objects, each with purchase information for a provider
 * @property {number} data.results.[countryCode].buy.displayPriority -
 * @property {string} data.results.[countryCode].buy.logoURL - URL to the logo image of the provider (Square, usually 100x100)
 * @property {number} data.results.[countryCode].buy.providerId -
 * @property {string} data.results.[countryCode].buy.provider - Name of provider (Netflix, Amazon Prime, etc)
 * @property {array.<object>} data.results.[countryCode].rent - array of objects, each with renting information for a provider
 * @property {number} data.results.[countryCode].rent.displayPriority -
 * @property {string} data.results.[countryCode].rent.logoURL - URL to the logo image of the provider (Square, usually 100x100)
 * @property {strnumbering} data.results.[countryCode].rent.providerId -
 * @property {string} data.results.[countryCode].rent.provider - Name of provider (Netflix, Amazon Prime, etc)
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an object with an array of movies returned based on passed title.
 * @memberOf Curated_API_Movies
 * @method
 *
 * @param {string} movieId - Movie Id
 * @param {array.<string>} countryCodes - Array of country codes to return
 * @returns {movieWatchProviders_typedef} Object data return
 */
export function movieGetWatchProviders(
  movieId: string,
  countryCodes?: string[]
): Promise<movieWatchProviders_typedef>;
/**
 * @typedef movieDiscover_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.page current page returned
 * @property {number} data.totalResults total number of movies search found
 * @property {number} data.totalPages total pages use for pagination
 * @property {Array} data.results results of the search
 * @property {number} data.results.id the movieId
 * @property {string} data.results.title
 * @property {number} data.results.popularity
 * @property {string} data.results.originalLanguage
 * @property {string} data.results.overview
 * @property {date} data.results.releaseDate
 * @property {string} data.results.posterURL
 * @property {string} data.results.backdropURL
 * @property {array.<string>} data.results.genres array of genre names
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * @typedef movieDiscoverCriteria_typedef
 * @type {Object}
 * @property {Array} genres  genre Ids
 * @property {int} releaseYear Primary Release Year
 * @property {date | string} releaseDateGTE movies with release date >= date YYYY-MM-DD format either JS Date or string "YYYY-MM-DD"
 * @property {date | string} releaseDateLTE movies with release date <= date YYYY-MM-DD format either JS Date or string "YYYY-MM-DD"
 * @property {Array} cast  person Ids. Only include movies that have one of the Id's added as an actor
 * @property {Array} crew  person Ids. Only include movies that have one of the Id's added as a crew member
 * @property {Array} watchProviders  Watch providers ids to search limit search by.  Couple with region if desired
 * @property {Array} watchRegions  An ISO 3166-1 code. Combine this filter with with_watch_providers in order to filter your results by a specific watch provider in a specific region.  > As of 2/2021 a region must be used or no filtering will occur.  US is sent over as a default.
 * @property {string} sortBy Options
 *    - popularity.asc
 *    - popularity.desc **Default**
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
 */
/**
 * Returns an object with data matching passed criteriaObj criteria
 * @memberOf Curated_API_Movies
 * @method
 * @param {movieDiscoverCriteria_typedef} criteriaObj - object with criteria to search for
 * @param {number} [page=1] - page to return.  Only works if multiple pages
 * @returns {movieDiscover_typedef} Object data return
 */
export function movieDiscover(
  criteriaObj: movieDiscoverCriteria_typedef,
  page?: number
): Promise<movieDiscover_typedef>;
