/**
 * Helper functions
 *
 * @namespace Helpers
 *
 */

import { getTMDBConsts } from "./index";
import { parse } from "date-fns";

/**
 * Returns and array with one or more full URLs to an image.
 *
 * @memberof Helpers
 * @param {(string|string[])} imgFileName - file name of the image or Array of filenames.
 * @param {string} [size=m] - 's', *'m', 'l', 'original'.
 * @param {boolean} [secureURL=true] - return the https or http - *true
 * @returns {string[]} full URL to the image
 */
function formatImageURL(imgFileName, size = "m", secureURL = true) {
  let { IMG_URL, SECURE_IMG_URL } = getTMDBConsts();
  // Hardcoding s, m, l for now
  switch (size) {
    case "s":
      size = "w185";
      break;
    case "m":
      size = "w300";
      break;
    case "l":
      size = "w500";
      break;
    case "original":
      size = "original";
      break;
    default:
      size = "w300";
  }
  let baseURL = secureURL ? SECURE_IMG_URL : IMG_URL;

  // Get rid of any preceding '/'  in the passed imgFileName
  let regEx = /[^\/].*/;
  // If imgFileName IS NOT an array, then process as single file, but still return array
  if (!Array.isArray(imgFileName)) {
    return imgFileName
      ? [`${baseURL}${size}/${imgFileName.match(regEx)[0]}`]
      : [""];
  }

  // Process as an array and return an array, also make sure some value exists in each array slot.
  return imgFileName.map(file =>
    file ? `${baseURL}${size}/${file.match(regEx)[0]}` : ""
  );
}

export function averageOfArray(arr) {
  return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
}

/**
 * @typeDef {Object} ErrorObj
 * @property {Object} error the error object thrown from original error. Assuming from axios
 * @property {string} status err.response.request.status
 * @property {string} status err.response.request.statusText
 * @property {string} status err.response.request.responseURL
 */
/**
 * When passed an error object, function will return a standardized error
 * object that can be thrown.
 * This is for the raw TMDB API calls.
 *
 * @memberof Helpers
 * @param {*} err - error object from an TMDB API Call
 * @returns {ErrorObj} - formatted error object
 * { error,
 *   status,
 *   statusText,
 *   apiCall
 *  }
 */
function buildRawError(err) {
  return {
    error: err,
    status: err.response ? err.response.request.status : null,
    statusText: err.response ? err.response.request.statusText : null,
    apiCall: err.response
      ? err.response.request.responseURL
      : err.config
      ? err.config.url
      : null
  };
}

/**
 * When passed an error object, function will return a standardized error
 * object that can be thrown.
 * This is for the raw TMDB API calls.
 *
 * @memberof Helpers
 * @param {string} dateString - date string to parse
 * @returns {date}
 */
function parseToDate(dateString) {
  return parse(dateString);
}
export { formatImageURL, buildRawError, parseToDate };
