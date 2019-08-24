/**
 * Curated API calls to the tmdb api end points for **Movies**.
 *
 * These calls all reference their raw counterparts, but only return selected data points.
 * Also, things like dates are converted to javascript date formats and image data are
 * converted to URL strings.
 * @namespace Curated_API_Movies
 *
 */

import { formatImageURL, parseToDate } from "../helpers";
import { getTMDBConsts } from "../index";
import {
  rawMovieSearchByTitle,
  rawMovieGetImages,
  rawMovieGetDetails,
  rawMovieGetPersonCredits,
  rawMovieGetCredits,
  rawMovieDiscover
} from "../APIRaw/TMDBApi_Movies";

/**
 * @typedef imagesReturn
 * @type {Object}
 * @property {Array} data Array of image URLs
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an array of image URLs. Filters and gives only 'en' English images
 * @memberof Curated_API_Movies
 * @method
 *
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @param {string} [imageType=posters] - *'posters', 'backdrops'
 * @returns {imagesReturn} Array of URLs to the images
 */
function movieGetImages(movieId, imageType = "posters") {
  let apiCall;
  return rawMovieGetImages(movieId).then(resp => {
    // Get array of file_paths
    apiCall = resp.apiCall;
    let imgFilePaths = resp.data[imageType]
      .filter(imgObj => imgObj.iso_639_1 === "en")
      .map(imgObj => {
        return imgObj.file_path;
      });
    // Get the full image URLs
    let formattedImageURLs = formatImageURL(imgFilePaths, "m", true);
    return {
      data: formattedImageURLs,
      apiCall
    };
  });
}

/**
 * @typedef movieSearch
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.page current page returned
 * @property {number} data.totalResults total number of movies search found
 * @property {number} data.totalPages total pages use for pagination
 * @property {Array} data.results results of the search
 * @property {number} data.results.id the movieId
 * @property {string} data.results.title
 * @property {string} data.results.overview
 * @property {date} data.results.releaseDate
 * @property {string} data.results.posterURL
 * @property {string} data.results.backdropURL
 * @property {array.<string>} data.results.genres array of genre names
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an object with an array of movies returned based on passed title.
 * @memberOf Curated_API_Movies
 * @method
 *
 * @param {(string)} searchValue - Value to search for
 * @param {number} [page=1] - page to return.  Only works if multiple pages
 * @returns {movieSearch} Object data return
 */
function movieSearchByTitle(searchValue, page = 1) {
  let { MOVIE_GENRE_OBJ } = getTMDBConsts();
  // console.log('TV Genre', GENRE_OBJ)
  let apiCall;
  let searchResults;
  let moviesReturned;
  return rawMovieSearchByTitle(searchValue, page).then(resp => {
    // Curate results
    apiCall = resp.apiCall;
    searchResults = {
      page: resp.data.page,
      totalResults: resp.data.total_results,
      totalPages: resp.data.total_pages
    };
    moviesReturned = resp.data.results.map(movie => {
      return {
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date && parseToDate(movie.release_date),
        overview: movie.overview,
        posterURL: movie.backdrop_path
          ? formatImageURL(movie.poster_path, "m", true)[0]
          : "",
        backdropURL: movie.backdrop_path
          ? formatImageURL(movie.backdrop_path, "m", true)[0]
          : "",
        genres: movie.genre_ids.map(genreId => MOVIE_GENRE_OBJ[genreId]),
        getMovieDetails: () => movieGetDetails(movie.id)
      };
    });

    return {
      data: { ...searchResults, results: moviesReturned },
      apiCall
    };
  });
}

/**
 * @typedef movieDetails
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.id the movieId
 * @property {string} data.title
 * @property {string} data.tagline
 * @property {string} data.overview
 * @property {string} data.status
 * @property {number} data.runtime runtime in minutes
 * @property {number} data.budget
 * @property {number} data.revenue
 * @property {date} data.releaseDate
 * @property {string} data.posterURL
 * @property {string} data.backdropURL
 * @property {string} data.imdbId
 * @property {string} data.imdbURL
 * @property {array.<string>} data.genres array of genre names
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an object with movie details from passed movieId
 * @method
 * @memberOf Curated_API_Movies
 * @param {number} movieId - movieId to get details for
 * @returns {movieDetails} Object data return
 */
function movieGetDetails(movieId) {
  return rawMovieGetDetails(movieId).then(resp => {
    console.log("movie resp", resp);
    let movieDetails = {
      id: movieId,
      title: resp.data.title,
      tagLine: resp.data.tagline,
      overview: resp.data.overview,
      status: resp.data.status,
      runtime: resp.data.runtime,
      budget: resp.data.budget,
      revenue: resp.data.revenue,
      releaseDate:
        resp.data.release_date && parseToDate(resp.data.release_date),
      posterURL: resp.data.poster_path
        ? formatImageURL(resp.data.poster_path, "m", true)[0]
        : "",
      backdropURL: resp.data.backdrop_path
        ? formatImageURL(resp.data.backdrop_path, "m", true)[0]
        : "",
      imdbId: resp.data.imdb_id,
      imdbURL: `https://www.imdb.com/title/${resp.data.imdb_id}`,
      genres: resp.data.genres.map(genreObj => genreObj.name),
      getMovieImages: () => movieGetImages(movieId)
    };
    return {
      data: movieDetails,
      apiCall: resp.apiCall
    };
  });
}

/**
 * @typedef movieCredits
 * @type {Object}
 * @property {Object} data the data object
 * @property {Array} data.cast the cast array
 * @property {number} data.cast.personId
 * @property {string} data.cast.name
 * @property {string} data.cast.characterName
 * @property {string} data.cast.creditId
 * @property {number} data.cast.gender 1 is Female, 2 is Male
 * @property {string} data.cast.profileURL
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
 * Returns an object with cast and crew for passed movieId
 * @memberOf Curated_API_Movies
 * @method
 * @param {number} movieId - movieId to get details for
 * @returns {movieCredits} Object data return
 * {
 *    cast: [{}],
 *    crew: [{}],
 *    apiCall
 * }
 */
function movieGetCredits(movieId) {
  let { MOVIE_GENRE_OBJ } = getTMDBConsts();
  return rawMovieGetCredits(movieId).then(resp => {
    console.log(resp);
    let castForMovie = resp.data.cast.map(castMember => {
      return {
        personId: castMember.id,
        name: castMember.name,
        characterName: castMember.character,
        creditId: castMember.credit_id,
        gender: castMember.gender,
        profileURL: castMember.profile_path
          ? formatImageURL(castMember.profile_path, "m", true)[0]
          : ""
      };
    });
    let crewForMovie = resp.data.crew.map(crewMember => {
      return {
        personId: crewMember.id,
        name: crewMember.name,
        creditId: crewMember.credit_id,
        job: crewMember.job,
        department: crewMember.department,
        gender: crewMember.gender,
        profileURL: crewMember.profile_path
          ? formatImageURL(crewMember.profile_path, "m", true)[0]
          : ""
      };
    });
    return {
      data: { cast: castForMovie, crew: crewForMovie },
      apiCall: resp.apiCall
    };
  });
}

/**
 * @typedef moviePersonCredits
 * @type {Object}
 * @property {Object} data the data object
 * @property {Array} data.cast the cast array
 * @property {number} data.cast.movieId
 * @property {string} data.cast.title
 * @property {string} data.cast.overview
 * @property {date} data.cast.releaseDate
 * @property {string} data.cast.creditId
 * @property {string} data.cast.characterName
 * @property {Array} data.cast.genres
 * @property {string} data.cast.posterURL
 * @property {string} data.cast.backdropURL
 * @property {string} data.cast.orginalLanguage
 * @property {string} data.crew the crew array
 * @property {number} data.cast.movieId
 * @property {string} data.cast.title
 * @property {string} data.cast.overview
 * @property {string} data.cast.releaseDate
 * @property {string} data.cast.creditId
 * @property {string} data.cast.job
 * @property {string} data.cast.department
 * @property {Array} data.cast.genres
 * @property {string} data.cast.posterURL
 * @property {string} data.cast.backdropURL
 * @property {string} data.cast.orginalLanguage
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an object with movies where person was part of cast or crew for passed personId
 * @memberOf Curated_API_Movies
 * @method
 * @param {number} personId - personId to get details for
 * @returns {moviePersonCredits} Object data return
 * {
 *    cast: [{}],
 *    crew: [{}],
 *    apiCall
 * }
 */
function movieGetPersonCredits(personId) {
  let { MOVIE_GENRE_OBJ } = getTMDBConsts();

  return rawMovieGetPersonCredits(personId).then(resp => {
    console.log(resp);
    let castMovies = resp.data.cast.map(movie => {
      return {
        movieId: movie.id,
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.release_date && parseToDate(movie.release_date),
        creditId: movie.credit_id,
        characterName: movie.character,
        genres: movie.genre_ids.map(genreId => MOVIE_GENRE_OBJ[genreId]),
        posterURL: movie.poster_path
          ? formatImageURL(movie.poster_path, "m", true)[0]
          : "",
        backdropURL: movie.backdrop_path
          ? formatImageURL(movie.backdrop_path, "m", true)[0]
          : "",
        orginalLanguage: movie.original_language
      };
    });
    let crewMovies = resp.data.crew.map(movie => {
      return {
        movieId: movie.id,
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.release_date && parseToDate(movie.release_date),
        creditId: movie.credit_id,
        job: movie.job,
        department: movie.department,
        genres: movie.genre_ids.map(genreId => MOVIE_GENRE_OBJ[genreId]),
        posterURL: movie.poster_path
          ? formatImageURL(movie.poster_path, "m", true)[0]
          : "",
        backdropURL: movie.backdrop_path
          ? formatImageURL(movie.backdrop_path, "m", true)[0]
          : "",
        orginalLanguage: movie.original_language
      };
    });
    return {
      data: { cast: castMovies, crew: crewMovies },
      apiCall: resp.apiCall
    };
  });
}

/**
 * @typedef movieDiscover
 * @type {Object}
 * @property {Object} data the data object
 * @property {number} data.page current page returned
 * @property {number} data.totalResults total number of movies search found
 * @property {number} data.totalPages total pages use for pagination
 * @property {Array} data.results results of the search
 * @property {number} data.results.id the movieId
 * @property {string} data.results.title
 * @property {number} data.results.popularity
 * @property {string} data.results.originalLanguage
 * @property {string} data.results.overview
 * @property {date} data.results.releaseDate
 * @property {string} data.results.posterURL
 * @property {string} data.results.backdropURL
 * @property {array.<string>} data.results.genres array of genre names
 * @property {function} data.results.getMovieImages returns and array of image URLs for movie
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * @typedef movieDiscoverCriteria
 * @type {Object}
 * @property {Array} genres  genre Ids
 * @property {int} releaseYear: Primary Release Year
 * @property {date | string} releaseDateGTE: movies with release date >= date YYYY-MM-DD format either JS Date or string "YYYY-MM-DD"
 * @property {date | string} releaseDateLTE: movies with release date <= date YYYY-MM-DD format either JS Date or string "YYYY-MM-DD"
 * @property {Array} cast:  person Ids. Only include movies that have one of the Id's added as an actor
 * @property {Array} crew:  person Ids. Only include movies that have one of the Id's added as a crew member
 * @property {string} sortBy Options
 *    - popularity.asc
 *    - popularity.desc **Default**
 *    - release_date.asc
 *    - release_date.desc
 *    - revenue.asc
 *    - revenue.desc
 *    - primary_release_date.asc
 *    - primary_release_date.desc
 *    - original_title.asc
 *    - original_title.desc
 *    - vote_average.asc
 *    - vote_average.desc
 *    - vote_count.asc
 *    - vote_count.desc
 */
/**
 * Returns an object with data matching passed criteriaObj criteria
 * @memberOf Curated_API_Movies
 * @method
 * @param {movieDiscoverCriteria} criteriaObj - object with criteria to search for
 * @param {number} [page=1] - page to return.  Only works if multiple pages
 * @returns {movieDiscover} Object data return
 */
function movieDiscover(criteriaObj, page = 1) {
  let apiCall;
  let searchResults;
  let moviesReturned;
  let { MOVIE_GENRE_OBJ } = getTMDBConsts();
  return rawMovieDiscover(criteriaObj, page).then(resp => {
    console.log("movie resp", resp);

    apiCall = resp.apiCall;
    searchResults = {
      page: resp.data.page,
      totalResults: resp.data.total_results,
      totalPages: resp.data.total_pages
    };
    moviesReturned = resp.data.results.map(result => ({
      id: result.id,
      title: result.title,
      overview: result.overview,
      popularity: result.popularity,
      originalLanguage: result.original_language,
      releaseDate: result.release_date && parseToDate(result.release_date),
      posterURL: result.poster_path
        ? formatImageURL(result.poster_path, "m", true)[0]
        : "",
      backdropURL: result.backdrop_path
        ? formatImageURL(result.backdrop_path, "m", true)[0]
        : "",
      genres: result.genre_ids.map(genreId => MOVIE_GENRE_OBJ[genreId]),
      getMovieImages: () => movieGetImages(result.id)
    }));

    return {
      data: { ...searchResults, results: moviesReturned },
      apiCall
    };
  });
}

export {
  movieGetImages,
  movieSearchByTitle,
  movieGetDetails,
  movieGetPersonCredits,
  movieGetCredits,
  movieDiscover
};
