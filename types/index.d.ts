export type initOptionsType = {
  dateFormateString: string;
};
/**
 * Initialization function that MUST be run before any other
 * function can be accessed.
 * Set a number of constants that can be accessed
 * by calling the getTMDBConsts() function or by importing the
 * constants themselves
 * @param {string} apiKey - required API Key to access TMDB
 * @param {object} options - options object {
 *  dateFormatString //dateFormatString as used by fns-date https://date-fns.org/v2.7.0/docs/format
 * }
 */
export function initTMDB(apiKey: string, options?: initOptionsType): Promise<void>;
/**
 * Updates the API_OPTIONS objects
 *
 * @param {object} options - options object {
 *  dateFormatString //dateFormatString as used by fns-date https://date-fns.org/v2.7.0/docs/format
 * }
 */
export function updateAPIOptions(options?: object): void;
/**
 * This function returns the needed constants that the TDMB calls
 * need to get their data
 * @param {object}  - TMDB Constants
 *
 */
export function getTMDBConsts(): {
  API_URL: string;
  API_KEY: any;
  IMG_URL: string;
  SECURE_IMG_URL: string;
  TV_GENRE_OBJ: any;
  MOVIE_GENRE_OBJ: any;
  API_OPTIONS: {
    dateFormatString: string;
  };
};
export const API_URL: "https://api.themoviedb.org/3";
export let IMG_URL: string;
export let SECURE_IMG_URL: string;
export let API_KEY: any;
export let TV_GENRE_OBJ: any;
export let MOVIE_GENRE_OBJ: any;
export namespace API_OPTIONS {
  const dateFormatString: string;
}
export function getConfig(): object;
export type Genres = {
  apiCall: string;
  data: {
    genres: {
      id: number;
      name: string;
    }[];
  };
};

export type GenresObject = { apiCall: string; [number]: [string] };
//-- If false or undefined is passed then return will be Genres
//-- If true is passed then return will be GenresObject
export function getTVGenres(convertToObjectFlag?: false | undefined): Promise<Genres>;
export function getTVGenres(convertToObjectFlag?: true): Promise<GenresObject>;
export function getMovieGenres(convertToObjectFlag?: false | undefined): Promise<Genres>;
export function getMovieGenres(convertToObjectFlag?: true): Promise<GenresObject>;
export * from "./APIRaw";
export * from "./APICurated";
