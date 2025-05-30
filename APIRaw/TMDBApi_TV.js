import { callTMDB, apiTMDB } from "../apiCalls";
import { flattenArray } from "../helpers";
import { convertGenreToObj } from "../config";
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
 * Get a list of recommended tv shows based on passed showId
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb sho id
 * @param {number} [page=1] - optional
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetRecommendations(showId, page = 1) {
  const config = {
    params: {
      page,
    },
  };
  return apiTMDB(`/tv/${showId}/recommendations`, config);
}

/**
 * Returns show details for passed TMDb showId
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @param {object} appendConfig - configuration
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetShowDetails(tvShowId, appendConfig = {}) {
  return apiTMDB(`/tv/${tvShowId}`, appendConfig);
}

function rawTVGetShowSeasonDetails(tvShowId, seasonNumber) {
  return apiTMDB(`/tv/${tvShowId}/season/${seasonNumber}`);
}

/**
 * Returns show single episode details for passed TMDb showId, seasonNum, episodeNum
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb show id
 * @param {number} seasonNumber
 * @param {number} episodeNumber
 * @param {object} appendConfig - axios config object, allowing you to pass "append_to_response" for additional data.
 * some options are: "credits,images,external_ids"
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetShowEpisodeDetails(tvShowId, seasonNumber, episodeNumber, appendConfig = {}) {
  return apiTMDB(`/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}`, appendConfig);
}

function rawTVGetShowEpisodeCredits(tvShowId, seasonNumber, episodeNumber) {
  return apiTMDB(`/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}/credits`);
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
 * @param {number} showId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetExternalIds(showId) {
  return apiTMDB(`/tv/${showId}/external_ids`);
}

/**
 * Returns external Ids from TMDb for Episode.
 *
 * @memberOf Raw_API_TV
 * @param {number} showId - TMDb show id
 * @param {number} seasonNumber -
 * @param {number} epoisdeNumber -
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetEpisodeExternalIds(showId, seasonNumber, episodeNumber) {
  return apiTMDB(`/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/external_ids`);
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
 * @memberOf Raw_API_TV
 * @param {number} personId - TMDb personId
 * @returns {object} response object
 *  on success { data: data from api call, apiCall: API call}
 */
function rawTVGetPersonCredits(personId) {
  return apiTMDB(`/person/${personId}/tv_credits`);
}

/**
 * Returns the videos that have been added to the passed showId.
 *
 * https://developers.themoviedb.org/3/movies/get-movie-videos
 *
 * @memberOf Raw_API_TV
 * @param {string} showId - TMDb movie id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawTVGetVideos(showId) {
  return apiTMDB(`/tv/${showId}/videos`);
}

/**
 * criteriaObj {
 *  genres: [] // genre Ids
 *  genreCompareType: string // "AND" (,) if want movies with all ids or "OR" (|) for movies with any (default to OR)
 *  withoutGenres: [] //exclude any shows with these genres
 *  firstAirDateYear: int // Primary Release Year
 *  firstAirDateGTE: date // TV with release date >= date YYYY-MM-DD
 *  firstAirDateLTE: date // TV with release date <= date YYYY-MM-DD
 *  cast: [] // person Ids. Only include movies that have one of the Id's added as an actor.
 *  castCompareType: string // "AND" if want movies with all ids or "OR" for movies with any
 *  crew: [] // person Ids. Only include movies that have one of the Id's added as a crew member.
 *  crewCompareType: string // "AND" if want movies with all ids or "OR" for movies with any
 *  watchProviders: [string] // ids of watch providers that movie is located on.
 *  watchProviderCompareType: string // "AND" if want movies with all ids or "OR" for movies with any (defaults to OR)
 *  watchRegions: [string] // In initial test (2/2021) only US worked and if not region sent then the results were not filtered by the passed watchProviders array.  Chose to default to US region if none sent over.
 *
 *  sortBy: one of the following:
    | "first_air_date.asc"
    | "first_air_date.desc"
    | "name.asc"
    | "name.desc"
    | "original_name.asc"
    | "original_name.desc"
    | "popularity.asc"
    | "popularity.desc"
    | "vote_average.asc"
    | "vote_average.desc"
    | "vote_count.asc"
    | "vote_count.desc";
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
  const { firstAirDateGTE, firstAirDateLTE } = criteriaObj;
  // This is the config object that will be passed to the api call
  let config = {
    params: {
      page,
      with_genres: flattenArray(criteriaObj.genres, boolConversion[criteriaObj.genreCompareType]),
      without_genres: flattenArray(criteriaObj.withoutGenres, ","),
      first_air_date_year: criteriaObj.firstAirDateYear,
      [`first_air_date.lte`]:
        typeof firstAirDateLTE === "date" ? format(firstAirDateLTE, "YYYY-MM-DD") : firstAirDateLTE,
      [`first_air_date.gte`]:
        typeof firstAirDateGTE === "date" ? format(firstAirDateGTE, "YYYY-MM-DD") : firstAirDateGTE,
      with_crew: flattenArray(criteriaObj.crew, boolConversion[criteriaObj.crewCompareType]),
      with_cast: flattenArray(criteriaObj.cast, boolConversion[criteriaObj.castCompareType]),
      with_watch_providers: flattenArray(
        criteriaObj.watchProviders,
        boolConversion[criteriaObj.watchProviderCompareType] //default to OR conditional
      ),
      watch_region: criteriaObj.watchProviders ? criteriaObj.watchRegion || "US" : undefined,
      with_origin_country: flattenArray(
        criteriaObj.withOriginCountry,
        boolConversion[criteriaObj.watchProviderCompareType] //default to OR conditional
      ),
      sort_by: criteriaObj.sortBy,
    },
  };

  return apiTMDB("/discover/tv", config);
}

export {
  rawTVGetCreditDetails,
  rawTVGetShowCredits,
  rawTVGetEpisodes,
  rawTVGetExternalIds,
  rawTVGetEpisodeExternalIds,
  rawTVGetShowDetails,
  rawTVGetShowSeasonDetails,
  rawTVGetShowEpisodeDetails,
  rawTVGetShowImages,
  rawTVSearchByTitle,
  rawTVGetPopular,
  rawTVWatchProviders,
  rawTVDiscover,
  rawTVGetRecommendations,
  rawTVGetVideos,
  rawTVGetPersonCredits,
  rawTVGetShowEpisodeCredits,
};
