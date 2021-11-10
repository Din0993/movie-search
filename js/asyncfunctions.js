// API Configuration for IMAGES
// This is how link to image should look like : https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg
// First part of the link is always the same: https://image.tmdb.org/t/p/
// Second part is size : Get size from config (backdrop_sizes, poster_sizes, profile_sizes and still_sizes).
// Link should look like this after adding size : https://image.tmdb.org/t/p/w500
// Third part is image path which you get from various functions.
// Final link : https://image.tmdb.org/t/p/w154/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg

// FOR trailer images http://img.youtube.com/vi/${key}/0.jpg

// https://www.youtube.com/embed/${key}?autoplay=0

async function config() {
  const config = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=effd1100b651117dbd62b75c4a7eb9b5`
  );

  const configData = config.json();

  return configData;
}

// config().then((data) => console.log(data));

async function genres() {
  const genres = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const genresData = genres.json();

  return genresData;
}

// genres().then((data) => {
//   console.log(data);
// });

async function jobs() {
  const config = await fetch(
    `https://api.themoviedb.org/3/configuration/jobs?api_key=effd1100b651117dbd62b75c4a7eb9b5`
  );

  const configData = config.json();

  return configData;
}

// Function returns search results from users input. You get information of top 20 most popular movies that include input string from user.
async function searchMovies(movie) {
  const movies = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&query=${movie}&page=1&include_adult=false`
  );

  const moviesData = movies.json();

  return moviesData;
}

// searchMovies("Captain America").then((data) => console.log(data));

// Function returns search results from users input. You get information of top 20 most popular tv shows that include input string from user.
async function searchTvShow(tvShow) {
  const tvShows = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=1&query=${tvShow}&include_adult=false`
  );

  const tvShowsData = tvShows.json();

  return tvShowsData;
}

// searchTvShow("Game").then((data) => console.log(data));

// Function returns search results from users input. You get information of top 20 most popular actors that include input string from user.
async function searchPeople(actor) {
  const actors = await fetch(
    `https://api.themoviedb.org/3/search/person?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&query=${actor}&page=1&include_adult=false`
  );

  const actorsData = actors.json();

  return actorsData;
}

// searchPeople("Andy Serkis").then((data) => console.log(data));

// Function returns search results from users input. You get information of top 20 most popular movies, tv shows or actors that include input string from user.
async function searchAnything(input) {
  const universalSearch = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&query=${input}&page=1&include_adult=false`
  );

  const universalSearchData = universalSearch.json();

  return universalSearchData;
}

// searchAnything("Avengers").then((data) => console.log(data));

// Function returns search results from users input. You get information of top 20 most popular collections that include input string from user.
// Collection for example includes all Ironman movies.
async function searchCollections(input) {
  const collections = await fetch(
    `https://api.themoviedb.org/3/search/collection?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&query=${input}&page=1`
  );

  const collectionsData = collections.json();

  return collectionsData;
}

// searchCollections("Avengers").then((data) => console.log(data));

// Function returns details about collection. For example you use searchCollections function to get all collections with users input. Then you get id of collection and pass it
// to this function. This function than displays detailed information about collection user selected.
async function searchCollectionDetails(collectionId) {
  const collection = await fetch(
    `https://api.themoviedb.org/3/collection/${collectionId}?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const collectionData = collection.json();

  return collectionData;
}

//   searchCollectionDetails(131295).then((data) => console.log(data));

// Returns Collection Images
async function searchCollectionImages(collectionId) {
  const collection = await fetch(
    `https://api.themoviedb.org/3/collection/${collectionId}/images?api_key=effd1100b651117dbd62b75c4a7eb9b5`
  );

  const collectionData = collection.json();

  return collectionData;
}

// searchCollectionImages(86311).then((data) => console.log(data));

// Returns data with id-s that match users keyword input.
async function searchKeywords(keyword) {
  const keywords = await fetch(
    `https://api.themoviedb.org/3/search/keyword?api_key=effd1100b651117dbd62b75c4a7eb9b5&query=${keyword}&page=1`
  );

  const keywordsData = keywords.json();

  return keywordsData;
}

// searchKeywords("marvel").then((data) => console.log(data));

// Returns data based on id. This is detailed data of a movie. You can get id from searchMovies function and pass it to this function.
async function getMovieDetails(movieId) {
  const movie = await fetch(
    ` https://api.themoviedb.org/3/movie/${movieId}?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const movieData = movie.json();

  return movieData;
}

// getMovieDetails(597).then((data) => console.log(data));

// Function returns backdrop images and posters based on movie ID.
async function getMovieImage(movieId) {
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=effd1100b651117dbd62b75c4a7eb9b5`
  );

  const movieData = movie.json();

  return movieData;
}

// getMovieImage(597).then((data) => console.log(data));

async function getMovieReleaseDates(movieId) {
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=effd1100b651117dbd62b75c4a7eb9b5`
  );

  const movieData = movie.json();

  return movieData;
}

// getMovieReleaseDates(597).then((data) => console.log(data));

// Get KEY and append it to : https://www.youtube.com/watch?v=
async function getMovieVideos(movieId) {
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=effd1100b651117dbd62b75c4a7eb9b5&append_to_response=videos`
  );

  const movieData = movie.json();

  return movieData;
}

// getMovieVideos(438631).then((data) => console.log(data));

async function getMovieCredits(movieId) {
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const movieData = movie.json();

  return movieData;
}

// getMovieCredits(597).then((data) => console.log(data));

// Get Current Movies in Theaters.
async function getMoviesInTheaters() {
  const movies = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=1`
  );

  const moviesData = movies.json();

  return moviesData;
}

// getMoviesInTheaters().then((data) => console.log(data));

async function getMoviesInTheatersTop100(i) {
  const movies = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=${i}`
  );

  const moviesData = movies.json();

  return moviesData;
}

async function getPopularMovies(i) {
  const movies = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=${i}`
  );

  const moviesData = movies.json();

  return moviesData;
}

// Get top rated Movies on TMDB
async function getTopRatedMovies() {
  const movies = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=1`
  );

  const moviesData = movies.json();

  return moviesData;
}

// getTopRatedMovies().then((data) => console.log(data));

async function getTop1000RatedMovies(i) {
  const movies = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=${i}`
  );

  const moviesData = movies.json();

  return moviesData;
}

// Get upcoming movies in theaters.
async function getSoonInTheaters() {
  const movies = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=1&region=US`
  );

  const moviesData = movies.json();

  return moviesData;
}

// getSoonInTheaters().then((data) => console.log(data));

async function getSoonInTheatersMultiple(i) {
  const movies = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=${i}&region=US`
  );

  const moviesData = movies.json();

  return moviesData;
}

// Get Actor details by passing actor id in function.
async function actorDetails(actorId) {
  const actor = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const actorData = actor.json();

  return actorData;
}

// actorDetails(1223786).then((data) => console.log(data));

// Get Actor Movie credits by passing actor id in function.
async function actorMovieCredits(actorId) {
  const actor = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const actorData = actor.json();

  return actorData;
}

// actorMovieCredits(1223786).then((data) => console.log(data));

// Get Actor Tv Shows credits by passing actor id in function.
async function actorTvCredits(actorId) {
  const actor = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}/tv_credits?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const actorData = actor.json();

  return actorData;
}

// actorTvCredits(1223786).then((data) => console.log(data));

// Get Actor All credits by passing actor id in function.
async function actorAllCredits(actorId) {
  const actor = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const actorData = actor.json();

  return actorData;
}

// actorAllCredits(1223786).then((data) => console.log(data));

// Get Actor images by passing actor id into the function.
async function actorImages(actorId) {
  const actor = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}/images?api_key=effd1100b651117dbd62b75c4a7eb9b5`
  );

  const actorData = actor.json();

  return actorData;
}

// actorImages(1223786).then((data) => console.log(data));

async function actorMostPopular() {
  const actor = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=1`
  );

  const actorData = actor.json();

  return actorData;
}

// actorMostPopular().then((data) => console.log(data));

async function actorMostPopularMultiple(ind) {
  const actor = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=${ind}`
  );

  const actorData = actor.json();

  return actorData;
}

// Get Detailed information about TV-Show based on ID.
async function getTvShowDetails(tvId) {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}

// getTvShowDetails(90462).then((data) => console.log(data));

async function getLastSeason(tvId, seasonNum) {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNum}?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}

// Get Cast and Crew of Tv Show by passing id of Tv Show into the function.
async function getTvShowCredits(tvId) {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}
// getTvShowCredits(1399).then((data) => console.log(data));

async function getAggregateTvShowCredits(tvId) {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/aggregate_credits?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}

// Get TV show posters and backdrop images by passing Tv shows ID.
async function getTvShowImages(tvId) {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/images?api_key=effd1100b651117dbd62b75c4a7eb9b5`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}

// getTvShowImages(1399).then((data) => console.log(data));

// Get tv show Videos like trailers and featurets by passing ID of TV show into the function.
async function getTvShowVideos(tvId) {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}

// getTvShowVideos(1399).then((data) => console.log(data));

// Get TV shows that will air an episode within the next 7 days.
async function getTvShowAiring() {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=1`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}
// getTvShowAiring().then((data) => console.log(data));

async function getTop100TvShowAiring(i) {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=${i}`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}

// Get top 20 most popular TV shows currently.
async function getTvShowMostPopular() {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=1`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}

// getTvShowMostPopular().then((data) => console.log(data));

async function getTop100TvShowMostPopular(i) {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=${i}`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}

// Get Tv show that is airing an episode today.
async function getTvShowAiringToday() {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=1`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}

// getTvShowAiringToday().then((data) => console.log(data));

async function getTop100TvShowAiringToday(i) {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=${i}`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}

async function getTop1000TvShows(i) {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=effd1100b651117dbd62b75c4a7eb9b5&language=en-US&page=${i}`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}

async function credit(i) {
  const tvShow = await fetch(
    `https://api.themoviedb.org/3/credit/${i}?api_key=effd1100b651117dbd62b75c4a7eb9b5`
  );

  const tvShowData = tvShow.json();

  return tvShowData;
}

// https://api.themoviedb.org/3/credit/{credit_id}?api_key=<<api_key>>

// ============================================================================================================================================================
