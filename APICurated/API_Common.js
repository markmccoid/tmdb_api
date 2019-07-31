/**
 *  @fileOverview Curated Common Calls.  currently just searchForPersonId
 *
 *  @author       Mark McCoid
 */
/**
 * API Curated modules2
 * @namespace Curated_API
 *
 */

import { rawSearchForPerson } from "../APIRaw/TMDB_Common";
/**
 * Searches for person and returns results.  Only returns the
 * {id, name, popularity}, as it is expected to be used for
 * searching for a person's id.
 * @memberOf Curated_API
 * @method
 * @param {string} personName - Name of person to search for
 * @param {number} [page=1] - page number to return
 * @returns {object} response object sorted by popularity desc
 *  on success { data: {
 *    page, totalpages, totalResults,
 *    results: [{ id, name, popularity }]}, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const searchForPersonId = (searchValue, page = 1) => {
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
};
