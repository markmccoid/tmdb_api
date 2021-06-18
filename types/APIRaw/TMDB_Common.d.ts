/**
 * Raw API calls to the tmdb api end points that are **COMMON across TV and Movies**.
 *
 * @namespace Raw_API_Common
 *
 */
/**
 * Searches for person and returns results
 *
 * @memberOf Raw_API_Common
 * @param {string} personName - Name of person to search for
 * @param {number} [page=1] - page number to return
 * @returns {object} response object
 * On success { data: data from api call, apiCall: API call}
 *
 * On error throws {@link ErrorObj}
 */
export function rawSearchForPerson(personName: string, page?: number): object;
/**
 * Returns Person Details from TMDb.
 * Details of the person, not the show or movies they are in.
 *
 * TMDB Developer API Docs - {@link https://developers.themoviedb.org/3/credits/get-credit-details}
 * @memberOf Raw_API_Common
 * @param {string} personId - TMDb show id
 * @returns {object} response object {data, msg}
 *
 * On success { data: data from api call, apiCall: API call}
 *
 * On error throws {@link ErrorObj}
 */
export function rawGetPersonDetails(personId: string): object;
/**
 * Returns images for passed PersonId from TMDb.
 *
 * TMDB Developer API Docs - {@link https://developers.themoviedb.org/3/people/get-person-images}
 * @memberOf Raw_API_Common
 * @param {string} personId - TMDb show id
 * @returns {object} response object
 * On success { data: data from api call, apiCall: API call}
 *
 * On error throws {@link ErrorObj}
 */
export function rawGetPersonImages(personId: string): object;
/**
 * Returns a Person's combined credits from TMDb.
 * These will be credits from TV and Movies.  If you only want TV {@see rawTVGetPersonCredits}
 *
 * TMDB Developer API Docs - {@link https://developers.themoviedb.org/3/people/get-person-combined-credits}
 * @memberOf Raw_API_Common
 * @param {string} personId - TMDb show id
 * @returns {object} response object
 * On success { data: data from api call, apiCall: API call}
 *
 * On error {@link ErrorObj}
 */
export function rawGetPersonCombinedCredits(personId: string): object;
