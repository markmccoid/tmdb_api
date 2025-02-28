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

import { formatImageURL, averageOfArray, parseToDate } from "../helpers";
import {
  rawTVGetShowImages,
  rawTVSearchByTitle,
  rawTVGetShowDetails,
  rawTVGetExternalIds,
  rawTVGetEpisodeExternalIds,
  rawTVGetShowCredits,
  rawTVWatchProviders,
  rawTVGetPopular,
  rawTVDiscover,
  rawTVGetRecommendations,
  rawTVGetVideos,
  rawTVGetPersonCredits,
  rawTVGetShowSeasonDetails,
  rawTVGetShowEpisodeDetails,
} from "../APIRaw/TMDBApi_TV";

import { tmdbConfig } from "../config";

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
 * @param {string} [imageType=posters] - 'posters', 'backdrops', 'logos'
 * @param {string} [includeAspectRatio=false] - include the aspect ratio in the result
 *   [{ aspectRation: '1.78', URL: 'https://image.tmdb.org/t/p/w1280/...' }]
 * @returns {string[]} Array of URLs to the images
 */
function tvGetImages(showId, imageType = "posters", includeAspectRatio = false) {
  let apiCall;
  return rawTVGetShowImages(showId).then((resp) => {
    // Get array of file_paths
    apiCall = resp.apiCall;

    let imgFilePaths = resp.data[imageType]
      .filter((imgObj) => imgObj.iso_639_1 === "en")
      .map((imgObj) => {
        return {
          aspectRatio: imgObj.aspect_ratio,
          URL: formatImageURL(imgObj.file_path, "m", true)[0],
        };
      });
    // If aspect ratio is requested, return object with aspect ratio and URL
    if (includeAspectRatio) {
      return {
        data: imgFilePaths,
        apiCall,
      };
    }
    // Otherwise, return array of URLs
    return {
      data: imgFilePaths.map((imgObj) => imgObj.URL),
      apiCall,
    };

    // let imgFilePaths = resp.data[imageType]
    //   .filter((imgObj) => imgObj.iso_639_1 === 'en')
    //   .map((imgObj) => {
    //     return imgObj.file_path;
    //   });
    // // Get the full image URLs
    // let formattedImageURLs = formatImageURL(imgFilePaths, 'm', true);
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
  const { TV_GENRE_OBJ } = tmdbConfig.getConfig();
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
        backdropURL: show.backdrop_path ? formatImageURL(show.backdrop_path, "m", true)[0] : "",
        posterURL: show.poster_path ? formatImageURL(show.poster_path, "m", true)[0] : "",
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
  const { TV_GENRE_OBJ } = tmdbConfig.getConfig();
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
        backdropURL: show.backdrop_path ? formatImageURL(show.backdrop_path, "m", true)[0] : "",
        posterURL: show.poster_path ? formatImageURL(show.poster_path, "m", true)[0] : "",
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
  if (!rawSeasons) return undefined;
  // Get rawSeason array, return formatted seasons array
  return rawSeasons.map((season) => {
    return {
      id: season.id,
      seasonNumber: season.season_number,
      posterURL: season.poster_path ? formatImageURL(season.poster_path, "m", true)[0] : "",
      name: season.name,
      overview: season.overview,
      episodeCount: season.episode_count,
      airDate: parseToDate(season.air_date),
    };
  });
}

function episodeFormatter(episode) {
  if (!episode) return undefined;
  return {
    id: episode.id,
    seasonNumber: episode.season_number,
    episodeNumber: episode.episode_number,
    name: episode.name,
    overview: episode.overview,
    airDate: parseToDate(episode.air_date),
    stillURL: episode.still_path ? formatImageURL(episode.still_path, "m", true)[0] : "",
    runTime: episode.run_time,
  };
}

function networksFormatter(networks) {
  if (!networks) return undefined;
  // Get rawSeason array, return formatted seasons array
  return networks.map((network) => {
    return {
      id: network.id,
      name: network.name,
      logoURL: network.logo_url ? formatImageURL(network.logo_url, "m", true)[0] : "",
      originCountry: network.origin_country,
    };
  });
}

/**
 * @memberOf Curated_API_TV
 * @method
 * Returns obj with tv shows like searchValue (tv title) passed.
 * appendToReponse is an array of strings that can be appended to the response
 *  - credits: Includes cast and crew information.
 *  - aggregate_credits: Similar to credits but aggregates roles across episodes.
 *  - images: Provides posters and backdrops.
 *  - videos: Includes trailers and promotional videos.
 *  - recommendations: Suggests similar TV shows.
 *  - keywords: Lists associated keywords for the show.
 *  - external_ids: Fetches external identifiers (e.g., IMDb ID). - Always included
 *  - translations: Provides translations for metadata.
 */
async function tvGetShowDetails(showId, appendToResponse = []) {
  let apiCall;
  let searchResults;
  const { TV_GENRE_OBJ } = tmdbConfig.getConfig();
  // Always get external ids using append_to_response tmdb api functionality
  appendToResponse = [
    "external_ids",
    ...appendToResponse.map((el) => el.trim()), //remove spaces
  ];

  // Take array of valid append options and join with comma to build param object
  const appendParam = {
    params: { append_to_response: appendToResponse.join(",") },
  };

  return rawTVGetShowDetails(showId, appendParam).then((resp) => {
    // Curate results
    apiCall = resp.apiCall;

    // optional appended params
    let optionalKeys = {};

    //if videos appended,
    let videos = [];
    if (appendToResponse.includes("videos")) {
      videos = resp.data.videos.results
        .filter((video) => video.site === "YouTube")
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
      optionalKeys = { ...optionalKeys, videos };
    }

    //if credits appended,
    let credits = [];
    if (appendToResponse.includes("credits")) {
      credits = {
        cast: processCastData(resp.data.credits.cast),
        crew: processCrewData(resp.data.credits.crew),
      };
      optionalKeys = { ...optionalKeys, credits };
    }

    //if aggregate_credits appended,
    let aggregateCredits = [];
    if (appendToResponse.includes("aggregate_credits")) {
      aggregateCredits = {
        cast: processCastData(resp.data.aggregate_credits.cast),
        crew: processCrewData(resp.data.aggregate_credits.crew),
      };
      optionalKeys = { ...optionalKeys, aggregateCredits };
    }
    if (appendToResponse.includes("recommendations")) {
      resp.data.recommendations.results = resp.data.recommendations.results.map((show) => ({
        id: show.id,
        name: show.name,
        originalName: show.original_name,
        originalLanguage: show.original_language,
        firstAirDate: parseToDate(show.first_air_date),
        overview: show.overview,
        backdropURL: show.backdrop_path ? formatImageURL(show.backdrop_path, "m", true)[0] : "",
        posterURL: show.poster_path ? formatImageURL(show.poster_path, "m", true)[0] : "",
        genres: show.genre_ids.map((genreId) => TV_GENRE_OBJ[genreId]),
        popularity: show.popularity,
      }));
      optionalKeys = { ...optionalKeys, recommendations: resp.data.recommendations.results };
    }

    // Appended Images
    if (appendToResponse.includes("images")) {
      resp.data.images.backdrops = resp.data.images.backdrops.map((imgObj) => ({
        aspectRatio: imgObj.aspect_ratio,
        imageURL: formatImageURL(imgObj.file_path, "m", true)[0],
      }));
      resp.data.images.logos = resp.data.images.logos.map((imgObj) => ({
        aspectRatio: imgObj.aspect_ratio,
        imageURL: formatImageURL(imgObj.file_path, "m", true)[0],
      }));
      resp.data.images.posters = resp.data.images.posters.map((imgObj) => ({
        aspectRatio: imgObj.aspect_ratio,
        imageURL: formatImageURL(imgObj.file_path, "m", true)[0],
      }));
      optionalKeys = { ...optionalKeys, images: resp.data.images };
    }

    searchResults = {
      id: resp.data.id,
      name: resp.data.name,
      originalName: resp.data.original_name,
      overview: resp.data.overview,
      status: resp.data.status,
      tagLine: resp.data.tagline,
      popularity: resp.data.popularity,
      backdropURL: resp.data.backdrop_path
        ? formatImageURL(resp.data.backdrop_path, "m", true)[0]
        : "",
      posterURL: resp.data.poster_path ? formatImageURL(resp.data.poster_path, "m", true)[0] : "",
      avgEpisodeRunTime: resp.data.episode_run_time
        ? averageOfArray(resp.data.episode_run_time)
        : 0,
      firstAirDate: parseToDate(resp.data.first_air_date),
      lastAirDate: parseToDate(resp.data.last_air_date),
      homePage: resp.data.homepage,
      numberOfEpisodes: resp.data.number_of_episodes,
      numberOfSeasons: resp.data.number_of_seasons,
      inProduction: resp.data.in_production,
      imdbId: resp.data.external_ids.imdb_id,
      imdbURL: `https://www.imdb.com/title/${resp.data.external_ids.imdb_id}`,
      imdbEpisodesURL: `https://www.imdb.com/title/${resp.data.external_ids.imdb_id}/episodes`,
      instagramId: resp.data.external_ids.instagram_id,
      tvdbId: resp.data.external_ids.tvdb_id,
      tvRageId: resp.data.external_ids.tvrage_id,
      twitterId: resp.data.external_ids.twitter_id,
      facebookdId: resp.data.external_ids.facebook_id,
      genres: resp.data.genres.map((tvGenreObj) => tvGenreObj.name),
      seasons: seasonFormatter(resp.data.seasons),
      lastEpisodeToAir: episodeFormatter(resp.data.last_episode_to_air),
      nextEpisodeToAir: episodeFormatter(resp.data.next_episode_to_air),
      networks: networksFormatter(resp.data.networks),
      ...optionalKeys,
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
      posterURL: resp.data.poster_path ? formatImageURL(resp.data.poster_path, "m", true)[0] : "",
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
 * Returns episode details for passed tvShowId, seasonNumber and EpisodeNumber
 * @memberOf Curated_API_TV
 * @method
 *
 * @param {number} tvShowId - tvShowId
 * @param {number} seasonNumber -
 * @param {number} episodeNumber -
 * Returns -
 */
function tvGetShowEpisodeDetails(tvShowId, seasonNumber, episodeNumber, appendToResponse = []) {
  let apiCall;
  let searchResults;
  let castResults;

  // Always get external ids using append_to_response tmdb api functionality
  appendToResponse = Array.isArray(appendToResponse) ? appendToResponse : [appendToResponse];
  appendToResponse = [
    ...appendToResponse.map((el) => el.trim()), //remove spaces
  ];

  // Take array of valid append options and join with comma to build param object
  const appendParam = {
    params: { append_to_response: appendToResponse.join(",") },
  };

  return rawTVGetShowEpisodeDetails(tvShowId, seasonNumber, episodeNumber, appendParam).then(
    (resp) => {
      // Curate results
      apiCall = resp.apiCall;
      searchResults = {
        id: resp.data.id,
        seasonNumber: resp.data.season_number,
        name: resp.data.name,
        overview: resp.data.overview,
        stillURL: resp.data.still_path ? formatImageURL(resp.data.still_path, "m", true)[0] : "",
        airDate: parseToDate(resp.data.air_date),
        episodeNumber: resp.data.episode_number,
        // guestStars: resp.data.guest_stars.map((guest) => ({
        //   id: guest.id,
        //   name: guest.name,
        //   creditId: guest.credit_id,
        //   characterName: guest.character,
        //   order: guest.order,
        //   profileURL: guest.profile_path
        //     ? formatImageURL(guest.profile_path, 'm', true)[0]
        //     : '',
        // })),
        guestStars: processCastData(resp.data.guest_stars),
        crew: resp.data.crew.map((member) => ({
          id: member.id,
          name: member.name,
          creditId: member.credit_id,
          job: member.job,
          department: member.department,
          profileURL: member.profile_path ? formatImageURL(member.profile_path, "m", true)[0] : "",
        })),
      };
      if (appendToResponse.includes("credits")) {
        castResults = {
          cast: processCastData(resp.data.credits.cast),
        };
      }
      return {
        data: { ...searchResults, ...castResults },
        apiCall,
      };
    }
  );
}

/**
 * Returns episode External Ids for passed tvShowId, seasonNumber and EpisodeNumber
 * @memberOf Curated_API_TV
 * @method
 *
 * @param {number} tvShowId - tvShowId
 * @param {number} seasonNumber -
 * @param {number} episodeNumber -
 * Returns -
 */

function tvGetShowEpisodeExternalIds(tvShowId, seasonNumber, episodeNumber) {
  let apiCall;
  let searchResults;

  return rawTVGetEpisodeExternalIds(tvShowId, seasonNumber, episodeNumber).then((resp) => {
    // Curate results
    apiCall = resp.apiCall;
    searchResults = {
      id: resp.data.id,
      imdbId: resp.data.imdb_id,
      imdbEpisodeURL: `https://www.imdb.com/title/${resp.data.imdb_id}`,
      freebaseId: resp.data.freebase_id,
      tvdbId: resp.data.tvdb_id,
      tvrageId: resp.data.tvrage_id,
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
function tvGetWatchProviders(showId, countryCodes = ["US"]) {
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
                    logoURL: formatImageURL(el.logo_path, "original", true)[0],
                    providerId: el.provider_id,
                    provider: el.provider_name,
                  })),
              buy: !watchProviders[code].buy
                ? []
                : watchProviders[code].buy.map((el) => ({
                    displayPriority: el.display_priority,
                    logoURL: formatImageURL(el.logo_path, "original", true)[0],
                    providerId: el.provider_id,
                    provider: el.provider_name,
                  })),
              rent: !watchProviders[code].rent
                ? []
                : watchProviders[code].rent.map((el) => ({
                    displayPriority: el.display_priority,
                    logoURL: formatImageURL(el.logo_path, "original", true)[0],
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
  const { TV_GENRE_OBJ } = tmdbConfig.getConfig();
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
        posterURL: show.poster_path ? formatImageURL(show.poster_path, "m", true)[0] : "",
        backdropURL: show.backdrop_path ? formatImageURL(show.backdrop_path, "m", true)[0] : "",
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

function processCastData(castData) {
  return castData.map((castItem) => {
    let roles = {};
    if (castItem.roles) {
      roles = {
        characters: castItem.roles.map((role) => ({
          creditId: role.credit_id,
          characterName: role.character,
          episodeCount: role.episode_count,
        })),
      };
    } else {
      roles = {
        characterName: castItem.character,
        creditId: castItem.credit_id,
      };
    }
    return {
      ...roles,
      personId: castItem.id,
      name: castItem.name,
      gender: castItem.gender,
      profileURL: castItem.profile_path ? formatImageURL(castItem.profile_path, "m", true)[0] : "",
      order: castItem.order,
    };
  });
}

function processCrewData(crewData) {
  return crewData.map((crewMember) => {
    let jobs = {};
    if (crewMember.jobs) {
      jobs = {
        jobs: crewMember.jobs.map((job) => ({
          creditId: job.credit_id,
          job: job.job,
          episodeCount: job.episode_count,
        })),
      };
    } else {
      jobs = {
        creditId: crewMember.credit_id,
        job: crewMember.job,
      };
    }
    return {
      ...jobs,
      personId: crewMember.id,
      name: crewMember.name,
      gender: crewMember.gender,
      profileURL: crewMember.profile_path
        ? formatImageURL(crewMember.profile_path, "m", true)[0]
        : "",
      department: crewMember.department,
    };
  });
}
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
    let cast = processCastData(resp.data.cast);
    let crew = processCrewData(resp.data.crew);

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
      .filter((video) => video.site === "YouTube")
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
  const { TV_GENRE_OBJ } = tmdbConfig.getConfig();

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
        posterURL: tvShow.poster_path ? formatImageURL(tvShow.poster_path, "m", true)[0] : "",
        backdropURL: tvShow.backdrop_path ? formatImageURL(tvShow.backdrop_path, "m", true)[0] : "",
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
        posterURL: tvShow.poster_path ? formatImageURL(tvShow.poster_path, "m", true)[0] : "",
        backdropURL: tvShow.backdrop_path ? formatImageURL(tvShow.backdrop_path, "m", true)[0] : "",
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
  const { TV_GENRE_OBJ } = tmdbConfig.getConfig();
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
      posterURL: result.poster_path ? formatImageURL(result.poster_path, "m", true)[0] : "",
      backdropURL: result.backdrop_path ? formatImageURL(result.backdrop_path, "m", true)[0] : "",
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
  tvGetShowEpisodeDetails,
  tvGetShowEpisodeExternalIds,
  tvGetShowCredits,
  tvGetPopular,
  tvGetWatchProviders,
  tvDiscover,
  tvGetRecommendations,
  tvGetVideos,
  tvGetPersonCredits,
};
