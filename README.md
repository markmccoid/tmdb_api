# TMDB API Wrapper

This package wraps select API calls from the [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction). To use this, you will need to get an API Key from The Movie Database website.

## Motivation

This project was inspired when writing another application that accessed the TMDB API for TV data.  I found that I wrote a bunch of functions to get the data and then had to curate the return data into something useful.  It seemed to make sense to package all this logic into a single package that could be included in any other project.

Realize that the TMDB API is HUGE!  So, my goal was to encapsulate the most common data that a project would need.  If data is missing that you need, do a pull request and add it!

## Install

```javascript
$ yarn add tmdb_api
```

## API Docs

The API Docs will help you navigate the functions available. [https://markmccoid.github.io/tmdb_api/](https://markmccoid.github.io/tmdb_api/)

You will find that there are two main types of data returned.  Either **Raw** or **Curated**.

**Raw** API functions are simply calls to the main API endpoints, returning all data from them.

**Curated** API functions take the Raw data and format it in a way to make it easier to use and manipulate.

The Raw and Curated functions are split into Common, TV and Movie functions.  TV and Movie are self explanatory. The Common functions are those that span both TV and Movies.  These will include Person data.

Lastly, there is a section of **Helpers** functions.  You most likely will not need these if you are using the Curated functions.

I've also tried to include typedefs for the curated functions so will have some documentation on what information is returned with each call.

## Initialize

Before you can call the API functions you will need to initialize the module with your API Key using the `initTMDB(APIKey, [options])` function.  The options object is optional.

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

The options object currently is only used for date formatting.

```javascript
{
  dateFormatString: "MM-dd-yyyy"
};
```

The *dateFormatString* must use the formatting options from the [**date-fns** package](https://date-fns.org/v2.7.0/docs/format).

If you need to change the *dateFormatString* after initialization, just use the **updateAPIOptions(options)** functions.

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

2. Convert date strings to an JavaScript Object in the form

   ```javascript
   {
       date, // JavaScript date
       epoch, // Unix timestamp -- Seconds from 1/1970
       formatted //Formatted based on the dateFormatString passed in initTMDB() function. Default "MM-dd-yyyy"
   }
   ```

3. Convert genre Ids to genre names (unless you are calling the genre function to get a list of id/genre combinations.)

4. Return a curated set of items from the call.

The returned object shape is the same as the Raw calls:

```javascript
{
    data: // The meat of the return from TMDB API call.
    apiCall: <string> // apicall used to get results
    page: <int> // ONLY returned for functions with a page argument
    totalResults: <int> // ONLY returned for functions with a page argument
    totalPages: <int> // ONLY returned for functions with a page argument
}
```

> Note: for functions that have a page argument, the data object will also include, at the root of the returned object, a page (current page you are on), totalResults (total count of results), totalPages (total number of pages) properties. You will need this data for pagination.
