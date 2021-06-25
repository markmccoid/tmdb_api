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

export function tvGetPopular(page?: number, language?: string): Promise<TVSearchResultBase>;

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

// -- tvDiscover ---------------------
