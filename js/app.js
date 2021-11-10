"use strict";

//========================================================================= VARIABLES ======================================================================================================

let moviesInTheatersIds = [];
let moviesInTheatersYtKeys = [];
let top50PagesActors = [];
let top1000Actors = [];
let selectedGenre = "";
let topRatedMoviesArr = [];
let topRatedTvShowsArr = [];
let movieGenresArr = [];
let hiddenMenuStatus = 0;

//========================================================================= DOM ELEMENTS ===================================================================================================

const searchInput = document.querySelector(".navigation__input");
const searchSuggestions = document.querySelector(".navigation__suggestions");
var myCarousel = document.querySelector("#myCarousel");
var carousel = new bootstrap.Carousel(myCarousel);
const carouselItem1 = document.querySelector(".carousel-item-1");
const carouselItem2 = document.querySelector(".carousel-item-2");
const carouselItem3 = document.querySelector(".carousel-item-3");
const carouselItem4 = document.querySelector(".carousel-item-4");
const carouselItem5 = document.querySelector(".carousel-item-5");
const carouselItems = [
  carouselItem1,
  carouselItem2,
  carouselItem3,
  carouselItem4,
  carouselItem5,
];
const ytModal = document.querySelector(".modal-yt-video");
const ytVideo = document.querySelector("#ytplayer-modal");
const closeModalBtn = document.querySelector(".close-modal");
const carouselImg1 = document.querySelector(".carousel-movie-img-1");
const carouselImg2 = document.querySelector(".carousel-movie-img-2");
const carouselImg3 = document.querySelector(".carousel-movie-img-3");
const carouselImg4 = document.querySelector(".carousel-movie-img-4");
const carouselImg5 = document.querySelector(".carousel-movie-img-5");
const carouselImages = [
  carouselImg1,
  carouselImg2,
  carouselImg3,
  carouselImg4,
  carouselImg5,
];
const carouselMovieName1 = document.querySelector(".carousel-movie-name-1");
const carouselMovieName2 = document.querySelector(".carousel-movie-name-2");
const carouselMovieName3 = document.querySelector(".carousel-movie-name-3");
const carouselMovieName4 = document.querySelector(".carousel-movie-name-4");
const carouselMovieName5 = document.querySelector(".carousel-movie-name-5");
const carouselMovieNames = [
  carouselMovieName1,
  carouselMovieName2,
  carouselMovieName3,
  carouselMovieName4,
  carouselMovieName5,
];

const tvShowCardNames = document.querySelectorAll(
  ".popular-tv-shows__card__name"
);

const tvShowCardImages = document.querySelectorAll(
  ".popular-tv-shows__card__img"
);

const tvShowOverviewNames = document.querySelectorAll(
  ".popular-tv-shows__card__overview__heading"
);
const tvShowOverviewGenres = document.querySelectorAll(
  ".popular-tv-shows__card__overview__genres"
);

const tvShowOverviewFirstAirDates = document.querySelectorAll(
  ".popular-tv-shows__card__overview__first-air-date"
);

const tvShowOverviewLastAirDates = document.querySelectorAll(
  ".popular-tv-shows__card__overview__last-air-date"
);

const tvShowOverviewRuntimes = document.querySelectorAll(
  ".popular-tv-shows__card__overview__runtime"
);

const tvShowOverviewStatuses = document.querySelectorAll(
  ".popular-tv-shows__card__overview__status"
);

const tvShowOverviewButtons = document.querySelectorAll(
  ".popular-tv-shows__card__overview__btn"
);

const movieGenres = document.querySelectorAll(
  ".top-rated-movies-by-genres__genre"
);

const topRatedMoviesByGenreImages = document.querySelectorAll(
  ".top-rated-movies-by-genres__movie-container__card__img"
);

const topRatedMoviesByGenreNames = document.querySelectorAll(
  ".top-rated-movies-by-genres__movie-container__card__name"
);

const topRatedMoviesByGenreOverviewNames = document.querySelectorAll(
  ".top-rated-movies-by-genres__movie-container__card__overview__heading"
);

const topRatedMoviesByGenreOriginalLanguages = document.querySelectorAll(
  ".top-rated-movies-by-genres__movie-container__card__overview__genres"
);

const topRatedMoviesByGenreReleaseDates = document.querySelectorAll(
  ".top-rated-movies-by-genres__movie-container__card__overview__first-air-date"
);

const topRatedMoviesCards = document.querySelectorAll(
  ".top-rated-movies-by-genres__movie-container__card"
);

const topRatedMoviesByGenreBtns = document.querySelectorAll(
  ".top-rated-movies-by-genres__movie-container__card__overview__btn"
);

const tvShowGenres = document.querySelectorAll(
  ".top-rated-tv-shows-by-genre__genre"
);

const topRatedTvShowsByGenreImages = document.querySelectorAll(
  ".top-rated-tv-shows-by-genre__movie-container__card__img"
);

const topRatedTvShowsByGenreNames = document.querySelectorAll(
  ".top-rated-tv-shows-by-genre__movie-container__card__name"
);

const topRatedTvShowsByGenreOverviewNames = document.querySelectorAll(
  ".top-rated-tv-shows-by-genre__movie-container__card__overview__heading"
);

const topRatedTvShowsByGenreOverviewOriginalLanguage =
  document.querySelectorAll(
    ".top-rated-tv-shows-by-genre__movie-container__card__overview__genres"
  );

const topRatedTvShowsByGenreOverviewFirstAirDate = document.querySelectorAll(
  ".top-rated-tv-shows-by-genre__movie-container__card__overview__first-air-date"
);

const topRatedTvShowCards = document.querySelectorAll(
  ".top-rated-tv-shows-by-genre__movie-container__card"
);

const topRatedTvShowsDetailsBtn = document.querySelectorAll(
  ".top-rated-tv-shows-by-genre__movie-container__card__overview__btn"
);

const genreTvBtn = document.querySelector(".top-rated-tv-shows-by-genre__btn");

const bornTodayImages = document.querySelectorAll(".born-today__card__img");
const bornTodayNames = document.querySelectorAll(".born-today__card__name");
const bornTodayAges = document.querySelectorAll(".born-today__card__age");

const mostPopularMovie = document.querySelector(".popular-today__movie");
const mostPopularMovieName = document.querySelector(
  ".popular-today__movie__name"
);
const mostPopularPerson = document.querySelector(".popular-today__person");
const mostPopularPersonName = document.querySelector(
  ".popular-today__person__name"
);

const genreBtn = document.querySelector(".top-rated-movies-by-genres__btn");

const hiddenMenu = document.querySelector(".navigation__hidden-menu");
const hiddenMenuMoviesBtn = document.querySelector(
  ".navigation__hidden-menu__movies__heading-btn"
);
const hiddenMenuTvShowsBtn = document.querySelector(
  ".navigation__hidden-menu__tvshows__heading-btn"
);
const hiddenMenuPeopleBtn = document.querySelector(
  ".navigation__hidden-menu__people__heading-btn"
);
const hamburgerBtn = document.querySelector(".navigation__hamburger");
const hiddenMoviesList = document.querySelector(
  ".navigation__hidden-menu__movies__drop__list"
);
const hiddenTvShowsList = document.querySelector(
  ".navigation__hidden-menu__tvshows__drop__list"
);
const hiddenPeopleList = document.querySelector(
  ".navigation__hidden-menu__people__drop__list"
);

// =========================================================================================================================================================================================

// ======================================================================= EVENT LISTENERS =================================================================================================

searchInput.addEventListener("input", displaySuggestions);
carouselItems.forEach((item) => {
  item.addEventListener("click", function () {
    ytModal.style.display = "block";
  });
});

closeModalBtn.addEventListener("click", function () {
  ytModal.style.display = "none";
  ytVideo.setAttribute("src", "");
});

document
  .querySelector(".top-rated-movies-by-genres__drop-content")
  .addEventListener("click", function (e) {
    if (e.target.className === "top-rated-movies-by-genres__genre") {
      topRatedMoviesCards.forEach((card) => {
        card.style.display = "block";
      });
      document.querySelector(
        ".top-rated-movies-by-genres__movie-container"
      ).style.visibility = "visible";
      genreBtn.innerHTML = e.target.innerHTML;
      let genreId = Number(e.target.dataset.id);
      let movieGenreCnt = 0;
      genres().then((data) => {
        data.genres.forEach((genre) => {
          if (genreId === genre.id) {
            selectedGenre = genre.name;
          }
        });
      });
      getTop1000RatedMovies(1)
        .then((data) => {
          data.results.forEach((mov) => {
            topRatedMoviesArr.push(mov);
          });
        })
        .then(() => {
          for (let i = 2; i < 50; i++) {
            getTop1000RatedMovies(i).then((data) => {
              for (let i = 0; i < data.results.length; i++) {
                topRatedMoviesArr.push(data.results[i]);
              }
            });
          }
        })
        .then(() => {
          getTop1000RatedMovies(50)
            .then((data) => {
              data.results.forEach((mov) => {
                topRatedMoviesArr.push(mov);
              });
            })
            .then(() => {
              topRatedMoviesArr.forEach((mov) => {
                if (movieGenreCnt < 5) {
                  if (mov.genre_ids.includes(genreId)) {
                    const previousMarkup = document.querySelector(
                      ".no-movies-paragraph"
                    );
                    if (previousMarkup) {
                      previousMarkup.parentNode.removeChild(previousMarkup);
                    }
                    topRatedMoviesCards.forEach((card) => {
                      card.style.height = "33.5rem";
                    });
                    topRatedMoviesCards[movieGenreCnt].setAttribute(
                      "data-movieid",
                      mov.id
                    );

                    document.querySelector(
                      ".top-rated-movies-by-genres__movie-container"
                    ).style.visibility = "visible";
                    topRatedMoviesByGenreImages[movieGenreCnt].setAttribute(
                      "src",
                      `https://image.tmdb.org/t/p/w300${mov.poster_path}`
                    );
                    topRatedMoviesByGenreNames[movieGenreCnt].textContent =
                      mov.title;
                    topRatedMoviesByGenreOverviewNames[
                      movieGenreCnt
                    ].textContent = mov.title;
                    topRatedMoviesByGenreOriginalLanguages[
                      movieGenreCnt
                    ].textContent = `Original Language: ${mov.original_language.toUpperCase()}`;
                    topRatedMoviesByGenreReleaseDates[
                      movieGenreCnt
                    ].textContent = `Release date: ${mov.release_date}`;
                    movieGenreCnt++;
                  }
                }
              });
              if (movieGenreCnt === 0) {
                const previousMarkup = document.querySelector(
                  ".no-movies-paragraph"
                );
                if (previousMarkup) {
                  previousMarkup.parentNode.removeChild(previousMarkup);
                }
                let markup = `<p class="no-movies-paragraph">NO MOVIES WITH THIS GENRE IN OUR BASE :(</p>`;
                document
                  .querySelector(".top-rated-movies-by-genres")
                  .insertAdjacentHTML("beforeend", markup);
                topRatedMoviesCards.forEach((card) => {
                  card.style.height = "0";
                });
                document.querySelector(
                  ".top-rated-movies-by-genres__movie-container"
                ).style.visibility = "hidden";
              }
            })
            .then(() => {
              topRatedMoviesByGenreBtns.forEach((btn) => {
                btn.addEventListener("click", function (e) {
                  // console.log(e.target.parentNode.parentNode.dataset.id);
                  localStorage.setItem(
                    "movieid",
                    e.target.parentNode.parentNode.dataset.movieid
                  );
                });
              });
            });
        });
    }
  });

document
  .querySelector(".top-rated-tv-shows-by-genre__drop-content")
  .addEventListener("click", function (e) {
    if (e.target.className === "top-rated-tv-shows-by-genre__genre") {
      topRatedTvShowCards.forEach((card) => {
        card.style.display = "block";
      });
      document.querySelector(
        ".top-rated-tv-shows-by-genre__movie-container"
      ).style.visibility = "visible";
      genreTvBtn.innerHTML = e.target.innerHTML;
      let genreId = Number(e.target.dataset.id);
      let tvGenreCnt = 0;
      genres().then((data) => {
        data.genres.forEach((genre) => {
          if (genreId === genre.id) {
            selectedGenre = genre.name;
          }
        });
      });
      getTop1000TvShows(1)
        .then((data) => {
          data.results.forEach((mov) => {
            topRatedTvShowsArr.push(mov);
          });
        })
        .then(() => {
          for (let i = 2; i < 50; i++) {
            getTop1000TvShows(i).then((data) => {
              for (let i = 0; i < data.results.length; i++) {
                topRatedTvShowsArr.push(data.results[i]);
              }
            });
          }
        })
        .then(() => {
          getTop1000TvShows(50)
            .then((data) => {
              data.results.forEach((mov) => {
                topRatedTvShowsArr.push(mov);
              });
            })
            .then(() => {
              topRatedTvShowsArr.forEach((mov) => {
                if (tvGenreCnt < 5) {
                  if (mov.genre_ids.includes(genreId)) {
                    topRatedTvShowCards[tvGenreCnt].setAttribute(
                      "data-tvid",
                      mov.id
                    );
                    const previousMarkup = document.querySelector(
                      ".no-tv-shows-paragraph"
                    );
                    if (previousMarkup) {
                      previousMarkup.parentNode.removeChild(previousMarkup);
                    }
                    document.querySelector(
                      ".top-rated-tv-shows-by-genre__movie-container"
                    ).style.visibility = "visible";
                    topRatedTvShowCards.forEach((card) => {
                      card.style.height = "33.5rem";
                    });
                    topRatedTvShowsByGenreImages[tvGenreCnt].setAttribute(
                      "src",
                      `https://image.tmdb.org/t/p/w300${mov.poster_path}`
                    );
                    topRatedTvShowsByGenreNames[tvGenreCnt].textContent =
                      mov.name;
                    topRatedTvShowsByGenreOverviewNames[
                      tvGenreCnt
                    ].textContent = mov.name;
                    topRatedTvShowsByGenreOverviewOriginalLanguage[
                      tvGenreCnt
                    ].textContent = `Original Language: ${mov.original_language.toUpperCase()}`;
                    topRatedTvShowsByGenreOverviewFirstAirDate[
                      tvGenreCnt
                    ].textContent = `Release date: ${mov.first_air_date}`;
                    tvGenreCnt++;
                  }
                }
              });
              if (tvGenreCnt === 0) {
                const previousMarkup = document.querySelector(
                  ".no-tv-shows-paragraph"
                );
                if (previousMarkup) {
                  previousMarkup.parentNode.removeChild(previousMarkup);
                }
                let markup = `<p class="no-tv-shows-paragraph">NO TV SHOWS WITH THIS GENRE IN OUR BASE :(</p>`;
                document
                  .querySelector(".top-rated-tv-shows-by-genre")
                  .insertAdjacentHTML("beforeend", markup);
                topRatedTvShowCards.forEach((card) => {
                  card.style.height = "0";
                });
                document.querySelector(
                  ".top-rated-tv-shows-by-genre__movie-container"
                ).style.visibility = "hidden";
              }
              topRatedTvShowsDetailsBtn.forEach((btn) => {
                btn.addEventListener("click", function (e) {
                  // console.log(e.target.parentNode.parentNode.dataset.id);
                  localStorage.setItem(
                    "tvid",
                    e.target.parentNode.parentNode.dataset.tvid
                  );
                });
              });
            });
        });
    }
  });

hamburgerBtn.addEventListener("click", function () {
  if (hiddenMenuStatus === 0) {
    hiddenMenu.style.opacity = "1";
    hiddenMenu.style.left = "0";
    hiddenMenu.style.pointerEvents = "visible";
    hiddenMenuStatus++;
    document.querySelector("body").style.overflow = "hidden";
  } else {
    hiddenMenu.style.left = "200rem";
    hiddenMenu.style.opacity = "0";
    hiddenMenu.style.pointerEvents = "none";
    hiddenMenuStatus--;
    document.querySelector("body").style.overflow = "initial";
    hiddenMoviesList.style.display = "none";
    hiddenTvShowsList.style.display = "none";
    hiddenPeopleList.style.display = "none";
  }
});

hiddenMenuMoviesBtn.addEventListener("click", function () {
  hiddenMoviesList.style.display = "flex";
});
hiddenMenuTvShowsBtn.addEventListener("click", function () {
  hiddenTvShowsList.style.display = "flex";
});
hiddenMenuPeopleBtn.addEventListener("click", function () {
  hiddenPeopleList.style.display = "flex";
});

// =========================================================================================================================================================================================

// ======================================================================== REGULAR FUNCTIONS ==============================================================================================

window.onload = function () {
  document.onclick = function (e) {
    if (e.target.className !== searchSuggestions.className) {
      searchSuggestions.style.display = "none";
      document.querySelector(".in-theaters-and-popular").style.pointerEvents =
        "auto";
    }
  };
};

function displaySuggestions() {
  if (searchInput.value !== "") {
    searchAnything(searchInput.value)
      .then((data) => {
        document.querySelector(".in-theaters-and-popular").style.pointerEvents =
          "none";
        let markup = ``;
        searchSuggestions.style.display = "flex";
        data.results.forEach((el, i) => {
          let idStr = ``;
          let link = ``;
          if (el.media_type === "movie") {
            link = "/pages/details/movie/index.html";
            idStr = "movie";
          }
          if (el.media_type === "tv") {
            link = "/pages/details/tvshow/index.html";
            idStr = "tv";
          }
          if (el.media_type === "person") {
            link = "/pages/details/people/index.html";
            idStr = "people";
          }
          if (
            i < 5 &&
            el.poster_path !== undefined &&
            el.media_type !== "person"
          ) {
            markup += `
            <a href="${link}" class="navigation__suggestions__item" data-${idStr}id="${
              el.id
            }">
              <img
                src=${
                  el.poster_path !== null
                    ? `https://image.tmdb.org/t/p/w92${el.poster_path}`
                    : "/images/placeholder-movie.png"
                }
                class="navigation__suggestions__img"
              />
              <p class="navigation__suggestions__name">${
                el.media_type === "tv"
                  ? el.original_name +
                    " " +
                    "(" +
                    el.first_air_date.split("-")[0] +
                    ")"
                  : el.original_title +
                    " (" +
                    el.release_date.split("-")[0] +
                    ")"
              } </p>
            </a>
          `;
          }
          if (i < 5 && el.media_type === "person") {
            markup += `
            <a href="${link}" class="navigation__suggestions__item" data-${idStr}id="${
              el.id
            }">
              <img
                src=${
                  el.profile_path !== null
                    ? `https://image.tmdb.org/t/p/w92${el.profile_path}`
                    : "/images/no-image-person.png"
                } 
                class="navigation__suggestions__img"
              />
              <p class="navigation__suggestions__name">${el.name} </p>
            </a>
          `;
          }

          searchSuggestions.innerHTML = "";
          searchSuggestions.style.height = `${
            i < 5 ? (i + 1) * 10.1 : 50.5
          }rem`;
          searchSuggestions.insertAdjacentHTML("beforeend", markup);
        });
      })
      .then(() => {
        document
          .querySelectorAll(".navigation__suggestions__item")
          .forEach((el) => {
            el.addEventListener("click", function () {
              if (el.dataset.movieid) {
                localStorage.setItem(`movieid`, el.dataset.movieid);
              } else if (el.dataset.tvid) {
                localStorage.setItem(`tvid`, el.dataset.tvid);
              } else {
                localStorage.setItem(`peopleid`, el.dataset.peopleid);
              }
            });
          });
      });
  } else {
    searchSuggestions.style.display = "none";
  }
}

// =========================================================================================================================================================================================
// =================================================================== USING ASYNC FUNCTIONS ===============================================================================================

getMoviesInTheaters()
  .then((data) => {
    for (let i = 0; i < 5; i++) {
      let movie = { title: data.results[i].title, id: data.results[i].id };
      moviesInTheatersIds.push(movie);
    }
  })
  .then(() => {
    getMovieVideos(moviesInTheatersIds[0].id)
      .then((data) => {
        let movie;
        data.results.forEach((d) => {
          if (d.name.includes("Trailer") && !d.name.includes("Teaser")) {
            if (d.name === "Final Trailer") {
              movie = { key: d.key, name: d.name };
              moviesInTheatersYtKeys.push(movie);
            } else {
              movie = { key: d.key, name: d.name };
            }
          }
        });
        if (moviesInTheatersYtKeys.length === 0) {
          moviesInTheatersYtKeys.push(movie);
        }
      })
      .then(() => {
        getMovieVideos(moviesInTheatersIds[1].id)
          .then((data) => {
            let movie;
            data.results.forEach((d) => {
              if (d.name.includes("Trailer") && !d.name.includes("Teaser")) {
                if (d.name === "Final Trailer") {
                  movie = { key: d.key, name: d.name };
                  moviesInTheatersYtKeys.push(movie);
                } else {
                  movie = { key: d.key, name: d.name };
                }
              }
            });
            if (moviesInTheatersYtKeys.length === 1) {
              moviesInTheatersYtKeys.push(movie);
            }
          })
          .then(() => {
            getMovieVideos(moviesInTheatersIds[2].id)
              .then((data) => {
                let movie;
                data.results.forEach((d) => {
                  if (
                    d.name.includes("Trailer") &&
                    !d.name.includes("Teaser")
                  ) {
                    if (d.name === "Final Trailer") {
                      movie = { key: d.key, name: d.name };
                      moviesInTheatersYtKeys.push(movie);
                    } else {
                      movie = { key: d.key, name: d.name };
                    }
                  }
                });
                if (moviesInTheatersYtKeys.length === 2) {
                  moviesInTheatersYtKeys.push(movie);
                }
              })
              .then(() => {
                getMovieVideos(moviesInTheatersIds[3].id)
                  .then((data) => {
                    let movie;
                    data.results.forEach((d) => {
                      if (
                        d.name.includes("Trailer") &&
                        !d.name.includes("Teaser")
                      ) {
                        if (d.name === "Final Trailer") {
                          movie = { key: d.key, name: d.name };
                          moviesInTheatersYtKeys.push(movie);
                        } else {
                          movie = { key: d.key, name: d.name };
                        }
                      }
                    });
                    if (moviesInTheatersYtKeys.length === 3) {
                      moviesInTheatersYtKeys.push(movie);
                    }
                  })
                  .then(() => {
                    getMovieVideos(moviesInTheatersIds[4].id)
                      .then((data) => {
                        let movie;
                        data.results.forEach((d) => {
                          if (
                            d.name.includes("Trailer") &&
                            !d.name.includes("Teaser")
                          ) {
                            if (d.name === "Final Trailer") {
                              movie = { key: d.key, name: d.name };
                              moviesInTheatersYtKeys.push(movie);
                            } else {
                              movie = { key: d.key, name: d.name };
                            }
                          }
                        });
                        if (moviesInTheatersYtKeys.length === 4) {
                          moviesInTheatersYtKeys.push(movie);
                        }
                      })
                      .then(() => {
                        for (let i = 0; i < 5; i++) {
                          let movieThumbn = `http://img.youtube.com/vi/${moviesInTheatersYtKeys[i].key}/0.jpg`;
                          carouselImages[i].setAttribute("src", movieThumbn);
                        }
                      })
                      .then(() => {
                        carouselItem1.addEventListener("click", function () {
                          ytModal.style.display = "block";
                          ytVideo.setAttribute(
                            "src",
                            `https://www.youtube.com/embed/${moviesInTheatersYtKeys[0].key}?autoplay=0`
                          );
                          document.querySelector(
                            ".modal-yt-video__heading"
                          ).textContent = `${moviesInTheatersIds[0].title}: ${moviesInTheatersYtKeys[0].name}`;
                        });
                        carouselItem2.addEventListener("click", function () {
                          ytModal.style.display = "block";
                          ytVideo.setAttribute(
                            "src",
                            `https://www.youtube.com/embed/${moviesInTheatersYtKeys[1].key}?autoplay=0`
                          );
                          document.querySelector(
                            ".modal-yt-video__heading"
                          ).textContent = `${moviesInTheatersIds[1].title}: ${moviesInTheatersYtKeys[1].name}`;
                        });
                        carouselItem3.addEventListener("click", function () {
                          ytModal.style.display = "block";
                          ytVideo.setAttribute(
                            "src",
                            `https://www.youtube.com/embed/${moviesInTheatersYtKeys[2].key}?autoplay=0`
                          );
                          document.querySelector(
                            ".modal-yt-video__heading"
                          ).textContent = `${moviesInTheatersIds[2].title}: ${moviesInTheatersYtKeys[2].name}`;
                        });
                        carouselItem4.addEventListener("click", function () {
                          ytModal.style.display = "block";
                          ytVideo.setAttribute(
                            "src",
                            `https://www.youtube.com/embed/${moviesInTheatersYtKeys[3].key}?autoplay=0`
                          );
                          document.querySelector(
                            ".modal-yt-video__heading"
                          ).textContent = `${moviesInTheatersIds[3].title}: ${moviesInTheatersYtKeys[3].name}`;
                        });
                        carouselItem5.addEventListener("click", function () {
                          ytModal.style.display = "block";
                          ytVideo.setAttribute(
                            "src",
                            `https://www.youtube.com/embed/${moviesInTheatersYtKeys[4].key}?autoplay=0`
                          );
                          document.querySelector(
                            ".modal-yt-video__heading"
                          ).textContent = `${moviesInTheatersIds[4].title}: ${moviesInTheatersYtKeys[4].name}`;
                        });
                      });
                  });
              });
          });
      });
  })
  .then(() => {
    for (let i = 0; i < 5; i++) {
      carouselMovieNames[i].textContent = `${moviesInTheatersIds[i].title}`;
    }
  });

getMoviesInTheaters().then((data) => {
  mostPopularMovieName.textContent = data.results[0].title;
  mostPopularMovie.style.backgroundImage = `url(https://image.tmdb.org/t/p/w185${data.results[0].poster_path})`;
});

actorMostPopular().then((data) => {
  mostPopularPerson.style.backgroundImage = `url(https://image.tmdb.org/t/p/w185${data.results[0].profile_path})`;
  mostPopularPersonName.textContent = data.results[0].name;
});

getTvShowMostPopular().then((data) => {
  for (let i = 0; i < 5; i++) {
    tvShowCardImages[i].setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300${data.results[i].poster_path}`
    );
    tvShowCardNames[i].textContent = `${data.results[i].name}`;
    getTvShowDetails(data.results[i].id).then((data) => {
      let genres = "";
      data.genres.forEach((g) => {
        genres += g.name + ", ";
      });
      tvShowOverviewNames[i].textContent = `${data.name}`;
      tvShowOverviewGenres[i].textContent = `Genres: ${genres.substring(
        0,
        genres.length - 2
      )}`;
      tvShowOverviewFirstAirDates[
        i
      ].textContent = `First air date: ${data.first_air_date}`;
      tvShowOverviewLastAirDates[
        i
      ].textContent = `Last air date: ${data.last_air_date}`;
      tvShowOverviewRuntimes[
        i
      ].textContent = `Runtime: ${data.episode_run_time[0]} min`;
      tvShowOverviewStatuses[i].textContent = `Status: ${data.status}`;
      tvShowOverviewButtons[i].addEventListener("click", function () {
        localStorage.setItem("tvid", data.id);
      });
    });
  }
});

genres()
  .then((data) => {
    for (let i = 0; i < data.genres.length; i++) {
      if (data.genres[i].name !== "Documentary") {
        movieGenresArr.push({
          name: data.genres[i].name,
          id: data.genres[i].id,
        });
      }
      tvShowGenres[i].textContent = data.genres[i].name;
      tvShowGenres[i].dataset.id = data.genres[i].id;
    }
  })
  .then(() => {
    movieGenresArr.forEach((mov, i) => {
      movieGenres[i].textContent = mov.name;
      movieGenres[i].dataset.id = mov.id;
    });
  });

// actorMostPopularMultiple(1)
//   .then((data) => {
//     data.results.forEach((act) => {
//       top1000Actors.push(act);
//     });
//   })
//   .then(() => {
//     for (let i = 2; i < 200; i++) {
//       actorMostPopularMultiple(i).then((data) => {
//         data.results.forEach((act) => {
//           top1000Actors.push(act);
//         });
//       });
//     }
//   })
//   .then(() => {
//     actorMostPopularMultiple(200)
//       .then((data) => {
//         data.results.forEach((act) => {
//           top1000Actors.push(act);
//         });
//       })
//       .then(() => {
//         const dt = new Date();
//         const date = dt.getDate();
//         const month = dt.getMonth() + 1;
//         // actorDetails(top1000Actors[499].id).then((data) => console.log(data));
//         for (let i = 0; i < 2000; i++) {
//           actorDetails(top1000Actors[i].id).then((data) => {
//             if (
//               data.birthday !== "" &&
//               data.deathday === null &&
//               data.birthday !== null
//             ) {
//               const actorDate = Number(data.birthday.split("-")[1]);
//               const actorMonth = Number(data.birthday.split("-")[2]);
//               console.log(actorDate);
//               if (actorDate === date && actorMonth === month) {
//                 console.log(data);
//               }
//             }
//           });
//         }
//       });
//   });
