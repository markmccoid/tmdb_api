export type DateObject = {
  date?: Date;
  epoch: number;
  formatted: string;
};

// -- BASE Generics
export type BaseSinglePage<T> = {
  data: T;
  apiCall: string;
};

//_-- WAS Thinking that it might be useful to type each piece separately. Not sure.
// export type MultiPageData<T> = {
//   page: number;
//   totalResults: number;
//   totalPages: number;
//   results: T;
// }

export type BaseMultiPage<T> = {
  data: {
    page: number;
    totalResults: number;
    totalPages: number;
    results: T;
  };
  apiCall: string;
};
//= == BASE Generics END =======

// -- TV IMAGES
export type TVGetImages = {
  // array of image URLs (https://...)
  data: string[];
  apiCall: string;
};

export function tvGetImages(
  showId: number,
  imageType?: "posters" | "backdrops"
): Promise<TVGetImages>;

// -- TV SHOW SEARCH
export type TVSearchResultItem = {
  id: number;
  name: string;
  originalName: string;
  overview: string;
  firstAirDate: any;
  backdropURL: string;
  posterURL: string;
  genres: string[];
  popularity: number;
  originalLanguage: string;
};
export type TVSearchResultBase = BaseMultiPage<TVSearchResultItem[]>;

export function tvSearchByTitle(
  searchValue: string,
  page?: number
): Promise<TVSearchResultBase>;

export function tvGetPopular(
  page?: number,
  language?: string
): Promise<TVSearchResultBase>;

// -- tvGetShowDetails --------------------
// When getting show details, you get this info on each season
export type TVDetailSeasons = {
  id: number;
  seasonNumber: number;
  posterURL: string;
  name: string;
  overview: string;
  episodeCount: number;
  airDate: DateObject;
};

export type TVShowDetails = {
  id: number;
  name: string;
  overview: string;
  status: string;
  tagLine: string;
  popularity: number;
  avgEpisodeRunTime: number;
  firstAirDate: DateObject;
  lastAirDate: DateObject;
  posterURL: string;
  backdropURL: string;
  homePage: string;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  genres: string[];
  imdbId: string;
  imdbURL: string;
  instagramId: string;
  tvdbId: number;
  tvRageId: number;
  twitterId: string;
  facebookdId: string;
  seasons: TVDetailSeasons[];
};

export type TVShowDetailsBase = BaseSinglePage<TVShowDetails>;

// This is a comment over tvGetShowDetails
export function tvGetShowDetails(showId: number): Promise<TVShowDetailsBase>;

//= == tvGetShowDetails END =====================

// -- tvGetShowCredits -----------
/**
 * returns show credits for showId passed
 *
 * @memberOf Curated_API_TV
 * @method
 * @param {(number)} showId - showId from TMDb API Show Search.
 * @returns {TVCredits}
 */
export type CastType = {
  characterName: string;
  creditId: number;
  personId: number;
  name: string;
  gender: number; // 1 = female, 2 = male
  profileURL: string;
  order: number;
};
export type CrewType = {
  creditId: number;
  personId: number;
  name: string;
  gender: number; // 1 = female, 2 = male
  profileURL: string;
  job: string;
  department: string;
};

export type TVCredits = BaseSinglePage<{
  cast: CastType[];
  crew: CrewType[];
}>;

export function tvGetShowCredits(showId: string): Promise<TVCredits>;
//= == tvGetShowCredits END =====================

// -- tvDiscover ---------------------

export type SortByOptions =
  | "popularity.asc"
  | "popularity.desc"
  | "release_date.asc"
  | "release_date.desc"
  | "revenue.asc"
  | "revenue.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "original_title.asc"
  | "original_title.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc";

export type DiscoverCriteria = {
  genres?: string[]; // genre Ids
  genreCompareType?: "AND" | "OR" | undefined; // "AND" (,) if want movies with all ids or "OR" (|) for movies with any (default to OR)
  firstAirDateYear?: number; // Primary Release Year
  releaseDateGTE?: string; // movies with release date >= date YYYY-MM-DD
  releaseDateLTE?: string; // movies with release date <= date YYYY-MM-DD
  cast?: number[]; // person Ids. Only include movies that have one of the Id's added as an actor.
  castCompareType?: "AND" | "OR" | undefined; // "AND" if want movies with all ids or "OR" for movies with any
  crew?: number[]; // person Ids. Only include movies that have one of the Id's added as a crew member.
  crewCompareType?: "AND" | "OR" | undefined; // "AND" if want movies with all ids or "OR" for movies with any
  watchProviders?: string[]; // ids of watch providers that movie is located on.
  watchProviderCompareType?: "AND" | "OR" | undefined; // "AND" if want movies with all ids or "OR" for movies with any (defaults to OR)
  watchRegions?: string[];
  sortBy?: SortByOptions;
};

export function tvDiscover(
  criteriaObj: DiscoverCriteria,
  page: number
): Promise<TVSearchResult>;

// == END tvDiscover ==============

// -- tvGetWatchProviders ---------------------

/*
//---REGIONS  PUT INTO Type
{
  "results": [
    {
      "iso_3166_1": "AR",
      "english_name": "Argentina",
      "native_name": "Argentina"
    },
    {
      "iso_3166_1": "AT",
      "english_name": "Austria",
      "native_name": "Austria"
    },
    {
      "iso_3166_1": "AU",
      "english_name": "Australia",
      "native_name": "Australia"
    },
    {
      "iso_3166_1": "BE",
      "english_name": "Belgium",
      "native_name": "Belgium"
    },
    {
      "iso_3166_1": "BG",
      "english_name": "Bulgaria",
      "native_name": "Bulgaria"
    },
    {
      "iso_3166_1": "BR",
      "english_name": "Brazil",
      "native_name": "Brazil"
    },
    {
      "iso_3166_1": "CA",
      "english_name": "Canada",
      "native_name": "Canada"
    },
    {
      "iso_3166_1": "CH",
      "english_name": "Switzerland",
      "native_name": "Switzerland"
    },
    {
      "iso_3166_1": "CZ",
      "english_name": "Czech Republic",
      "native_name": "Czech Republic"
    },
    {
      "iso_3166_1": "DE",
      "english_name": "Germany",
      "native_name": "Germany"
    },
    {
      "iso_3166_1": "DK",
      "english_name": "Denmark",
      "native_name": "Denmark"
    },
    {
      "iso_3166_1": "EE",
      "english_name": "Estonia",
      "native_name": "Estonia"
    },
    {
      "iso_3166_1": "ES",
      "english_name": "Spain",
      "native_name": "Spain"
    },
    {
      "iso_3166_1": "FI",
      "english_name": "Finland",
      "native_name": "Finland"
    },
    {
      "iso_3166_1": "FR",
      "english_name": "France",
      "native_name": "France"
    },
    {
      "iso_3166_1": "GB",
      "english_name": "United Kingdom",
      "native_name": "United Kingdom"
    },
    {
      "iso_3166_1": "HU",
      "english_name": "Hungary",
      "native_name": "Hungary"
    },
    {
      "iso_3166_1": "ID",
      "english_name": "Indonesia",
      "native_name": "Indonesia"
    },
    {
      "iso_3166_1": "IE",
      "english_name": "Ireland",
      "native_name": "Ireland"
    },
    {
      "iso_3166_1": "IN",
      "english_name": "India",
      "native_name": "India"
    },
    {
      "iso_3166_1": "IT",
      "english_name": "Italy",
      "native_name": "Italy"
    },
    {
      "iso_3166_1": "JP",
      "english_name": "Japan",
      "native_name": "Japan"
    },
    {
      "iso_3166_1": "KR",
      "english_name": "South Korea",
      "native_name": "South Korea"
    },
    {
      "iso_3166_1": "LT",
      "english_name": "Lithuania",
      "native_name": "Lithuania"
    },
    {
      "iso_3166_1": "MX",
      "english_name": "Mexico",
      "native_name": "Mexico"
    },
    {
      "iso_3166_1": "NL",
      "english_name": "Netherlands",
      "native_name": "Netherlands"
    },
    {
      "iso_3166_1": "NO",
      "english_name": "Norway",
      "native_name": "Norway"
    },
    {
      "iso_3166_1": "NZ",
      "english_name": "New Zealand",
      "native_name": "New Zealand"
    },
    {
      "iso_3166_1": "PH",
      "english_name": "Philippines",
      "native_name": "Philippines"
    },
    {
      "iso_3166_1": "PL",
      "english_name": "Poland",
      "native_name": "Poland"
    },
    {
      "iso_3166_1": "PT",
      "english_name": "Portugal",
      "native_name": "Portugal"
    },
    {
      "iso_3166_1": "RU",
      "english_name": "Russia",
      "native_name": "Russia"
    },
    {
      "iso_3166_1": "SE",
      "english_name": "Sweden",
      "native_name": "Sweden"
    },
    {
      "iso_3166_1": "TR",
      "english_name": "Turkey",
      "native_name": "Turkey"
    },
    {
      "iso_3166_1": "US",
      "english_name": "United States of America",
      "native_name": "United States"
    },
    {
      "iso_3166_1": "ZA",
      "english_name": "South Africa",
      "native_name": "South Africa"
    }
  ]
}
*/
export type WatchProvider = {
  providerId: number;
  provider: string;
  displayPriority: number;
  logoURL: string;
};

export type TVWatchProviders = {
  showId: number;
  results: {
    [string]: {
      justWatchLink: string;
      stream: WatchProvider[];
      buy: WatchProvider[];
      rent: WatchProvider[];
    };
  };
};

export type TVWatchProvidersBase = BaseSinglePage<TVWatchProviders>;

export function tvGetWatchProviders(
  showId: number,
  countryCodes: string[] = ["US"]
);

// == END tvGetWatchProviders ==============
