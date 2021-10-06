import { format } from 'date-fns';
import { apiTMDB } from '../apiCalls';
import { flattenArray } from '../helpers';

// const API_URL = 'https://api.themoviedb.org/3';

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
function rawMovieWatchProviders(movieId) {
  return apiTMDB(`/movie/${movieId}/watch/providers`);
}

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
function rawMovieSearchByTitle(searchString, page = 1) {
  const config = {
    params: {
      page,
      include_adult: false,
      query: searchString,
    },
  };
  return apiTMDB('/search/movie', config);
}

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
function rawMovieGetDetails(movieId) {
  const config = {
    params: {
      append_to_response: 'videos',
    },
  };
  return apiTMDB(`/movie/${movieId}`, config);
}

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
function rawMovieGetVideos(movieId) {
  return apiTMDB(`/movie/${movieId}/videos`);
}

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
function rawMovieGetRecommendations(movieId, page = 1) {
  const config = {
    params: {
      page,
    },
  };
  return apiTMDB(`/movie/${movieId}/recommendations`, config);
}

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
function rawMovieGetNowPlaying(page = 1, language = 'en-US') {
  const config = {
    params: {
      page,
      language,
    },
  };
  return apiTMDB(`/movie/now_playing`, config);
}

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
function rawMovieUpcoming(page = 1, language = 'en-US') {
  const config = {
    params: {
      page,
      language,
    },
  };
  return apiTMDB(`/movie/upcoming`, config);
}

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
function rawMovieGetPopular(page = 1, language = 'en-US') {
  const config = {
    params: {
      page,
      language,
    },
  };
  return apiTMDB(`/movie/popular`, config);
}

/**
 * Returns show images for passed movieId from TMDb.
 *
 * @memberOf Raw_API_Movies
 * @param {string} movieId - TMDb show id
 * @returns {object} response object {data, msg}
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
function rawMovieGetImages(movieId) {
  return apiTMDB(`/movie/${movieId}/images`);
}

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
function rawMovieGetPersonCredits(personId) {
  return apiTMDB(`/person/${personId}/movie_credits`);
}

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
function rawMovieGetCredits(movieId) {
  return apiTMDB(`/movie/${movieId}/credits`);
}

/**
 * criteriaObj {
 *  genres: [] // genre Ids
 *  genreCompareType: string // "AND" (,) if want movies with all ids or "OR" (|) for movies with any (default to OR)
 *  releaseYear: int // Primary Release Year
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
 * @memberOf Raw_API_Movies
 * @param {object} criteriaObj - object with criteria to search with
 * @returns {object} response object {data, apiCall}
 */
const boolConversion = {
  AND: ',',
  OR: '|',
  undefined: '|',
};
function rawMovieDiscover(criteriaObj, page = 1) {
  const { releaseDateGTE, releaseDateLTE } = criteriaObj;
  // This is the config object that will be passed to the api call
  let config = {
    params: {
      page,
      with_genres: flattenArray(
        criteriaObj.genres,
        boolConversion[criteriaObj.genreCompareType]
      ),
      primary_release_year: criteriaObj.releaseYear,
      [`primary_release_date.lte`]:
        typeof releaseDateLTE === 'date'
          ? format(releaseDateLTE, 'YYYY-MM-DD')
          : releaseDateLTE,
      [`primary_release_date.gte`]:
        typeof releaseDateGTE === 'date'
          ? format(releaseDateGTE, 'YYYY-MM-DD')
          : releaseDateGTE,
      with_crew: flattenArray(
        criteriaObj.crew,
        boolConversion[criteriaObj.crewCompareType]
      ),
      with_cast: flattenArray(
        criteriaObj.cast,
        boolConversion[criteriaObj.castCompareType]
      ),
      with_watch_providers: flattenArray(
        criteriaObj.watchProviders,
        boolConversion[criteriaObj.watchProviderCompareType] //default to OR conditional
      ),
      watch_region: criteriaObj.watchProviders
        ? criteriaObj.watchRegion || 'US'
        : undefined,
    },
  };

  return apiTMDB('/discover/movie', config);
}

export {
  rawMovieSearchByTitle,
  rawMovieGetDetails,
  rawMovieGetVideos,
  rawMovieGetRecommendations,
  rawMovieGetImages,
  rawMovieGetPersonCredits,
  rawMovieUpcoming,
  rawMovieGetNowPlaying,
  rawMovieGetPopular,
  rawMovieDiscover,
  rawMovieGetCredits,
  rawMovieWatchProviders,
};
