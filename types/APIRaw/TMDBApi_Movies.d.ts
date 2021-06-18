/**
 * Returns data from search by searchString
 *
 * @memberOf Raw_API_Movies
 * @param {string} searchString - String of title to search for
 * @param {number} [page=1] - page number to return if multiple pages from search
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawMovieSearchByTitle(searchString: string, page?: number): object;
/**
 * Returns movie details for passed TMDb movieId
 * The return data will include a video key with
 * videos attached to movieId
 *
 * @memberOf Raw_API_Movies
 * @param {string} movieId - TMDb movie id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawMovieGetDetails(movieId: string): object;
/**
 * Returns the videos that have been added to the passed movieId.
 *
 * https://developers.themoviedb.org/3/movies/get-movie-videos
 *
 * @memberOf Raw_API_Movies
 * @param {string} movieId - TMDb movie id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawMovieGetVideos(movieId: string): object;
/**
 * Get a list of recommended movies based on passed movieId
 *
 * @memberOf Raw_API_Movies
 * @param {string} movieId - TMDb movie id
 * @param {number} [page=1] - optional
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawMovieGetRecommendations(movieId: string, page?: number): object;
/**
 * Returns show images for passed movieId from TMDb.
 *
 * @memberOf Raw_API_Movies
 * @param {string} movieId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawMovieGetImages(movieId: string): object;
/**
 * Returns Person Details for Movies from TMDb.
 * Person Id can be found in getCredits results
 * cast: [
 *  {
 *    id: this is the personId
 *    ...
 *  }
 * ]
 * @memberOf Raw_API_Movies
 * @param {number} personId - TMDb personId
 * @returns {object} response object
 *  on success { data: data from api call, apiCall: API call}
 */
export function rawMovieGetPersonCredits(personId: number): object;
/**
 * Get a list of Upcoming movies
 *
 * @memberOf Raw_API_Movies
 * @param {number} [page=1] - optional, defaults to 1
 * @param {string} [language='en-US'] - optional, defaults to 'en-US'
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawMovieUpcoming(page?: number, language?: string): object;
/**
 * Get a list of Now Playing movies
 *
 * @memberOf Raw_API_Movies
 * @param {number} [page=1] - optional, defaults to 1
 * @param {string} [language='en-US'] - optional, defaults to 'en-US'
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawMovieGetNowPlaying(page?: number, language?: string): object;
/**
 * Get a list of Popular movies
 *
 * @memberOf Raw_API_Movies
 * @param {number} [page=1] - optional, defaults to 1
 * @param {string} [language='en-US'] - optional, defaults to 'en-US'
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawMovieGetPopular(page?: number, language?: string): object;
export function rawMovieDiscover(criteriaObj: any, page?: number): Promise<any>;
/**
 * Returns the credits for Movies from TMDb.
 * Person Id can be found in getCredits results
 * cast: [
 *  {
 *    id: this is the personId
 *    ...
 *  }
 * ],
 * crew: [
 *  {
 *    id: this is the personId
 *    ...
 *  }
 * ]
 * @memberOf Raw_API_Movies
 * @param {number} movieId - TMDb movieId
 * @returns {object} response object
 *  on success { data: data from api call, apiCall: API call}
 */
export function rawMovieGetCredits(movieId: number): object;
/**
 * Raw API calls to the tmdb api end points for **Movies**.
 *
 * These calls return the raw data from the calls to the tmdb api
 *
 * @namespace Raw_API_Movies
 *
 */
/**
 * Returns data for providers of movies
 *
 * @memberOf Raw_API_Movies
 * @param {string} movieId - Movie id of movie to find providers for
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawMovieWatchProviders(movieId: string): object;
