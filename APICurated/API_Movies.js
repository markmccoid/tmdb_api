/**
 * Curated API calls to the tmdb api end points for **Movies**.
 *
 * These calls all reference their raw counterparts, but only return selected data points.
 * Also, things like dates are converted to javascript date formats and image data are
 * converted to URL strings.
 * @namespace Curated_API_Movies
 *
 */

import { formatImageURL } from "../helpers";
import { getTMDBConsts } from "../index";
import {
  rawMovieSearchByTitle,
  rawMovieGetImages,
  rawMovieGetDetails,
  rawMovieGetPersonDetails,
  rawMovieDiscover
} from "../APIRaw/TMDBApi_Movies";

/**
 * Returns an array of image URLs. Filters and gives only 'en' English images
 * @memberof Curated_API_Movies
 * @method
 *
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @param {string} [imageType=posters] - *'posters', 'backdrops'
 * @returns {string[]} Array of URLs to the images
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
 * Returns an object with an array of movies returned based on passed title.
 * @memberOf Curated_API_Movies
 * @method
 *
 * @param {(string)} searchValue - Value to search for
 * @param {number} [page=1] - page to return.  Only works if multiple pages
 * @returns {Object} Object data return
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
        releaseDate: movie.release_date,
        overview: movie.overview,
        posterURL: movie.backdrop_path
          ? formatImageURL(movie.poster_path, "m", true)[0]
          : "",
        backdropURL: movie.backdrop_path
          ? formatImageURL(movie.backdrop_path, "m", true)[0]
          : "",
        genres: movie.genre_ids.map(genreId => MOVIE_GENRE_OBJ[genreId]),
        getMovieDetails: () => movieGetMovieDetails(movie.id)
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
 * @property {string} data.releaseDate
 * @property {string} data.posterURL
 * @property {string} data.backdropURL
 * @property {string} data.imdbId
 * @property {string} data.imdbURL
 * @property {array.<string>} data.genres
 * @property {string} apiCall the API call used to hit endpoint
 */
/**
 * Returns an object with movie details from passed movieId
 * @method
 * @memberOf Curated_API_Movies
 * @param {number} movieId - movieId to get details for
 * @returns {movieDetails} Object data return
 */
function movieGetMovieDetails(movieId) {
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
      releaseDate: resp.data.release_date,
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
 * Returns an object with movies where person was part of cast or crew for passed personId
 * @memberOf Curated_API_Movies
 * @method
 * @param {number} personId - personId to get details for
 * @returns {Object} Object data return
 * {
 *    cast: [{}],
 *    crew: [{}],
 *    apiCall
 * }
 */
function movieGetPersonDetails(personId) {
  let { MOVIE_GENRE_OBJ } = getTMDBConsts();

  return rawMovieGetPersonDetails(personId).then(resp => {
    console.log(resp);
    let castMovies = resp.data.cast.map(movie => {
      return {
        movieId: movie.id,
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.release_date,
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
        releaseDate: movie.release_date,
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
 * Returns an object with data matching passed criteriaObj criteria
 * @memberOf Curated_API_Movies
 * @method
 * @param {object} criteriaObj - object with criteria to search for
 * @param {number} [page=1] - page to return.  Only works if multiple pages
 * @returns {Object} Object data return
 * {
 *    cast: [{}],
 *    crew: [{}],
 *    apiCall
 * }
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
      releaseDate: result.release_date,
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
  movieGetMovieDetails,
  movieGetPersonDetails,
  movieDiscover
};
