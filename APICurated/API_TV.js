/**
 * Curated API calls to the tmdb api end points for **TV Shows**.
 *
 * These calls all reference their raw counterparts, but only return selected data points.
 * Also, things like dates are converted to javascript date formats and image data are
 * converted to URL strings.
 * @namespace Curated_API_TV
 *
 */

import { formatImageURL, averageOfArray, parseToDate } from "../helpers";
import {
  rawTVGetShowImages,
  rawTVSearchByTitle,
  rawTVGetShowDetails,
  rawTVGetShowCredits,
  rawTVWatchProviders,
  rawTVGetPopular,
} from "../APIRaw/TMDBApi_TV";
import { TV_GENRE_OBJ } from "../index";

/**
 * @typedef tvGetImages_typedef
 * @type {Object}
 * @property {Array} data array of image URLs (https://...)
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an array of image URLs. Filters and gives only 'en' English images
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @param {string} [imageType=posters] - 'posters', 'backdrops'
 * @returns {string[]} Array of URLs to the images
 */
function tvGetImages(showId, imageType = "posters") {
  let apiCall;
  return rawTVGetShowImages(showId).then((resp) => {
    // Get array of file_paths
    apiCall = resp.apiCall;
    let imgFilePaths = resp.data[imageType]
      .filter((imgObj) => imgObj.iso_639_1 === "en")
      .map((imgObj) => {
        return imgObj.file_path;
      });
    // Get the full image URLs
    let formattedImageURLs = formatImageURL(imgFilePaths, "m", true);
    return {
      data: formattedImageURLs,
      apiCall,
    };
  });
}

/**
 * @typedef tvSearchByTitle_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.page current page returned
 * @property {number} data.totalResults total number of movies search found
 * @property {number} data.totalPages total pages use for pagination
 * @property {Array} data.results results of the search
 * @property {number} data.results.id the tv showId
 * @property {string} data.results.name name of the tv show
 * @property {string} data.results.overview
 * @property {date} data.results.firstAirDate
 * @property {string} data.results.backdropURL
 * @property {array.<string>} data.results.genres array of genre names
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns obj with tv shows like searchValue (tv title) passed.
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} searchValue - TV Show name to search for.
 * @param {number} [page=1] - page to return.  Only works if multiple pages
 * @returns {tvSearchByTitle_typedef} Object data return
 */
function tvSearchByTitle(searchValue, page = 1) {
  // let { TV_GENRE_OBJ } = getTMDBConsts();
  let apiCall;
  let searchResults;
  let showsReturned;
  return rawTVSearchByTitle(searchValue, page).then((resp) => {
    // Curate results
    apiCall = resp.apiCall;
    searchResults = {
      page: resp.data.page,
      totalResults: resp.data.total_results,
      totalPages: resp.data.total_pages,
    };

    showsReturned = resp.data.results.map((show) => {
      return {
        id: show.id,
        name: show.name,
        firstAirDate: parseToDate(show.first_air_date),
        overview: show.overview,
        backdropURL: show.backdrop_path
          ? formatImageURL(show.backdrop_path, "m", true)[0]
          : "",
        genres: show.genre_ids.map((genreId) => TV_GENRE_OBJ[genreId]),
      };
    });

    return {
      data: { ...searchResults, results: showsReturned },
      apiCall,
    };
  });
}

/**
 * @typedef tvShowDetails_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.id the tv showId
 * @property {string} data.name name of the tv show
 * @property {string} data.overview
 * @property {string} data.status
 * @property {number} data.avgEpisodeRunTime average runtime in minutes
 * @property {date} data.firstAirDate
 * @property {date} data.lastAirDate
 * @property {string} data.posterURL
 * @property {string} data.backdropURL
 * @property {string} data.homePage
 * @property {number} data.numberOfEpisodes
 * @property {number} data.numberOfSeasons
 * @property {array.<string>} data.genres array of genre names
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * returns show details for showId passed
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @returns {tvShowDetails_typedef}
 */
function tvGetShowDetails(showId) {
  let apiCall;
  let searchResults;
  return rawTVGetShowDetails(showId).then((resp) => {
    // Curate results
    apiCall = resp.apiCall;
    searchResults = {
      id: resp.data.id,
      name: resp.data.name,
      overview: resp.data.overview,
      status: resp.data.status,
      backdropURL: resp.data.backdrop_path
        ? formatImageURL(resp.data.backdrop_path, "m", true)[0]
        : "",
      posterURL: resp.data.poster_path
        ? formatImageURL(resp.data.poster_path, "m", true)[0]
        : "",
      avgEpisodeRunTime: resp.data.episode_run_time
        ? averageOfArray(resp.data.episode_run_time)
        : 0,
      firstAirDate: parseToDate(resp.data.first_air_date),
      lastAirDate: parseToDate(resp.data.last_air_date),
      homePage: resp.data.homepage,
      numberOfEpisodes: resp.data.number_of_episodes,
      numberOfSeasons: resp.data.number_of_seasons,
      genres: resp.data.genres.map((tvGenreObj) => tvGenreObj.name),
    };

    return {
      data: searchResults,
      apiCall,
    };
  });
}

/**
 * Returns watch providers for passed TV id
 * @memberOf Curated_API_TV
 * @method
 *
 * @param {string} tvId - Tv Id
 * @param {array.<string>} countryCodes - Array of country codes to return
 * @returns {movieWatchProviders_typedef} Object data return
 */
function tvGetWatchProviders(tvId, countryCodes = ["US"]) {
  let watchInfo;
  let searchResults;
  countryCodes = countryCodes.map((el) => el.trim().toUpperCase());

  return rawTVWatchProviders(tvId).then((resp) => {
    const watchProviders = resp.data.results;
    const apiCall = resp.apiCall;
    searchResults = {
      movieId: resp.data.id,
    };
    // loop through countryCodes and return a single object:
    // { [countryCode1]: {}, [countryCode2]: {}, ... }
    watchInfo = countryCodes.reduce((final, code) => {
      // If the code doesn't have a result value, then return an empty set for it.
      const countryWatchInfo = !watchProviders[code]
        ? { [code]: {} }
        : {
            [code]: {
              justWatchLink: watchProviders[code].link,
              stream: !watchProviders[code].flatrate
                ? []
                : watchProviders[code].flatrate.map((el) => ({
                    displayPriority: el.display_priority,
                    logoURL: formatImageURL(el.logo_path, "original", true)[0],
                    providerId: el.provider_id,
                    provider: el.provider_name,
                  })),
              buy: !watchProviders[code].buy
                ? []
                : watchProviders[code].buy.map((el) => ({
                    displayPriority: el.display_priority,
                    logoURL: formatImageURL(el.logo_path, "original", true)[0],
                    providerId: el.provider_id,
                    provider: el.provider_name,
                  })),
              rent: !watchProviders[code].rent
                ? []
                : watchProviders[code].rent.map((el) => ({
                    displayPriority: el.display_priority,
                    logoURL: formatImageURL(el.logo_path, "original", true)[0],
                    providerId: el.provider_id,
                    provider: el.provider_name,
                  })),
            },
          };
      return { ...final, ...countryWatchInfo };
    }, {});

    return {
      data: { ...searchResults, results: watchInfo },
      apiCall,
    };
  });
}

/**
 * @memberOf Curated_API_TV
 * @method
 *
 * @param {string} tvId - tv Id
 * @param {array.<string>} countryCodes - Array of country codes to return
 * @returns {movieWatchProviders_typedef} Object data return
 */
function tvGetPopular(page, language) {
  let apiCall;
  let searchResults;
  let showsReturned;
  return rawTVGetPopular(page, language).then((resp) => {
    // Curate results
    apiCall = resp.apiCall;
    searchResults = {
      page: resp.data.page,
      totalResults: resp.data.total_results,
      totalPages: resp.data.total_pages,
    };

    showsReturned = resp.data.results.map((show) => {
      return {
        id: show.id,
        name: show.name,
        originalName: show.original_name,
        firstAirDate: parseToDate(show.first_air_date),
        overview: show.overview,
        posterURL: show.poster_path ? formatImageURL(show.poster_path, "m", true)[0] : "",
        backdropURL: show.backdrop_path
          ? formatImageURL(show.backdrop_path, "m", true)[0]
          : "",
        genres: show.genre_ids.map((genreId) => TV_GENRE_OBJ[genreId]),
      };
    });

    return {
      data: { ...searchResults, results: showsReturned },
      apiCall,
    };
  });
}

/**
 * @typedef tvCredits_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {Array} data.cast the cast array
 * @property {number} data.cast.personId
 * @property {string} data.cast.name
 * @property {string} data.cast.characterName
 * @property {string} data.cast.creditId
 * @property {number} data.cast.gender 1 is Female, 2 is Male
 * @property {string} data.cast.profileURL
 * @property {string} data.cast.order
 * @property {string} data.crew the crew array
 * @property {number} data.crew.personId
 * @property {string} data.crew.name
 * @property {string} data.crew.creditId
 * @property {string} data.crew.job
 * @property {string} data.crew.department
 * @property {number} data.crew.gender 1 is Female, 2 is Male
 * @property {string} data.crew.profileURL
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * returns show credits for showId passed
 *
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @returns {tvCredits_typedef}
 */
function tvGetShowCredits(showId) {
  return rawTVGetShowCredits(showId).then((resp) => {
    let cast = resp.data.cast.map((character) => {
      return {
        characterName: character.character,
        creditId: character.credit_id,
        personId: character.id,
        name: character.name,
        gender: character.gender,
        profileURL: character.profile_path
          ? formatImageURL(character.profile_path, "m", true)[0]
          : "",
        order: character.order,
      };
    });
    let crew = resp.data.crew.map((crewMember) => {
      return {
        creditId: crewMember.credit_id,
        personId: crewMember.id,
        name: crewMember.name,
        gender: crewMember.gender,
        profileURL: crewMember.profile_path
          ? formatImageURL(crewMember.profile_path, "m", true)[0]
          : "",
        job: crewMember.job,
        department: crewMember.department,
      };
    });
    return {
      data: { cast, crew },
      apiCall: resp.apiCall,
    };
  });
}

export {
  tvGetImages,
  tvSearchByTitle,
  tvGetShowDetails,
  tvGetShowCredits,
  tvGetPopular,
  tvGetWatchProviders,
};
