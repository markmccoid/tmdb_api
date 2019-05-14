/**
 * Helper functions
 */
import { getTMDBConsts } from './index';

/**
 * Returns and array with one or more full URLs to an image.
 * 
 * @param {(string|string[])} imgFileName - file name of the image or Array of filenames.
 * @param {string} [size=m] - 's', *'m', 'l', 'original'.
 * @param {boolean} [secureURL=true] - return the https or http - *true
 * @returns {string[]} full URL to the image 
 */
export const formatTVImageURL = (imgFileName, size = 'm', secureURL=true) => {
  let { IMG_URL, SECURE_IMG_URL } = getTMDBConsts();
  // Hardcoding s, m, l for now
  switch (size) {
    case 's': 
      size = 'w185';
      break;
    case 'm': 
      size = 'w300';
      break;      
    case 'l': 
      size = 'w500';
      break;
    case 'original': 
      size = 'original';
      break;
    default:
      size = 'w300';
  }
  let baseURL = secureURL ? SECURE_IMG_URL : IMG_URL;

  // Get rid of any preceding '/'  in the passed imgFileName
  let regEx = /[^\/].*/;
  // If imgFileName IS NOT an array, then process as single file, but still return array
  if (!Array.isArray(imgFileName)) {
    return imgFileName ? [`${baseURL}${size}/${imgFileName.match(regEx)[0]}`] : [''];
  }

  // Process as an array and return an array, also make sure some value exists in each array slot.
  return imgFileName.map(file => file ? `${baseURL}${size}/${file.match(regEx)[0]}` : '');
};