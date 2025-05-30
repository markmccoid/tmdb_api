/**
 * Helper functions
 *
 * @namespace Helpers
 *
 */

import { tmdbConfig } from "./config";

// import { IMG_URL, SECURE_IMG_URL, API_OPTIONS } from './index';
import { parseISO, getUnixTime, format } from "date-fns";

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
  const { IMG_URL, SECURE_IMG_URL, API_OPTIONS } = tmdbConfig.getConfig();
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
    return imgFileName ? [`${baseURL}${size}/${imgFileName.match(regEx)[0]}`] : [""];
  }

  // Process as an array and return an array, also make sure some value exists in each array slot.
  return imgFileName.map((file) => (file ? `${baseURL}${size}/${file.match(regEx)[0]}` : ""));
}

function formatImageURLBeforeInit(imgFileName, size = "m", secureURL = true, IMG_URL) {
  // const { IMG_URL, SECURE_IMG_URL, API_OPTIONS } = tmdbConfig.getConfig();
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
  let baseURL = IMG_URL;

  // Get rid of any preceding '/'  in the passed imgFileName
  let regEx = /[^\/].*/;
  // If imgFileName IS NOT an array, then process as single file, but still return array
  if (!Array.isArray(imgFileName)) {
    return imgFileName ? [`${baseURL}${size}/${imgFileName.match(regEx)[0]}`] : [""];
  }

  // Process as an array and return an array, also make sure some value exists in each array slot.
  return imgFileName.map((file) => (file ? `${baseURL}${size}/${file.match(regEx)[0]}` : ""));
}

export function averageOfArray(arr) {
  return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
}

/**
 * Parses passed date
 *
 * @memberof Helpers
 * @param {string} dateString - date string to parse
 * @returns {object} - return object
 *  {
 *    date, // - javascript date format
 *    epoch, // - Unix epoch timestamp in seconds
 *    formatted // - Formatted date.  Default "MM-dd-yyyy" or passed in main invokation
 *  }
 */
function parseToDate(dateString) {
  const { API_OPTIONS } = tmdbConfig.getConfig();
  if (!dateString || dateString === "") {
    return undefined;
  }

  let theDate = parseISO(dateString); // date-fns to convert to javascript date object
  return {
    date: theDate,
    epoch: getUnixTime(theDate),
    formatted: format(theDate, API_OPTIONS.dateFormatString),
  }; // Turns the return milliseconds into seconds (unix date)
}

/**
 * Flattens the passed array (only a single dimensional array)
 * Used in the discover movie function
 *
 * @memberof Helpers
 * @param {array} arr - array to flatten
 * @param {string} delimiter - string to delimit flattened array with
 * @returns {string} - Flat array
 */
function flattenArray(arr, delimiter = ",") {
  if (!arr) {
    return undefined;
  }
  let flatArray = "";
  arr.forEach((value, idx) => {
    flatArray +=
      idx === 0 ? `${value.toString().trim()}` : `${delimiter}${value.toString().trim()}`;
  });
  return flatArray;
}

export { formatImageURL, formatImageURLBeforeInit, parseToDate, flattenArray };
