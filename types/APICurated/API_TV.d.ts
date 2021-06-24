export type DateObject = {
  date?: Date;
  epoch: number;
  formatted: string;
};

// -- TV IMAGES
export type TVGetImages = {
  // array of image URLs (https://...)
  data: string[];
  apiCall: string;
};

export function tvGetImages(
  showId: number,
  imageType?: "posters" | "backgdrops"
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
export type TVSearchResult = {
  data: {
    page: number;
    totalResults: number;
    totalPages: number;
    results: TVSearchResultItem[];
  };
  apiCall: string;
};

export function tvSearchByTitle(searchValue: string, page?: number): Promise<TVSearchResult>;

export function tvGetPopular(page?: number, language?: string): Promise<TVSearchResult>;

// -- TV SHOW DETAILS
type TVShowDetails = {
  data: {
    id: number;
    name: string;
    overview: string;
    status: string;
    avgEpisodeRunTime: number;
    firstAirDate: DateObject;
    lastAirDate: DateObject;
    posterURL: string;
    backdropURL: string;
    homePage: string;
    numberOfEpisodes: number;
    numberOfSeasons: number;
    genres: string[];
  };
  apiCall: string;
};
/**
 * returns show details for showId passed
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @returns {tvShowDetails_typedef}
 */
export function tvGetShowDetails(showId: string): Promise<TVShowDetails>;

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
export type TVCredits = {
  data: {
    cast: CastType[];
    crew: CrewType[];
  };
  apiCall: string;
};
export function tvGetShowCredits(showId: string): Promise<TVCredits>;
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
