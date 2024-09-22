import { TMDBConfig } from "../config";

export type InitOptionsType = Partial<TMDBConfig["API_OPTIONS"]>;

/**
 * Initialization function that MUST be run before any other
 * function can be accessed.
 * Set a number of constants that can be accessed
 * by calling the getTMDBConsts() function or by importing the
 * constants themselves
 * @param apiKey - required API Key to access TMDB
 * @param options - options object
 */
export function initTMDB(apiKey: string, options?: InitOptionsType): Promise<TMDBConfig>;

/**
 * This function returns the needed constants that the TDMB calls
 * need to get their data
 */
export function getTMDBConsts(): TMDBConfig;

// Re-export everything from APIRaw and APICurated
export * from "./APIRaw";
export * from "./APICurated";
