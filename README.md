# TMDB API Wrapper

This package wraps select API calls from the [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction).  To use this, you will need to get an API Key from The Movie Database website.

## Install

```javascript
$ yarn add tmdb_api
```

## Initialize 

Before you can call the API functions you will need to initialize the module with your API Key using the `initTMDB(APIKey)` function

```jsx
import React from 'react';
import Main from './components/Main';
import { initTMDB } from 'tmdb_api';

function App() {
  initTMDB('0e4935axxxxxxxxxxxxxxxxxx')
  return (
    <div>
      <header>
          TMDB API Wrapper
      </header>
      <Main />
    </div>
  );
}

export default App;
```



## Raw API Function List

The *Raw* API functions are functions that call and return the data directly from the TMDB API endpoints.  This is in contrast to the *Curated* API functions, which do some additional formatting like return full image URLs.

> Note: for functions that have a page parameter, the return set will also include at the root of the returned object a page (current page you are on), total_results (total count of results), total_pages (total number of pages).  You will need this data for pagination.

> Note: In raw functions, the full image path is not returned as it is in the curated functions.  Refer to [TMDB API for Image](https://developers.themoviedb.org/3/getting-started/images) for details.  You can use the *getConfig()* function to get the config details.

- **rawSearchTVByTitle(searchString, page = 1)** -  searchString will search the for matching titles.  Page defaults to the first page, but if you want to allow pagination, simply pass the page that you would like.

  ```javascript
  // Return Object:
  {
      page: int,
      total_results: int,
      total_pages: int,
      results: array
  }
  ```

- **rawGetShowDetails** -  

- **rawGetEpisodes** -  

- **rawGetShowImages** -  

- **rawGetExternalIds** -  

- **rawGetCredits** -  

- **rawGetCreditDetails** -  

- **rawGetPersonDetails** -  

- **rawSearchMovieByTitle** -  

- **rawGetMovieDetails** -  

- **rawGetMovieImages** -  

- **rawGetPersonDetails_Movie** -  

- **rawDiscoverMovies** -  

- **rawSearchForPerson** -  