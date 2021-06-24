/**
 * Returns Credit Details from TMDb.  Use rawTVGetShowCredits to get a creditId.
 * Not sure of the usefullness of this one.
 *
 * @memberOf Raw_API_TV
 * @param {string} creditId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawTVGetCreditDetails(creditId: string): object;
/**
 * Returns Credits for a show from TMDb.
 * Looks like it return the main cast and crew for a show.
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawTVGetShowCredits(showId: string): object;
/**
 * Return episodes from showId passed and seasonNum passed
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @param {number} seasonNum - season number to get episodes from
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawTVGetEpisodes(showId: string, seasonNum?: number): object;
/**
 * Returns external Ids from TMDb.
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawTVGetExternalIds(showId: string): object;
/**
 * Returns show details for passed TMDb showId
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawTVGetShowDetails(showId: string): object;
/**
 * Returns show images for passed showId from TMDb.
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawTVGetShowImages(showId: string): object;
/**
 * Raw API calls to the tmdb api end points for **TV Shows**.
 *
 * @namespace Raw_API_TV
 *
 */
/**
 * Returns data from search by searchString
 *
 * @memberOf Raw_API_TV
 * @param {string} searchString - String of title to search for
 * @param {number} [page=1] - page number to return if multiple pages from search
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export function rawTVSearchByTitle(searchString: string, page?: number): object;

type RawDiscoverCriteria = {
  genres?: string[]; // genre Ids
  genreCompareType?: "AND" | "OR" | undefined; // "AND" (,) if want movies with all ids or "OR" (|) for movies with any (default to OR)
  firstAirDateYear?: number; // Primary Release Year
  releaseDateGTE?: string; // movies with release date >= date YYYY-MM-DD
  releaseDateLTE?: string; // movies with release date <= date YYYY-MM-DD
  cast?: number[]; // person Ids. Only include movies that have one of the Id's added as an actor.
  castCompareType?: "AND" | "OR" | undefined; // "AND" if want movies with all ids or "OR" for movies with any
  crew?: number[]; // person Ids. Only include movies that have one of the Id's added as a crew member.
  crewCompareType?: "AND" | "OR" | undefined; // "AND" if want movies with all ids or "OR" for movies with any
  watchProviders?: string[]; // ids of watch providers that movie is located on.
  watchProviderCompareType?: "AND" | "OR" | undefined; // "AND" if want movies with all ids or "OR" for movies with any (defaults to OR)
  watchRegions?: string[];
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
export function rawTVDiscover(criteriaObj: RawDiscoverCriteria, page: number): object;
