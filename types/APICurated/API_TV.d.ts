export type tvGetImages_typedef = {
    /**
     * array of image URLs (https://...)
     */
    data: any[];
    /**
     * the API call used to hit endpoint
     */
    apiCall: string;
};
export type tvSearchByTitle_typedef = {
    /**
     * the data object
     */
    data: {
        page: number;
        totalResults: number;
        totalPages: number;
        results: any[];
    };
    /**
     * the tv showId
     */
    id: number;
    /**
     * name of the tv show
     */
    name: string;
    overview: string;
    firstAirDate: any;
    backdropURL: string;
    /**
     * array of genre names
     */
    genres: any;
    /**
     * the API call used to hit endpoint
     */
    apiCall: string;
};
export type tvShowDetails_typedef = {
    /**
     * the data object
     */
    data: {
        id: number;
        name: string;
        overview: string;
        status: string;
        avgEpisodeRunTime: number;
        firstAirDate: any;
        lastAirDate: any;
        posterURL: string;
        backdropURL: string;
        homePage: string;
        numberOfEpisodes: number;
        numberOfSeasons: number;
        genres: any;
    };
    /**
     * the API call used to hit endpoint
     */
    apiCall: string;
};
export type tvCredits_typedef = {
    /**
     * the data object
     */
    data: {
        cast: any[];
    };
    personId: number;
    name: string;
    characterName: string;
    creditId: string;
    /**
     * 1 is Female, 2 is Male
     */
    gender: number;
    profileURL: string;
    order: string;
    /**
     * the crew array
     */
    crew: string;
    job: string;
    department: string;
    /**
     * the API call used to hit endpoint
     */
    apiCall: string;
};
/**
 * @typedef tvGetImages_typedef
 * @type {Object}
 * @property {Array} data array of image URLs (https://...)
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an array of image URLs. Filters and gives only 'en' English images
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @param {string} [imageType=posters] - 'posters', 'backdrops'
 * @returns {string[]} Array of URLs to the images
 */
export function tvGetImages(showId: (string), imageType?: string): string[];
/**
 * @typedef tvSearchByTitle_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.page current page returned
 * @property {number} data.totalResults total number of movies search found
 * @property {number} data.totalPages total pages use for pagination
 * @property {Array} data.results results of the search
 * @property {number} data.results.id the tv showId
 * @property {string} data.results.name name of the tv show
 * @property {string} data.results.overview
 * @property {date} data.results.firstAirDate
 * @property {string} data.results.backdropURL
 * @property {array.<string>} data.results.genres array of genre names
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns obj with tv shows like searchValue (tv title) passed.
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} searchValue - TV Show name to search for.
 * @param {number} [page=1] - page to return.  Only works if multiple pages
 * @returns {tvSearchByTitle_typedef} Object data return
 */
export function tvSearchByTitle(searchValue: (string), page?: number): tvSearchByTitle_typedef;
/**
 * @typedef tvShowDetails_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.id the tv showId
 * @property {string} data.name name of the tv show
 * @property {string} data.overview
 * @property {string} data.status
 * @property {number} data.avgEpisodeRunTime average runtime in minutes
 * @property {date} data.firstAirDate
 * @property {date} data.lastAirDate
 * @property {string} data.posterURL
 * @property {string} data.backdropURL
 * @property {string} data.homePage
 * @property {number} data.numberOfEpisodes
 * @property {number} data.numberOfSeasons
 * @property {array.<string>} data.genres array of genre names
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * returns show details for showId passed
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @returns {tvShowDetails_typedef}
 */
export function tvGetShowDetails(showId: (string)): tvShowDetails_typedef;
/**
 * @typedef tvCredits_typedef
 * @type {Object}
 * @property {Object} data the data object
 * @property {Array} data.cast the cast array
 * @property {number} data.cast.personId
 * @property {string} data.cast.name
 * @property {string} data.cast.characterName
 * @property {string} data.cast.creditId
 * @property {number} data.cast.gender 1 is Female, 2 is Male
 * @property {string} data.cast.profileURL
 * @property {string} data.cast.order
 * @property {string} data.crew the crew array
 * @property {number} data.crew.personId
 * @property {string} data.crew.name
 * @property {string} data.crew.creditId
 * @property {string} data.crew.job
 * @property {string} data.crew.department
 * @property {number} data.crew.gender 1 is Female, 2 is Male
 * @property {string} data.crew.profileURL
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * returns show credits for showId passed
 *
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @returns {tvCredits_typedef}
 */
export function tvGetShowCredits(showId: (string)): tvCredits_typedef;
