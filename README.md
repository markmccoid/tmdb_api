# TMDB API Wrapper

This package wraps select API calls from the [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction). To use this, you will need to get an API Key from The Movie Database website.

## Motivation

This project was inspired when writing another application that accessed the TMDB API for TV data. I found that I wrote a bunch of functions to get the data and then had to curate the return data into something useful. It seemed to make sense to package all this logic into a single package that could be included in any other project.

Realize that the TMDB API is HUGE! So, my goal was to encapsulate the most common data that a (my) project would need. If data is missing that you need, do a pull request and add it!

## Install

```javascript
$ yarn add @markmccoid/tmdb_api
## OR
$ npm install @markmccoid/tmdb_api
```

## API Docs

The API Docs will help you navigate the functions available. [https://markmccoid.github.io/tmdb_api/](https://markmccoid.github.io/tmdb_api/)

> NOTE: The generated docs for the functions are going to be superseded by the TypeScript type annotations.

You will find that there are two main types of data returned. Either **Raw** or **Curated**.

**Raw** API functions are simply calls to the main API endpoints, returning all data from them.

**Curated** API functions take the Raw data and format it in a way to make it easier to use and manipulate.

The Raw and Curated functions are split into Common, TV and Movie functions. TV and Movie are self explanatory. The Common functions are those that span both TV and Movies. These will include Person data.

Lastly, there is a section of **Helpers** functions. You most likely will not need these if you are using the Curated functions.

I've also tried to include typedefs for the curated functions so will have some documentation on what information is returned with each call.

## Initialize

Before you can call the API functions you will need to initialize the module with your API Key using the `initTMDB(APIKey, [options])` function. The options object is optional.

```jsx
import React from "react";
import Main from "./components/Main";
import { initTMDB } from "@markmccoid/tmdb_api";

function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const initializeApp = async () => {
      const tmdbConfig = await initTMDB("0e4935axxxxxxxxxxxxxxxxxx");
      setIsLoaded(true);
    };
    initializeApp();
  }, []);

  if (!isLoaded) {
    return <div>Initializing App...</div>;
  }
  return (
    <div>
      <header>TMDB API Wrapper</header>
      <Main />
    </div>
  );
}

export default App;
```

initTMDB returns a config object that contains the config information used in the application. You probably won't need it.

```ts
interface TMDBConfig {
  IMG_URL: string;
  SECURE_IMG_URL: string;
  API_KEY: string;
  TV_GENRE_OBJ: { [key: number]: string };
  MOVIE_GENRE_OBJ: { [key: number]: string };
  API_OPTIONS: {
    dateFormatString: string;
  };
}
```

### Options Object

When initializing, you also have the options to pass an _Options_ object. This will set some defaults for how this package will return your data and query the TMDB api.

- **dateFormatString**

```javascript
{
  dateFormatString: "MM-dd-yyyy";
}
```

The _dateFormatString_ must use the formatting options from the [**date-fns** package](https://date-fns.org/v2.7.0/docs/format).

- **defaultAPIParams**

```javascript
{
  defaultAPIParams: {
    include_adult: false;
  }
}
```

The _defaultAPIParams_ object currently allows you to change the "include_adult" flag. If not passed, the default is "false".

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
       formatted; //Formatted based on the dateFormatString passed in initTMDB() function. Default "MM-dd-yyyy"
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

## TypeScript

My first go at using TypeScript in a project, so any comments would be appreciated.

The type definition files (_\*.d.ts_) are located in the `./types` directory and follows the same directory structure as the source files.

The **Curated** functions have a return type that is made up of a **Base** type so that the main results can have a separate type that you can use in your applications if needed.

For example, most **curated** functions return one of two differenct structures where the result data is in a separate key:

```javascript
// -- Results that when queried will have multiple pages
{
  data: CustomType; // The meat of the return from TMDB API call.
  apiCall: string; // apicall used to get results
  page: number; // ONLY returned for functions with a page argument
  totalResults: number; // ONLY returned for functions with a page argument
  totalPages: number; // ONLY returned for functions with a page argument
}

// -- Results that are returned all in the single query
{
  data: CustomType; // The meat of the return from TMDB API call.
  apiCall: string; // apicall used to get results
}
```

Since multiple functions will be returning this shape, I've create two Generics to handle these.

```typescript
export type BaseSinglePage<T> = {
  data: T;
  apiCall: string;
};

export type BaseMultiPage<T> = {
  data: {
    page: number;
    totalResults: number;
    totalPages: number;
    results: T;
  };
  apiCall: string;
};
```

What this means is that you can pull in the **T** type to type the actual data/results that you will most likely be using in your application.

For example, `tvGetShowDetails(showId)` returns the **TVShowDetailsBase** type, but is built using the BaseSinglePage generic passing in the **TVShowDetails** type, which ends up typeing the `data` portion of the return object:

```typescript
function tvGetShowDetails(showId: number): Promise<TVShowDetailsBase>;

//-- Base built here
export type TVShowDetailsBase = BaseSinglePage<TVShowDetails>;

//-- Which results in this
type TVShowDetailsBase = {
  data: TVShowDetails;
  apiCall: string;
};
```

Both **tvSearchByTitle** and **tvGetPopular** return the _BaseMultiPage_ generic:

```typescript
export function tvSearchByTitle(searchValue: string, page?: number): Promise<TVSearchResultBase>;

export function tvGetPopular(page?: number, language?: string): Promise<TVSearchResultBase>;

//-- Base built here
export type TVSearchResultBase = BaseMultiPage<TVSearchResultItem[]>;

//-- Which results in this
type TVSearchResultBase = {
  data: {
    page: number;
    totalResults: number;
    totalPages: number;
    results: TVSearchResultItem[];
  };
  apiCall: string;
};
```
