/**
 * This is the curated API for TV information
 * It uses the TMDBApi_TV.js to pull data and then picks certain
 * data to return and formats it for easy use
 * If you need data not returned in these curated API functions, simply
 * call the "Raw" TMDB API functions
 */

import { formatTVImageURL } from './helpers';
import { getShowImages } from './TMDBApi_TV';
 /**
 * Returns an array of image URLs. Filters and gives only 'en' English images
 * 
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @param {string} [imageType=posters] - *'posters', 'backdrops'
 * @returns {string[]} Array of URLs to the images
 */
export const getImagesForShow = (showId, imageType = 'posters') => {
  let apiCall;
  return getShowImages(showId)
    .then((resp) => {
      // Get array of file_paths
      console.log(resp);
      console.log(resp.data.posters, resp.data.id)
      console.log(imageType)
      apiCall = resp.apiCall
      let imgFilePaths = resp.data[imageType].filter((imgObj) => imgObj.iso_639_1 === 'en')
        .map((imgObj) => {
        return imgObj.file_path;
      });
      // Get the full image URLs
      let formattedImageURLs = formatTVImageURL(imgFilePaths, 'm', true);
      return {
        data: formattedImageURLs,
        apiCall
      }
    });
};