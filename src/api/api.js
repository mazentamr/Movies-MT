

export const API_Key="c6788a2ac30e2cf0fd5943a27d615227"

export const Request_move={
    Trending_movie:`/trending/all/day?api_key=${API_Key}`,
    Top_rated:`/movie/top_rated?api_key=${API_Key}&language=ar`,
    Action_movie:`/discover/movie?api_key=${API_Key}&language=ar&page=2&with_genres=28`,
    Adventure_movie:`/discover/movie?api_key=${API_Key}&language=ar&with_genres=12`,
    Animation_movie:`/discover/movie?api_key=${API_Key}&language=ar&with_genres=16`,
    Comedy_movie:`/discover/movie?api_key=${API_Key}&language=ar&with_genres=35`,
    Crime_movie:`/discover/movie?api_key=${API_Key}&language=ar&with_genres=80`,
    Documentary_movie:`/discover/movie?api_key=${API_Key}&language=ar&with_genres=99`,
    Drama_movie:`/discover/movie?api_key=${API_Key}&language=ar&with_genres=18`,
    Romance_movie:`/discover/movie?api_key=${API_Key}&language=ar&with_genres=10749`,
    War_movie:`/discover/movie?api_key=${API_Key}&language=ar&with_genres=10752`,
}
export const infoMovie=(id)=>`/movie/${id}?api_key=${API_Key}&language=en-US`
export const Actors=(id)=>`/movie/${id}/credits?api_key=${API_Key}&language=en-US`
export const Belongs=(id)=>`/movie/${id}/similar?api_key=${API_Key}&language=en-US&page=1`
export const Videos=(id)=>`/movie/${id}/videos?api_key=${API_Key}&language=en-US`
export const searchMove=(name)=>`https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&language=en-US&page=1&include_adult=false&query=${name}`


// export const Actors=`/movie/615678/credits?api_key=${API_Key}&language=en-US`
// export const Belongs=`/movie/{movie_id}/lists?api_key=${API_Key}&language=en-US&page=1`


//
//https://api.themoviedb.org/3/movie/615678/similar?api_key=c6788a2ac30e2cf0fd5943a27d615227&language=en-US&page=1


//tamplat moves
//https://dribbble.com/shots/3262954-MovieRise-IMDB-Netflix-Inspired-FREE


//url
//https://api.themoviedb.org/3


//احصل على الممثلين وطاقم العمل لفيلم.
//https://api.themoviedb.org/3/movie/615678/credits?api_key=c6788a2ac30e2cf0fd5943a27d615227&language=en-US


// احصل على المعلومات الأساسية حول الفيلم.
//https://api.themoviedb.org/3/movie/460465?api_key=c6788a2ac30e2cf0fd5943a27d615227&language=en-US


//احصل على جميع العناوين البديلة للفيلم.
//https://api.themoviedb.org/3/movie/615678/alternative_titles?api_key=c6788a2ac30e2cf0fd5943a27d615227

//احصل على قائمة بالقوائم التي ينتمي إليها هذا الفيلم.
//https://api.themoviedb.org/3/movie/{movie_id}/lists?api_key=<<api_key>>&language=en-US&page=1


//top_rated
//https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1

//
// https://api.themoviedb.org/3/discover/movie?api_key=c6788a2ac30e2cf0fd5943a27d615227&language=en-US&with_genres=28

//imege
//https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

//c6788a2ac30e2cf0fd5943a27d615227



//with_genres
//https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&with_genres=12

//trending
//https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>

//--/trending/all/day?api_key=<<api_key>>



/*
 * {
    "genres": [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]
}
 */

