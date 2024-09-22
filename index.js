/**
 *  @fileOverview TMDB API Wrapper module.
 *
 *  @author       Mark McCoid
 */
import { tmdbConfig } from "./config";
/**
 * Updates the API_OPTIONS objects
 *
 * @param {object} options - options object {
 *  dateFormatString //dateFormatString as used by fns-date https://date-fns.org/v2.7.0/docs/format
 * }
 */
// export function updateAPIOptions(options = {}) {
//   API_OPTIONS = { ...API_OPTIONS, ...options };
// }

export async function initTMDB(apiKey, options) {
  await tmdbConfig.initialize(apiKey, options);
  return tmdbConfig;
}

export function getTMDBConsts() {
  return tmdbConfig.getConfig();
}
export * from "./APIRaw";
export * from "./APICurated";
