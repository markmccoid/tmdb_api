import { rawSearchForPerson } from "../APIRaw/TMDB_Common";
/**
 * Searches for person and returns results
 * @param {string} personName - Name of person to search for
 * @param {number} [page=1] - page number to return
 * @returns {object} response object
 *  on success { data: data from api call, apiCall: API call}
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
