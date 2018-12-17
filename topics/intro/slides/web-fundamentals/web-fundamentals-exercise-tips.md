#Exercise - Web Technologies

### Use POSTMan get data from https://www.themoviedb.org/

Tips

    Create an account to retrieve api key (878)

    // get all genre -> find id for 'science fiction'
    http://api.themoviedb.org/3/genre/movie/list?api_key=f2c64526c8e7dfb7feee32a835558b72

    // API Overview
    https://www.themoviedb.org/documentation/api

    // Discover movie (genre=878 + year=1968)
    http://api.themoviedb.org/3/discover/movie?with_genres=878&year=1968&api_key=f2c64526c8e7dfb7feee32a835558b72

	   Find movie (62)
	   Genre: 'science fiction'  (878)

    // Movie detail
    http://api.themoviedb.org/3/movie/62?api_key=f2c64526c8e7dfb7feee32a835558b72

    // German Title
    http://api.themoviedb.org/3/movie/62/alternative_titles?api_key=f2c64526c8e7dfb7feee32a835558b72

Create a list

```
    Postman

    GET Request Token

    https://api.themoviedb.org/3/authentication/token/new?api_key=f2c64526c8e7dfb7feee32a835558b72

       => request_token

    Browser

        https://www.themoviedb.org/authenticate/REQUEST_TOKEN

    Postman

        GET /authentication/session/new
           * api_key
           * request_token

           => session_id
```

    // get request token
    http://api.themoviedb.org/3/authentication/token/new?api_key=f2c64526c8e7dfb7feee32a835558b72&session_id=be342ffd3290efc2b3b476d0a4ccd35e

    -> "request_token": "246c6029a3b21d4beebddb1a692d0919caee1668"

    // get session id
    http://api.themoviedb.org/3/authentication/session/new?api_key=f2c64526c8e7dfb7feee32a835558b72&request_token=246c6029a3b21d4beebddb1a692d0919caee1668&username=cosemansp&password=silverado

    -> "session_id": "1b3f4905f42d089d0f2300f6961644ca04264291"

    // create list
    http://api.themoviedb.org/3/list?api_key=f2c64526c8e7dfb7feee32a835558b72&session_id=1b3f4905f42d089d0f2300f6961644ca04264291
    {
       "name": "testList",
        "description": "blabla"
    }

    -> "list_id": "5608fa979a12187fd70001e2"

    // add movie to list
    http://api.themoviedb.org/3/list/5608fa979a12187fd70001e2/add_item?api_key=f2c64526c8e7dfb7feee32a835558b72&session_id=1b3f4905f42d089d0f2300f6961644ca04264291
    {
        "media_id": 62
    }
