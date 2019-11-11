/**
 *  @fileOverview Curated Common Calls.  currently just searchForPersonId
 *
 *  @author       Mark McCoid
 */

/**
 * Curated_API calls to the tmdb api end points that are **COMMON to both TV and Movies**.
 *
 * These calls all reference their raw counterparts, but only return selected data points.
 * Also, things like dates are converted to javascript date formats and image data are
 * converted to URL strings.
 * @namespace Curated_API_Common
 *
 */

import {
  rawSearchForPerson,
  rawGetPersonDetails,
  rawGetPersonImages
} from "../APIRaw/TMDB_Common";
import { formatImageURL, parseToDate } from "../helpers";

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
function searchForPersonId(searchValue, page = 1) {
  return rawSearchForPerson(searchValue, page).then(resp => {
    console.log("personid return", resp);
    let data = {
      page: resp.data.page,
      totalPages: resp.data.total_pages,
      totalResults: resp.data.total_results
    };
    let results = resp.data.results.map(person => {
      return {
        id: person.id,
        name: person.name,
        popularity: person.popularity
      };
    });
    return {
      data: {
        ...data,
        // sort array of results by popularity then reverse to show in desc order (most popular first)
        results: _.reverse(_.sortBy(results, ["popularity"]))
      },
      apiCall: resp.apiCall
    };
  });
}

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
function getPersonDetails(personId) {
  return rawGetPersonDetails(personId).then(resp => {
    console.log("person Details", resp);
    let personDetails = {
      id: resp.data.id,
      name: resp.data.name,
      birthday: parseToDate(resp.data.birthday),
      knownForDepartment: resp.data.known_for_department,
      deathDay: parseToDate(resp.data.deathday),
      biography: resp.data.biography,
      placeOfBirth: resp.data.place_of_birth,
      imdbId: resp.data.imdb_id,
      profileImage: formatImageURL(resp.data.profile_path)[0]
    };
    return {
      data: personDetails,
      apiCall: resp.apiCall
    };
  });
}

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
function getPersonImages(personId) {
  return rawGetPersonImages(personId).then(resp => {
    let personImages = resp.data.profiles
      .sort((a, b) => b.vote_average - a.vote_average)
      .map(image => {
        return {
          width: image.width,
          height: image.height,
          aspectRatio: image.aspect_ratio,
          imageURL: formatImageURL(image.file_path)[0]
        };
      });
    return {
      data: personImages,
      apiCall: resp.data.apiCall
    };
  });
}

export { searchForPersonId, getPersonDetails, getPersonImages };
