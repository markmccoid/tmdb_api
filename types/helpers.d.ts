export function averageOfArray(arr: any): number;
/**
 * Returns and array with one or more full URLs to an image.
 *
 * @memberof Helpers
 * @param {(string|string[])} imgFileName - file name of the image or Array of filenames.
 * @param {string} [size=m] - 's', *'m', 'l', 'original'.
 * @param {boolean} [secureURL=true] - return the https or http - *true
 * @returns {string[]} full URL to the image
 */
export function formatImageURL(imgFileName: (string | string[]), size?: string, secureURL?: boolean): string[];
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
export function parseToDate(dateString: string): object;
/**
 * Flattens the passed array (only a single dimensional array)
 * Used in the discover movie function
 *
 * @memberof Helpers
 * @param {array} arr - array to flatten
 * @param {string} delimiter - string to delimit flattened array with
 * @returns {string} - Flat array
 */
export function flattenArray(arr: any[], delimiter?: string): string;
