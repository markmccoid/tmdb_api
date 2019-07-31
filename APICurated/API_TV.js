/**
 * @desc
 * This is the curated API for TV information
 * It uses the TMDBApi_TV.js to pull data and then picks certain
 * data to return and formats it for easy use
 * If you need data not returned in these curated API functions, simply
 * call the "Raw" TMDB API functions
 */

import { formatImageURL, averageOfArray } from "../helpers";
import {
  rawGetShowImages,
  rawSearchTVByTitle,
  rawGetShowDetails
} from "../APIRaw/TMDBApi_TV";
import { getTMDBConsts } from "../index";
/**
 * Returns an array of image URLs. Filters and gives only 'en' English images
 * @memberOf Curated_API
 * @method
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @param {string} [imageType=posters] - 'posters', 'backdrops'
 * @returns {string[]} Array of URLs to the images
 */
export const getImagesForShow = (showId, imageType = "posters") => {
  let apiCall;
  return rawGetShowImages(showId).then(resp => {
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
};

/**
 * Returns an array of image URLs. Filters and gives only 'en' English images
 * @method
 * @param {(string)} searchValue - TV Show name to search for.
 * @param {number} [page=1] - page to return.  Only works if multiple pages
 * @returns {Object} Object data return
 */
export const tvSearchByTitle = (searchValue, page = 1) => {
  let { TV_GENRE_OBJ } = getTMDBConsts();
  // console.log('TV Genre', TV_GENRE_OBJ)
  let apiCall;
  let searchResults;
  let showsReturned;
  return rawSearchTVByTitle(searchValue, page).then(resp => {
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
        firstAirDate: show.first_air_date,
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
};

/**
 * Returns an array of image URLs. Filters and gives only 'en' English images
 * @method
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @returns {Object}
 */
export const tvGetShowDetails = showId => {
  let apiCall;
  let searchResults;
  return rawGetShowDetails(showId).then(resp => {
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
      firstAirDate: resp.data.first_air_date,
      lastAirDate: resp.data.last_air_date,
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
};
