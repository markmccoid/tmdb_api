/**
 * This is the curated API for Movies information
 * It uses the TMDBApi_Movies.js to pull data and then picks certain
 * data to return and formats it for easy use
 * If you need data not returned in these curated API functions, simply
 * call the "Raw" TMDB API functions
 */
import { formatImageURL } from "../helpers";
import { getTMDBConsts } from "../index";
import {
  rawSearchMovieByTitle,
  rawGetMovieImages,
  rawGetMovieDetails,
  rawDiscoverMovies
} from "../APIRaw/TMDBApi_Movies";

/**
 * Returns an array of image URLs. Filters and gives only 'en' English images
 *
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @param {string} [imageType=posters] - *'posters', 'backdrops'
 * @returns {string[]} Array of URLs to the images
 */
export const getImagesForMovie = (movieId, imageType = "posters") => {
  let apiCall;
  return rawGetMovieImages(movieId).then(resp => {
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
};

/**
 * Returns an object with an array of movies returned.
 *
 * @param {(string)} searchValue - Value to search for
 * @param {number} [page=1] - page to return.  Only works if multiple pages
 * @returns {Object} Object data return
 */
export const movieSearchByTitle = (searchValue, page = 1) => {
  let { MOVIE_GENRE_OBJ } = getTMDBConsts();
  // console.log('TV Genre', GENRE_OBJ)
  let apiCall;
  let searchResults;
  let moviesReturned;
  return rawSearchMovieByTitle(searchValue, page).then(resp => {
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
};

/**
 * Returns an object with movie details
 *
 * @param {number} movieId - movieId to get details for
 * @returns {Object} Object data return
 */
export const movieGetMovieDetails = movieId => {
  return rawGetMovieDetails(movieId).then(resp => {
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
      getMovieImages: () => getImagesForMovie(movieId)
    };
    return {
      data: movieDetails,
      apiCall: resp.apiCall
    };
  });
};

export const discoverMovies = (criteriaObj, page = 1) => {
  let apiCall;
  let searchResults;
  let moviesReturned;
  let { MOVIE_GENRE_OBJ } = getTMDBConsts();
  return rawDiscoverMovies(criteriaObj, page).then(resp => {
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
      getMovieImages: () => getImagesForMovie(result.id)
    }));

    return {
      data: { ...searchResults, results: moviesReturned },
      apiCall
    };
  });
};
