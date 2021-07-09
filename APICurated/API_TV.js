/// <reference path="../types/APICurated/API_TV.d.ts" />
/**
 * Curated API calls to the tmdb api end points for **TV Shows**.
 *
 * These calls all reference their raw counterparts, but only return selected data points.
 * Also, things like dates are converted to javascript date formats and image data are
 * converted to URL strings.
 * @namespace Curated_API_TV
 *
 */

import { formatImageURL, averageOfArray, parseToDate } from '../helpers';
import {
  rawTVGetShowImages,
  rawTVSearchByTitle,
  rawTVGetShowDetails,
  rawTVGetExternalIds,
  rawTVGetShowCredits,
  rawTVWatchProviders,
  rawTVGetPopular,
  rawTVDiscover,
  rawTVGetRecommendations,
  rawTVGetVideos,
  rawTVGetPersonCredits,
  rawTVGetShowSeasonDetails,
} from '../APIRaw/TMDBApi_TV';
import { TV_GENRE_OBJ } from '../index';

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
function tvGetImages(showId, imageType = 'posters') {
  let apiCall;
  return rawTVGetShowImages(showId).then((resp) => {
    // Get array of file_paths
    apiCall = resp.apiCall;
    let imgFilePaths = resp.data[imageType]
      .filter((imgObj) => imgObj.iso_639_1 === 'en')
      .map((imgObj) => {
        return imgObj.file_path;
      });
    // Get the full image URLs
    let formattedImageURLs = formatImageURL(imgFilePaths, 'm', true);
    return {
      data: formattedImageURLs,
      apiCall,
    };
  });
}

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
 * @property {string} data.results.originalName original name of the tv show
 * @property {string} data.results.popularity
 * @property {string} data.results.posterURL
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
function tvSearchByTitle(searchValue, page = 1) {
  // let { TV_GENRE_OBJ } = getTMDBConsts();
  let apiCall;
  let searchResults;
  let showsReturned;
  return rawTVSearchByTitle(searchValue, page).then((resp) => {
    // Curate results
    apiCall = resp.apiCall;
    searchResults = {
      page: resp.data.page,
      totalResults: resp.data.total_results,
      totalPages: resp.data.total_pages,
    };

    showsReturned = resp.data.results.map((show) => {
      return {
        id: show.id,
        name: show.name,
        originalName: show.original_name,
        originalLanguage: show.original_language,
        firstAirDate: parseToDate(show.first_air_date),
        overview: show.overview,
        backdropURL: show.backdrop_path
          ? formatImageURL(show.backdrop_path, 'm', true)[0]
          : '',
        posterURL: show.poster_path
          ? formatImageURL(show.poster_path, 'm', true)[0]
          : '',
        genres: show.genre_ids.map((genreId) => TV_GENRE_OBJ[genreId]),
        popularity: show.popularity,
      };
    });

    return {
      data: { ...searchResults, results: showsReturned },
      apiCall,
    };
  });
}

/**
 * @memberOf Curated_API_TV
 * @method
 * @param {(string)} showId - TV Show name to search for.
 * @param {number} [page=1] - page to return.  Only works if multiple pages
 * @returns {TVSearchResultItem} Object data return
 */
function tvGetRecommendations(showId, page = 1) {
  // let { TV_GENRE_OBJ } = getTMDBConsts();
  let apiCall;
  let searchResults;
  let showsReturned;
  return rawTVGetRecommendations(showId, page).then((resp) => {
    // Curate results
    apiCall = resp.apiCall;
    searchResults = {
      page: resp.data.page,
      totalResults: resp.data.total_results,
      totalPages: resp.data.total_pages,
    };

    showsReturned = resp.data.results.map((show) => {
      return {
        id: show.id,
        name: show.name,
        originalName: show.original_name,
        originalLanguage: show.original_language,
        firstAirDate: parseToDate(show.first_air_date),
        overview: show.overview,
        backdropURL: show.backdrop_path
          ? formatImageURL(show.backdrop_path, 'm', true)[0]
          : '',
        posterURL: show.poster_path
          ? formatImageURL(show.poster_path, 'm', true)[0]
          : '',
        genres: show.genre_ids.map((genreId) => TV_GENRE_OBJ[genreId]),
        popularity: show.popularity,
      };
    });

    return {
      data: { ...searchResults, results: showsReturned },
      apiCall,
    };
  });
}

//-----------------------------------
function seasonFormatter(rawSeasons) {
  // Get rawSeason array, return formatted seasons array
  return rawSeasons.map((season) => {
    return {
      id: season.id,
      seasonNumber: season.season_number,
      posterURL: season.poster_path
        ? formatImageURL(season.poster_path, 'm', true)[0]
        : '',
      name: season.name,
      overview: season.overview,
      episodeCount: season.episode_count,
      airDate: parseToDate(season.air_date),
    };
  });
}

function episodeFormatter(episode) {
  return {
    id: episode.id,
    seasonNumber: episode.season_number,
    episodeNumber: episode.episode_number,
    name: episode.name,
    overview: episode.overview,
    airDate: parseToDate(episode.air_date),
    stillURL: episode.still_path
      ? formatImageURL(episode.still_path, 'm', true)[0]
      : '',
  };
}

function networksFormatter(networks) {
  // Get rawSeason array, return formatted seasons array
  return networks.map((network) => {
    return {
      id: network.id,
      name: network.name,
      logoURL: network.logo_url
        ? formatImageURL(network.logo_url, 'm', true)[0]
        : '',
      originCountry: network.origin_country,
    };
  });
}
/**
 * @memberOf Curated_API_TV
 * @method
 * Returns obj with tv shows like searchValue (tv title) passed.
 */
async function tvGetShowDetails(showId) {
  let apiCall;
  let searchResults;
  let externalIdData = await rawTVGetExternalIds(showId);
  let { imdb_id, instagram_id, tvdb_id, tvrage_id, twitter_id, facebook_id } =
    externalIdData.data;
  return rawTVGetShowDetails(showId).then((resp) => {
    // Curate results
    apiCall = resp.apiCall;
    searchResults = {
      id: resp.data.id,
      name: resp.data.name,
      originalName: resp.data.original_name,
      overview: resp.data.overview,
      status: resp.data.status,
      tagLine: resp.data.tagline,
      popularity: resp.data.popularity,
      backdropURL: resp.data.backdrop_path
        ? formatImageURL(resp.data.backdrop_path, 'm', true)[0]
        : '',
      posterURL: resp.data.poster_path
        ? formatImageURL(resp.data.poster_path, 'm', true)[0]
        : '',
      avgEpisodeRunTime: resp.data.episode_run_time
        ? averageOfArray(resp.data.episode_run_time)
        : 0,
      firstAirDate: parseToDate(resp.data.first_air_date),
      lastAirDate: parseToDate(resp.data.last_air_date),
      homePage: resp.data.homepage,
      numberOfEpisodes: resp.data.number_of_episodes,
      numberOfSeasons: resp.data.number_of_seasons,
      inProduction: resp.data.in_production,
      imdbId: imdb_id,
      imdbURL: `https://www.imdb.com/title/${imdb_id}`,
      instagramId: instagram_id,
      tvdbId: tvdb_id,
      tvRageId: tvrage_id,
      twitterId: twitter_id,
      facebookdId: facebook_id,
      genres: resp.data.genres.map((tvGenreObj) => tvGenreObj.name),
      seasons: seasonFormatter(resp.data.seasons),
      lastEpisodeToAir: episodeFormatter(resp.data.last_episode_to_air),
      nextEpisodeToAir: episodeFormatter(resp.data.next_episode_to_air),
      networks: networksFormatter(resp.data.networks),
    };

    return {
      data: searchResults,
      apiCall,
    };
  });
}

/**
 * Returns season details for passed tvShowId and seasonNumber
 * @memberOf Curated_API_TV
 * @method
 *
 * @param {number} tvShowId - tvShowId
 * @param {number} seasonNumber -
 * Returns -
 */
function tvGetShowSeasonDetails(tvShowId, seasonNumber) {
  let apiCall;
  let searchResults;

  return rawTVGetShowSeasonDetails(tvShowId, seasonNumber).then((resp) => {
    // Curate results
    apiCall = resp.apiCall;
    searchResults = {
      id: resp.data.id,
      seasonNumber: resp.data.season_number,
      name: resp.data.name,
      overview: resp.data.overview,
      posterURL: resp.data.poster_path
        ? formatImageURL(resp.data.poster_path, 'm', true)[0]
        : '',
      airDate: parseToDate(resp.data.air_date),
      episodes: resp.data.episodes.map((episode) => episodeFormatter(episode)), //Excludes Crew and Guests
    };

    return {
      data: searchResults,
      apiCall,
    };
  });
}

/**
 * Returns watch providers for passed TV id
 * @memberOf Curated_API_TV
 * @method
 *
 * @param {string} showId - Tv Id
 * @param {array.<string>} countryCodes - Array of country codes to return
 * Returns -
 */
function tvGetWatchProviders(showId, countryCodes = ['US']) {
  let watchInfo;
  let searchResults;
  countryCodes = countryCodes.map((el) => el.trim().toUpperCase());

  return rawTVWatchProviders(showId).then((resp) => {
    const watchProviders = resp.data.results;
    const apiCall = resp.apiCall;
    searchResults = {
      showId: resp.data.id,
    };
    // loop through countryCodes and return a single object:
    // { [countryCode1]: {}, [countryCode2]: {}, ... }
    watchInfo = countryCodes.reduce((final, code) => {
      // If the code doesn't have a result value, then return an empty set for it.
      const countryWatchInfo = !watchProviders[code]
        ? { [code]: {} }
        : {
            [code]: {
              justWatchLink: watchProviders[code].link,
              stream: !watchProviders[code].flatrate
                ? []
                : watchProviders[code].flatrate.map((el) => ({
                    displayPriority: el.display_priority,
                    logoURL: formatImageURL(el.logo_path, 'original', true)[0],
                    providerId: el.provider_id,
                    provider: el.provider_name,
                  })),
              buy: !watchProviders[code].buy
                ? []
                : watchProviders[code].buy.map((el) => ({
                    displayPriority: el.display_priority,
                    logoURL: formatImageURL(el.logo_path, 'original', true)[0],
                    providerId: el.provider_id,
                    provider: el.provider_name,
                  })),
              rent: !watchProviders[code].rent
                ? []
                : watchProviders[code].rent.map((el) => ({
                    displayPriority: el.display_priority,
                    logoURL: formatImageURL(el.logo_path, 'original', true)[0],
                    providerId: el.provider_id,
                    provider: el.provider_name,
                  })),
            },
          };
      return { ...final, ...countryWatchInfo };
    }, {});

    return {
      data: { ...searchResults, results: watchInfo },
      apiCall,
    };
  });
}

/**
 * @memberOf Curated_API_TV
 * @method
 *
 * @param {string} tvId - tv Id
 * @param {array.<string>} countryCodes - Array of country codes to return
 * @returns {movieWatchProviders_typedef} Object data return
 */
function tvGetPopular(page, language) {
  let apiCall;
  let searchResults;
  let showsReturned;
  return rawTVGetPopular(page, language).then((resp) => {
    // Curate results
    apiCall = resp.apiCall;
    searchResults = {
      page: resp.data.page,
      totalResults: resp.data.total_results,
      totalPages: resp.data.total_pages,
    };

    showsReturned = resp.data.results.map((show) => {
      return {
        id: show.id,
        name: show.name,
        originalName: show.original_name,
        firstAirDate: parseToDate(show.first_air_date),
        originalLanguage: show.original_language,
        overview: show.overview,
        posterURL: show.poster_path
          ? formatImageURL(show.poster_path, 'm', true)[0]
          : '',
        backdropURL: show.backdrop_path
          ? formatImageURL(show.backdrop_path, 'm', true)[0]
          : '',
        genres: show.genre_ids.map((genreId) => TV_GENRE_OBJ[genreId]),
        popularity: show.popularity,
      };
    });

    return {
      data: { ...searchResults, results: showsReturned },
      apiCall,
    };
  });
}

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
function tvGetShowCredits(showId) {
  return rawTVGetShowCredits(showId).then((resp) => {
    let cast = resp.data.cast.map((character) => {
      return {
        characterName: character.character,
        creditId: character.credit_id,
        personId: character.id,
        name: character.name,
        gender: character.gender,
        profileURL: character.profile_path
          ? formatImageURL(character.profile_path, 'm', true)[0]
          : '',
        order: character.order,
      };
    });
    let crew = resp.data.crew.map((crewMember) => {
      return {
        creditId: crewMember.credit_id,
        personId: crewMember.id,
        name: crewMember.name,
        gender: crewMember.gender,
        profileURL: crewMember.profile_path
          ? formatImageURL(crewMember.profile_path, 'm', true)[0]
          : '',
        job: crewMember.job,
        department: crewMember.department,
      };
    });
    return {
      data: { cast, crew },
      apiCall: resp.apiCall,
    };
  });
}

/**
 * Returns an object with videos for passed showId
 * @method
 * @memberOf Curated_API_TV
 * @param {number} showId - showId to get details for
 * @returns {movieVideos_typedef} Object data return
 */
function tvGetVideos(showId) {
  return rawTVGetVideos(showId).then((resp) => {
    //Get video data and format, currently just getting youtube videos
    const videos = resp.data.results
      .filter((video) => video.site === 'YouTube')
      .map((video) => ({
        id: video.id,
        language: video.iso_639_1,
        country: video.iso_3166_1,
        key: video.key,
        name: video.name,
        site: video.site,
        size: video.size,
        type: video.type,
        videoURL: `https://www.youtube.com/watch?v=${video.key}`,
        videoThumbnailURL: `https://img.youtube.com/vi/${video.key}/0.jpg`,
      }));
    return {
      data: videos,
      apiCall: resp.apiCall,
    };
  });
}

/**
 * Returns an object with movies where person was part of cast or crew for passed personId
 * @memberOf Curated_API_Movies
 * @method
 * @param {number} personId - personId to get details for
 * @returns {moviePersonCredits_typedef} Object data return
 * {
 *    cast: [{}],
 *    crew: [{}],
 *    apiCall
 * }
 */
function tvGetPersonCredits(personId) {
  // let { MOVIE_GENRE_OBJ } = getTMDBConsts();

  return rawTVGetPersonCredits(personId).then((resp) => {
    let castTVShows = resp.data.cast.map((tvShow) => {
      return {
        tvShowId: tvShow.id,
        name: tvShow.name,
        overview: tvShow.overview,
        firstAirDate: parseToDate(tvShow.first_air_date),
        creditId: tvShow.credit_id,
        characterName: tvShow.character,
        genres: tvShow.genre_ids.map((genreId) => TV_GENRE_OBJ[genreId]),
        posterURL: tvShow.poster_path
          ? formatImageURL(tvShow.poster_path, 'm', true)[0]
          : '',
        backdropURL: tvShow.backdrop_path
          ? formatImageURL(tvShow.backdrop_path, 'm', true)[0]
          : '',
        orginalLanguage: tvShow.original_language,
        episodeCount: tvShow.episode_count,
      };
    });
    let crewTVShows = resp.data.crew.map((tvShow) => {
      return {
        tvShowId: tvShow.id,
        name: tvShow.name,
        overview: tvShow.overview,
        firstAirDate: parseToDate(tvShow.first_air_date),
        creditId: tvShow.credit_id,
        job: tvShow.job,
        department: tvShow.department,
        genres: tvShow.genre_ids.map((genreId) => TV_GENRE_OBJ[genreId]),
        posterURL: tvShow.poster_path
          ? formatImageURL(tvShow.poster_path, 'm', true)[0]
          : '',
        backdropURL: tvShow.backdrop_path
          ? formatImageURL(tvShow.backdrop_path, 'm', true)[0]
          : '',
        orginalLanguage: tvShow.original_language,
        episodeCount: tvShow.episode_count,
      };
    });
    return {
      data: { cast: castTVShows, crew: crewTVShows },
      apiCall: resp.apiCall,
    };
  });
}

// Discover / Advanced Search
function tvDiscover(criteriaObj, page = 1) {
  let apiCall;
  let searchResults;
  let tvShows;
  return rawTVDiscover(criteriaObj, page).then((resp) => {
    apiCall = resp.apiCall;
    searchResults = {
      page: resp.data.page,
      totalResults: resp.data.total_results,
      totalPages: resp.data.total_pages,
    };
    tvShows = resp.data.results.map((result) => ({
      id: result.id,
      name: result.name,
      originalName: result.original_name,
      overview: result.overview,
      popularity: result.popularity,
      originalLanguage: result.original_language,
      releaseDate: parseToDate(result.release_date),
      posterURL: result.poster_path
        ? formatImageURL(result.poster_path, 'm', true)[0]
        : '',
      backdropURL: result.backdrop_path
        ? formatImageURL(result.backdrop_path, 'm', true)[0]
        : '',
      genres: result.genre_ids.map((genreId) => TV_GENRE_OBJ[genreId]),
    }));

    return {
      data: { ...searchResults, results: tvShows },
      apiCall,
    };
  });
}

export {
  tvGetImages,
  tvSearchByTitle,
  tvGetShowDetails,
  tvGetShowSeasonDetails,
  tvGetShowCredits,
  tvGetPopular,
  tvGetWatchProviders,
  tvDiscover,
  tvGetRecommendations,
  tvGetVideos,
  tvGetPersonCredits,
};
