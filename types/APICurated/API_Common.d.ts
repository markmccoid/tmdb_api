export type dateResultsType = {
  date: Date;
  epoch: number;
  formatted: string;
};
export type searchForPersonId_typedef = {
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
   * the personId
   */
  id: number;
  name: string;
  profileImageURL: string;
  knownFor: {
    id: number;
    mediaType: string;
    title: string;
    posterURL: string;
    backdropURL: string;
  };
  popularity: number;
  /**
   * the API call used to hit endpoint
   */
  apiCall: string;
};
export type getPersonDetails_typedef = {
  /**
   * results of the search
   */
  data: {
    id: number;
    name: string;
    birthday: any;
    deathDay: any;
    knownForDepartment: string;
    biography: string;
    placeOfBirth: string;
    profileImage: string;
    imdbId: string;
  };
  /**
   * the API call used to hit endpoint
   */
  apiCall: string;
};
export type getPersonImages_typedef = {
  /**
   * results of the search
   */
  data: any[];
  width: number;
  height: string;
  aspectRatio: any;
  imageURL: string;
  /**
   * the API call used to hit endpoint
   */
  apiCall: string;
};
/**
 * @typedef searchForPersonId_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.page current page returned
 * @property {number} data.totalResults total number of persons found
 * @property {number} data.totalPages total pages use for pagination
 * @property {Array} data.results results of the search
 * @property {number} data.results.id the personId
 * @property {string} data.results.name
 * @property {number} data.results.popularity
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Searches for person and returns results.  Only returns the
 * {id, name, popularity}, as it is expected to be used for
 * searching for a person's id.
 * @memberOf Curated_API_Common
 * @method
 * @param {string} personName - Name of person to search for
 * @param {number} [page=1] - page number to return
 * @returns {searchForPersonId_typedef} response object sorted by popularity desc
 *  on success { data: {
 *    page, totalpages, totalResults,
 *    results: [{ id, name, popularity }]}, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function searchForPersonId(searchValue: any, page?: number): searchForPersonId_typedef;
/**
 * @typedef getPersonDetails_typedef
 * @type {Object}
 * @property {Object} data results of the search
 * @property {number} data.id the personId
 * @property {string} data.name
 * @property {date} data.birthday
 * @property {date} data.deathDay
 * @property {string} data.knownForDepartment
 * @property {string} data.biography
 * @property {string} data.placeOfBirth
 * @property {string} data.profileImage
 * @property {string} data.imdbId
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns Person Details from TMDB.
 * This is basic information about the person, no shows or movies
 * that they starred in or worked on are included.
 *
 * @memberOf Curated_API_Common
 * @method
 * @param {number} personId - personId to return info for
 * @returns {getPersonDetails_typedef} response object sorted by popularity desc
 *  on success {
 */
export function getPersonDetails(personId: number): getPersonDetails_typedef;
/**
 * @typedef getPersonImages_typedef
 * @type {Object}
 * @property {array} data results of the search
 * @property {number} data.width
 * @property {string} data.height
 * @property {date} data.aspectRatio
 * @property {string} data.imageURL
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns Person Images from TMDB.
 *
 * @memberOf Curated_API_Common
 * @method
 * @param {number} personId - personId to return info for
 * @returns {getPersonImages_typedef} Array of person images (https://...)
 *  on success {
 */
export function getPersonImages(personId: number): getPersonImages_typedef;
