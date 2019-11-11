# TMDB API Wrapper

This package wraps select API calls from the [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction). To use this, you will need to get an API Key from The Movie Database website.

## Install

```javascript
$ yarn add tmdb_api
```

## API Docs

[https://markmccoid.github.io/tmdb_api/](https://markmccoid.github.io/tmdb_api/)

## Initialize

Before you can call the API functions you will need to initialize the module with your API Key using the `initTMDB(APIKey)` function

```jsx
import React from "react";
import Main from "./components/Main";
import { initTMDB } from "tmdb_api";

function App() {
  initTMDB("0e4935axxxxxxxxxxxxxxxxxx");
  return (
    <div>
      <header>TMDB API Wrapper</header>
      <Main />
    </div>
  );
}

export default App;
```

initTMDB returns a promise, hence is an async function.  This means that if you are programmatically calling any of the tmdb_api functions, you have to wait until the promise resolves.



## Raw API Functions

The _Raw_ API functions are functions that call and return the data directly from the TMDB API endpoints. This is in contrast to the _Curated_ API functions, which do some additional formatting like returning full image URLs.

All Raw API functions return data in the following object shape:

```javascript
{
    data: // The meat of the return from TMDB API call.
    apiCall: <string> // apicall used to get results
}
```

### Error Object

If an error should occur, all Raw API functions return a standard error object in the following shape:

```javascript
{
    error: err, // The full error object
    status: err.response ? err.response.request.status : null,
    statusText: err.response ? err.response.request.statusText : null,
    apiCall: err.response
      ? err.response.request.responseURL
      : err.config
      ? err.config.url
      : null
  }
```

> Note: In raw functions, the full image path is not returned as it is in the curated functions. Refer to [TMDB API for Image](https://developers.themoviedb.org/3/getting-started/images) for details. You can use the _getConfig()_ function to get the config details.

## Curated API Functions

Curated functions are wrappers around the Raw API calls. They do some extra work so you don't have too.

1. Resolve any images to full image paths.
2. Convert date strings to JavaScript date objects
3. Convert genre Ids to genre names (unless you are calling the genre function to get a list of id/genre combinations.)
4. Return a curated set of items from the call.

The returned object shape is the same as the Raw calls:

```javascript
{
    data: // The meat of the return from TMDB API call.
    apiCall: <string> // apicall used to get results
}
```

> Note: for functions that have a page parameter, the data object will also include at the root of the returned object a page (current page you are on), total_results (total count of results), total_pages (total number of pages). You will need this data for pagination.
