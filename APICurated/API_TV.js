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
  rawTVGetShowCredits
} from "../APIRaw/TMDBApi_TV";
import { getTMDBConsts } from "../index";
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
  return rawTVGetShowImages(showId).then(resp => {
    // Get array of file_paths
    apiCall = resp.apiCall;
    let imgFilePaths = resp.data[imageType]
      .filter(imgObj => imgObj.iso_639_1 === "en")
      .map(imgObj => {
        return imgObj.file_path;
      });
    // Get the full image URLs
    let formattedImageURLs = formatImageURL(imgFilePaths, "m", true);
    return {
      data: formattedImageURLs,
      apiCall
    };
  });
}

/**
 * Returns obj with tv shows like searchValue (tv title) passed.
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} searchValue - TV Show name to search for.
 * @param {number} [page=1] - page to return.  Only works if multiple pages
 * @returns {Object} Object data return
 */
function tvSearchByTitle(searchValue, page = 1) {
  let { TV_GENRE_OBJ } = getTMDBConsts();
  // console.log('TV Genre', TV_GENRE_OBJ)
  let apiCall;
  let searchResults;
  let showsReturned;
  return rawTVSearchByTitle(searchValue, page).then(resp => {
    // Curate results
    apiCall = resp.apiCall;
    searchResults = {
      page: resp.data.page,
      totalResults: resp.data.total_results,
      totalPages: resp.data.total_pages
    };
    showsReturned = resp.data.results.map(show => {
      return {
        id: show.id,
        name: show.name,
        firstAirDate: show.first_air_date && parseToDate(show.first_air_date),
        overview: show.overview,
        backdropURL: show.backdrop_path
          ? formatImageURL(show.backdrop_path, "m", true)[0]
          : "",
        genres: show.genre_ids.map(genreId => TV_GENRE_OBJ[genreId])
      };
    });

    return {
      data: { ...searchResults, results: showsReturned },
      apiCall
    };
  });
}

/**
 * returns show details for showId passed
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @returns {Object}
 */
function tvGetShowDetails(showId) {
  let apiCall;
  let searchResults;
  return rawTVGetShowDetails(showId).then(resp => {
    // Curate results
    apiCall = resp.apiCall;
    searchResults = {
      id: resp.data.id,
      name: resp.data.name,
      overview: resp.data.overview,
      backdropURL: resp.data.backdrop_path
        ? formatImageURL(resp.data.backdrop_path, "m", true)[0]
        : "",
      posterURL: resp.data.poster_path
        ? formatImageURL(resp.data.poster_path, "m", true)[0]
        : "",
      avgEpisodeRunTime: resp.data.episode_run_time
        ? averageOfArray(resp.data.episode_run_time)
        : 0,
      firstAirDate:
        resp.data.first_air_date && parseToDate(resp.data.first_air_date),
      lastAirDate:
        resp.data.last_air_date && parseToDate(resp.data.last_air_date),
      homePage: resp.data.homepage,
      numberOfEpisodes: resp.data.number_of_episodes,
      numberOfSeasons: resp.data.number_of_seasons,
      genres: resp.data.genres.map(tvGenreObj => tvGenreObj.name),
      getImagesForShow: () => getImagesForShow(showId)
    };

    return {
      data: searchResults,
      apiCall
    };
  });
}

/**
 * returns show credits for showId passed
 *
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @returns {Object}
 */
function tvGetShowCredits(showId) {
  return rawTVGetShowCredits(showId).then(resp => {
    let cast = resp.data.cast.map(character => {
      return {
        characterName: character.character,
        creditId: character.credit_id,
        personId: character.id,
        name: character.name,
        gender: character.gender,
        profileURL: character.profile_path
          ? formatImageURL(character.profile_path, "m", true)[0]
          : "",
        order: character.order
      };
    });
    let crew = resp.data.cast.map(crewMember => {
      return {
        creditId: crewMember.credit_id,
        personId: crewMember.id,
        name: crewMember.name,
        gender: crewMember.gender,
        profileURL: crewMember.profile_path
          ? formatImageURL(crewMember.profile_path, "m", true)[0]
          : "",
        job: crewMember.job,
        department: crewMember.department
      };
    });
    return {
      data: { cast, crew },
      apiCall: resp.apiCall
    };
  });
}

export { tvGetImages, tvSearchByTitle, tvGetShowDetails, tvGetShowCredits };
