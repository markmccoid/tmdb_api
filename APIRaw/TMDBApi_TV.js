import { callTMDB, apiTMDB } from "../apiCalls";
import { flattenArray } from "../helpers";

/**
 * Raw API calls to the tmdb api end points for **TV Shows**.
 *
 * @namespace Raw_API_TV
 *
 */

/**
 * Returns data for providers of movies
 *
 * @memberOf Raw_API_Movies
 * @param {string} tvId - TV id of TV show to find providers for
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVWatchProviders(tvId) {
  return apiTMDB(`/tv/${tvId}/watch/providers`);
}

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
function rawTVSearchByTitle(searchString, page = 1) {
  const config = {
    params: {
      page,
      query: searchString,
      include_adult: false,
    },
  };
  return apiTMDB("/search/tv", config);
}

/**
 * Returns show details for passed TMDb showId
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetShowDetails(showId) {
  return apiTMDB(`/tv/${showId}`);
}

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
function rawTVGetEpisodes(showId, seasonNum = 1) {
  return apiTMDB(`tv/${showId}/season/${seasonNum}`);
}

/**
 * Returns show images for passed showId from TMDb.
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetShowImages(showId) {
  return apiTMDB(`/tv/${showId}/images`);
}

/**
 * Returns external Ids from TMDb.
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetExternalIds(showId) {
  return apiTMDB(`/tv/${showId}/external_ids`);
}

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
function rawTVGetShowCredits(showId) {
  return apiTMDB(`/tv/${showId}/credits`);
}

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
function rawTVGetCreditDetails(creditId) {
  return apiTMDB(`/credit/${encodeURI(creditId)}`);
}

// function getShowSeasons = (showId) => {
//   return axios
//     .get (`${API_URL}/tv/${showId}/season?api_key=${API_KEY}`)
//       .then((resp) => {
//         return {
//           data: resp.data,
//           msg: resp.request.responseURL
//         };
//       })
//       .catch((err) => {
//         console.log(`Error with getShowDetails get: ${err}`)
//         return err;
//       });
// };

/**
 * Get a list of Popular TV shows
 *
 * @memberOf Raw_API_TV
 * @param {number} [page=1] - optional, defaults to 1
 * @param {string} [language='en-US'] - optional, defaults to 'en-US'
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetPopular(page = 1, language = "en-US") {
  const config = {
    params: {
      page,
      language,
    },
  };
  return apiTMDB(`/tv/popular`, config);
}

/**
 * criteriaObj {
 *  genres: [] // genre Ids
 *  genreCompareType: string // "AND" (,) if want movies with all ids or "OR" (|) for movies with any (default to OR)
 *  firstAirDateYear: int // Primary Release Year
 *  releaseDateGTE: date // movies with release date >= date YYYY-MM-DD
 *  releaseDateLTE: date // movies with release date <= date YYYY-MM-DD
 *  cast: [] // person Ids. Only include movies that have one of the Id's added as an actor.
 *  castCompareType: string // "AND" if want movies with all ids or "OR" for movies with any
 *  crew: [] // person Ids. Only include movies that have one of the Id's added as a crew member.
 *  crewCompareType: string // "AND" if want movies with all ids or "OR" for movies with any
 *  watchProviders: [string] // ids of watch providers that movie is located on.
 *  watchProviderCompareType: string // "AND" if want movies with all ids or "OR" for movies with any (defaults to OR)
 *  watchRegions: [string] // In initial test (2/2021) only US worked and if not region sent then the results were not filtered by the passed watchProviders array.  Chose to default to US region if none sent over.
 *
 *  sortBy: one of the following:
 *    - popularity.asc
 *    - popularity.desc **Default
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
 * }
 * @param {object} criteriaObj - object with criteria to search with
 * @returns {object} response object {data, apiCall}
 */
const boolConversion = {
  AND: ",",
  OR: "|",
  undefined: "|",
};

function rawTVDiscover(criteriaObj, page = 1) {
  const { releaseDateGTE, releaseDateLTE } = criteriaObj;
  // This is the config object that will be passed to the api call
  let config = {
    params: {
      page,
      with_genres: flattenArray(
        criteriaObj.genres,
        boolConversion[criteriaObj.genreCompareType]
      ),
      first_air_date_year: criteriaObj.firstAirDateYear,
      [`primary_release_date.lte`]:
        typeof releaseDateLTE === "date"
          ? format(releaseDateLTE, "YYYY-MM-DD")
          : releaseDateLTE,
      [`primary_release_date.gte`]:
        typeof releaseDateGTE === "date"
          ? format(releaseDateGTE, "YYYY-MM-DD")
          : releaseDateGTE,
      with_crew: flattenArray(criteriaObj.crew, boolConversion[criteriaObj.crewCompareType]),
      with_cast: flattenArray(criteriaObj.cast, boolConversion[criteriaObj.castCompareType]),
      with_watch_providers: flattenArray(
        criteriaObj.watchProviders,
        boolConversion[criteriaObj.watchProviderCompareType] //default to OR conditional
      ),
      watch_region: criteriaObj.watchProviders ? criteriaObj.watchRegion || "US" : undefined,
    },
  };

  return apiTMDB("/discover/tv", config);
}
export {
  rawTVGetCreditDetails,
  rawTVGetShowCredits,
  rawTVGetEpisodes,
  rawTVGetExternalIds,
  rawTVGetShowDetails,
  rawTVGetShowImages,
  rawTVSearchByTitle,
  rawTVGetPopular,
  rawTVWatchProviders,
  rawTVDiscover,
};
