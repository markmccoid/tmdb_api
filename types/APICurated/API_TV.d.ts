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
// returned when aspect ratio needed
export type TVGetImagesAspect = {
  data: { aspectRatio: number; URL: string }[];
  apiCall: string;
};

export function tvGetImages(
  showId: number,
  imageType?: "posters" | "backdrops" | "logos",
  includeAspectRatio?: false
): Promise<TVGetImages>;

export function tvGetImages(
  showId: number,
  imageType?: "posters" | "backdrops" | "logos",
  includeAspectRatio?: true
): Promise<TVGetImagesAspect>;

// -- TV SHOW SEARCH
// -- The TVSearchResultItem type is used for
// -- Search Results
// -- Recommended Search Results
export type TVSearchResultItem = {
  id: number;
  name: string;
  originalName: string;
  overview: string;
  firstAirDate: DateObject;
  backdropURL: string;
  posterURL: string;
  genres: string[];
  popularity: number;
  originalLanguage: string;
};
export type TVSearchResultBase = BaseMultiPage<TVSearchResultItem[]>;

export function tvSearchByTitle(searchValue: string, page?: number): Promise<TVSearchResultBase>;

export function tvGetPopular(page?: number, language?: string): Promise<TVSearchResultBase>;

// -- tvGetShowDetails --------------------
// When getting show details, you get this info on each season
export type TVDetail_Seasons = {
  id: number;
  seasonNumber: number;
  posterURL: string;
  name: string;
  overview: string;
  episodeCount: number;
  airDate: DateObject;
};

type Episode = {
  id: number;
  seasonNumber: number;
  episodeNumber: number;
  name: string;
  overview: string;
  airDate: DateObject;
  stillURL: string;
  runTime: number;
};

export type TVDetail_Networks = {
  id: number;
  name: string;
  logoURL: string;
  originCountry: string;
};

export type Videos = {
  id: string;
  language: string;
  country: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  videoURL: string;
  videoThumbnailURL: string;
};

type ImageObj = {
  aspectRatio: number;
  imageURL: string;
};
export type AppendedImages = {
  backdrops: ImageObj;
  posters: ImageObj;
  logos: ImageObj;
};
export type TVShowRecommendations = {
  id: number; // Unique identifier for the media item
  name: string; // Name of the media item
  backdrop_path: string | null; // Path to the backdrop image (nullable if not available)
  poster_path: string | null; // Path to the poster image (nullable if not available)
  genres: string[]; // Array of genre names associated with the media item
  original_name: string; // Original name of the media item
  overview: string; // Description or summary of the media item
  media_type: "tv" | "movie"; // Type of media (e.g., "tv" or "movie")
  adult: boolean; // Indicates if the content is for adults
  original_language: string; // Language code (e.g., "en" for English)
  popularity: number; // Popularity score of the media item
  vote_average: number; // Average vote score
  vote_count: number; // Total number of votes
  first_air_date: DateObject; // First air date
  origin_country?: string[]; // Array of origin countries (optional, as it may not exist for some media types)
};
export type AggrCastType = {
  roles: {
    characterName: string;
    creditId: string;
    episodeCount: number;
  }[];
  personId: number;
  name: string;
  gender: number; // 1 = female, 2 = male
  profileURL: string;
  order: number;
};
export type AggrCrewType = {
  jobs: {
    creditId: string;
    job: string;
    episodeCount: number;
  }[];
  personId: number;
  name: string;
  gender: number; // 1 = female, 2 = male
  profileURL: string;
  department: string;
};

export type AggregatedCredits = {
  cast: AggrCastType[];
  crew: AggrCrewType[];
};

export type TVShowDetails = {
  id: number;
  name: string;
  originalName: string;
  overview: string;
  status: string;
  tagLine: string;
  popularity: number;
  avgEpisodeRunTime: number;
  firstAirDate: DateObject;
  lastAirDate: DateObject;
  nextAirDate: DateObject;
  posterURL: string;
  backdropURL: string;
  homePage: string;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  inProduction: boolean;
  genres: string[];
  imdbId: string;
  imdbURL: string;
  imdbEpisodesURL: string;
  instagramId: string;
  tvdbId: number;
  tvRageId: number;
  twitterId: string;
  facebookdId: string;
  seasons: TVDetail_Seasons[];
  lastEpisodeToAir: Episode;
  nextEpisodeToAir: Episode;
  networks: TVDetail_Networks[];
  videos?: Videos[];
  credits?: TVCredits;
  aggregated_credits?: AggregatedCredits;
  recommendations?: TVShowRecommendations[];
  images?: AppendedImages;
};

export type TVShowDetailsBase = BaseSinglePage<TVShowDetails>;

export type AppendParams =
  | "videos"
  | "credits"
  | "aggregate_credits"
  | "images"
  | "recommendations"
  | "keywords"
  | "translations";
// - FUNCTION Export
export function tvGetShowDetails(
  showId: number,
  appendToResponse?: AppendParams[]
): Promise<TVShowDetailsBase>;

//= == tvGetShowDetails END =====================

//-- tvGetShowSeasonDetails --------------------

type TVShowSeasonDetails = {
  id: number;
  seasonNumber: number;
  name: string;
  overview: string;
  posterURL: string;
  airDate: DateObject;
  episodes: Episode[];
  episodeAvgRunTime: number;
};

export type TVShowSeasonBase = BaseSinglePage<TVShowSeasonDetails>;

export function tvGetShowSeasonDetails(
  tvShowId: number,
  seasonNumber: number
): Promise<TVShowSeasonBase>;

//= == tvGetShowSeasonDetails END =====================

//-- tvGetShowEpisodeDetails --------------------

type TVShowEpisodeDetails = {
  id: number;
  seasonNumber: number;
  name: string;
  overview: string;
  stillURL: string;
  airDate: DateObject;
  episodeNumber: number;
  guestStars: CastType[];
  crew: Omit<CrewType, "gender" | "personId">[];
  cast?: CastType[];
};
export type TVShowEpisodeDetailsBase = BaseSinglePage<TVShowEpisodeDetails>;

export function tvGetShowEpisodeDetails(
  tvShowId: number,
  seasonNumber: number,
  episodeNumber: number,
  appendToResponse: string[] | string
): Promise<TVShowEpisodeDetailsBase>;

//= == tvGetShowEpisodeDetails END =====================

//-- tvGetShowEpisodeExternalIds --------------------

type TVEpisodeExternalIds = {
  id: number;
  imdbId: string;
  imdbEpisodeURL: string;
  freebaseId: string;
  tvdbId: number;
  tvrageId: number;
};
export type TVEpisodeExternalIdsBase = BaseSinglePage<TVEpisodeExternalIds>;

export function tvGetShowEpisodeExternalIds(
  tvShowId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<TVEpisodeExternalIdsBase>;

//= == tvGetShowEpisodeExternalIds END =====================

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
  creditId: string;
  personId: number;
  name: string;
  gender: number; // 1 = female, 2 = male
  profileURL: string;
  order: number;
};
export type CrewType = {
  creditId: string;
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

type CreditsBase = {
  tvShowId: number;
  name: string;
  overview: string;
  firstAirDate: DateObject;
  genres: string[];
  posterURL: string;
  backdropURL: string;
  originalLanguage: string;
  episodeCount: number;
  creditId: string;
  sortDate: number;
};

interface CastTVShows extends CreditsBase {
  characterName: string;
}
interface CrewTVShows extends CreditsBase {
  job: string;
  department: string;
}

export function tvGetPersonCredits(
  personId: number
): Promise<BaseSinglePage<{ cast: CastTVShows[]; crew: CrewTVShows[] }>>;
// -- tvDiscover ---------------------

export type SortByOptions =
  | "first_air_date.asc"
  | "first_air_date.desc"
  | "name.asc"
  | "name.desc"
  | "original_name.asc"
  | "original_name.desc"
  | "popularity.asc"
  | "popularity.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc";

export type DiscoverCriteria = {
  genres?: string[]; // genre Ids
  genreCompareType?: "AND" | "OR" | undefined; // "AND" (,) if want TV Shows with all ids or "OR" (|) for TV Shows with any (default to OR)
  withoutGenres?: string[]; // exclude these genre Ids
  firstAirDateYear?: number; // Primary Release Year
  firstAirDateGTE?: string; // TV Shows with release date >= date YYYY-MM-DD
  firstAirDateLTE?: string; // TV Shows with release date <= date YYYY-MM-DD
  cast?: number[]; // person Ids. Only include TV Shows that have one of the Id's added as an actor.
  castCompareType?: "AND" | "OR" | undefined; // "AND" if want TV Shows with all ids or "OR" for TV Shows with any
  crew?: number[]; // person Ids. Only include TV Shows that have one of the Id's added as a crew member.
  crewCompareType?: "AND" | "OR" | undefined; // "AND" if want TV Shows with all ids or "OR" for TV Shows with any
  watchProviders?: string[]; // ids of watch providers that movie is located on.
  watchProviderCompareType?: "AND" | "OR" | undefined; // "AND" if want TV Shows with all ids or "OR" for TV Shows with any (defaults to OR)
  watchRegions?: string[];
  withOriginCountry?: string[]; // US, KR (South Korea) ISO Country standard
  withOriginCountryCompareType?: "AND" | "OR" | undefined; // "AND" if want TV Shows with all ids or "OR" for TV Shows with any (defaults to OR)
  sortBy?: SortByOptions;
};

export function tvDiscover(
  criteriaObj: DiscoverCriteria,
  page: number
): Promise<TVSearchResultBase>;

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

export function tvGetWatchProviders(showId: number, countryCodes: string[] = ["US"]);

// == END tvGetWatchProviders ==============
