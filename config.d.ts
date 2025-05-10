import { getConfig } from "./config";
import { AxiosResponse } from "axios";

export interface TMDBConfig {
  IMG_URL: string;
  SECURE_IMG_URL: string;
  API_KEY: string;
  TV_GENRE_OBJ: { [key: number]: string };
  MOVIE_GENRE_OBJ: { [key: number]: string };
  API_OPTIONS: {
    dateFormatString: string;
    defaultAPIParams: { include_adult: boolean };
  };
}

export interface TMDBConfigManager {
  initialize(apiKey: string, options?: Partial<TMDBConfig["API_OPTIONS"]>): Promise<void>;
  getConfig(): TMDBConfig;
}

export const tmdbConfig: TMDBConfigManager;

export function getTMDBConfig(apiKey: string): Promise<{
  data: {
    images: {
      base_url: string;
      secure_base_url: string;
    };
    sortedWatchProviders: any[];
  };
  apiCall: string;
}>;

function getTVGenres(
  apiKey: string,
  convertToObjectFlag?: boolean
): Promise<{
  data: { [key: number]: string } | { genres: { id: number; name: string }[] };
  apiCall: string;
}>;

export function getMovieGenres(
  apiKey: string,
  convertToObjectFlag?: boolean
): Promise<{
  data: { [key: number]: string } | { genres: { id: number; name: string }[] };
  apiCall: string;
}>;

export const genreTVDefaultObj: { id: number; name: string }[];
export const genreMovieDefaultObj: { id: number; name: string }[];
