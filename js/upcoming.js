"use strict";

const top100MostPopular = [];
let topRatedMoviesArr2 = [];
const genreBtn = document.querySelector(".top-rated-tv-shows-by-genre__btn");
let movieGenresArr = [];
const movieGenres = document.querySelectorAll(
  ".top-rated-tv-shows-by-genre__genre"
);

let selectedGenre;

getSoonInTheatersMultiple(1)
  .then((data) =>
    data.results.forEach((mov) => {
      top100MostPopular.push(mov);
    })
  )
  .then(() => {
    getSoonInTheatersMultiple(2)
      .then((data) =>
        data.results.forEach((mov) => {
          top100MostPopular.push(mov);
        })
      )
      .then(() => {
        getSoonInTheatersMultiple(3)
          .then((data) =>
            data.results.forEach((mov) => {
              top100MostPopular.push(mov);
            })
          )
          .then(() => {
            getSoonInTheatersMultiple(4)
              .then((data) =>
                data.results.forEach((mov) => {
                  top100MostPopular.push(mov);
                })
              )
              .then(() => {
                getSoonInTheatersMultiple(5)
                  .then((data) =>
                    data.results.forEach((mov) => {
                      top100MostPopular.push(mov);
                    })
                  )
                  .then(() => {
                    const moviesContainer = document.querySelector(
                      ".popular-movies__movie-container"
                    );
                    top100MostPopular.forEach((mov) => {
                      let markup = ``;
                      markup += `
                      <div class="popular-movies__movie-container__card" data-movieid="${
                        mov.id
                      }">
                      <img
                         src="${
                           mov.poster_path
                             ? `https://image.tmdb.org/t/p/w154${mov.poster_path}`
                             : "/images/placeholder-movie.png"
                         } "
                        class="
                          popular-movies__movie-container__card__img
                          popular-movies__movie-container__card__img-5
                        "
                      />
                      <h2
                        class="
                          popular-movies__movie-container__card__name
                          popular-movies__movie-container__card__name-5
                        "
                      >
                        ${mov.title}
                      </h2>
                      <div class="popular-movies__movie-container__card__overview">
                        <h2
                          class="popular-movies__movie-container__card__overview__heading"
                        >${mov.title}</h2>
                        <div
                          class="
                            popular-movies__movie-container__card__overview__info-container
                          "
                        >
                          <p
                            class="
                              popular-movies__movie-container__card__overview__genres
                              popular-movies__movie-container__card__overview__text
                            "
                          >Original language: ${mov.original_language.toUpperCase()}</p>
                          <p
                            class="
                              popular-movies__movie-container__card__overview__first-air-date
                              popular-movies__movie-container__card__overview__text
                            "
                          >Release date: ${mov.release_date}</p>
                        </div>
                        <a href="/pages/details/movie/index.html"
                          class="popular-movies__movie-container__card__overview__btn"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                      `;
                      moviesContainer.insertAdjacentHTML("beforeend", markup);
                    });
                  })
                  .then(() => {
                    const btns = document.querySelectorAll(
                      ".popular-movies__movie-container__card__overview__btn"
                    );
                    btns.forEach((btn) =>
                      btn.addEventListener("click", function (e) {
                        // console.log(e.target.parentNode.parentNode.dataset.id);
                        localStorage.setItem(
                          "movieid",
                          e.target.parentNode.parentNode.dataset.movieid
                        );
                      })
                    );
                  });
              });
          });
      });
  });

document
  .querySelector(".top-rated-tv-shows-by-genre__drop-content")
  .addEventListener("click", function (e) {
    if (e.target.className === "top-rated-tv-shows-by-genre__genre") {
      // topRatedMoviesCards.forEach((card) => {
      //   card.style.display = "block";
      // });
      // document.querySelector(
      //   ".top-rated-tv-shows-by-genre__movie-container"
      // ).style.visibility = "visible";
      genreBtn.innerHTML = e.target.innerHTML;
      let genreId = Number(e.target.dataset.id);
      let movieGenreCnt2 = 0;
      genres().then((data) => {
        data.genres.forEach((genre) => {
          if (genreId === genre.id) {
            selectedGenre = genre.name;
          }
        });
      });
      getSoonInTheatersMultiple(1)
        .then((data) => {
          data.results.forEach((mov) => {
            topRatedMoviesArr2.push(mov);
          });
        })
        .then(() => {
          for (let i = 2; i < 50; i++) {
            getSoonInTheatersMultiple(i).then((data) => {
              for (let i = 0; i < data.results.length; i++) {
                topRatedMoviesArr2.push(data.results[i]);
              }
            });
          }
        })
        .then(() => {
          getSoonInTheatersMultiple(50)
            .then((data) => {
              data.results.forEach((mov) => {
                topRatedMoviesArr2.push(mov);
              });
            })
            .then(() => {
              document.querySelector(
                ".popular-movies__movie-container"
              ).innerHTML = "";
              let markup = ``;
              topRatedMoviesArr2.forEach((mov) => {
                if (movieGenreCnt2 <= topRatedMoviesArr2.length) {
                  if (mov.genre_ids.includes(genreId)) {
                    // const previousMarkup = document.querySelector(
                    //   ".no-movies-paragraph"
                    // );
                    // if (previousMarkup) {
                    //   previousMarkup.parentNode.removeChild(previousMarkup);
                    // }
                    // topRatedMoviesCards.forEach((card) => {
                    //   card.style.height = "33.5rem";
                    // });
                    // document.querySelector(
                    //   ".top-rated-tv-shows-by-genre__movie-container"
                    // ).style.visibility = "visible";
                    // topRatedMoviesByGenreImages[movieGenreCnt2].setAttribute(
                    //   "src",
                    //   `https://image.tmdb.org/t/p/w300${mov.poster_path}`
                    // );
                    // topRatedMoviesByGenreNames[movieGenreCnt2].textContent =
                    //   mov.title;
                    // topRatedMoviesByGenreOverviewNames[
                    //   movieGenreCnt2
                    // ].textContent = mov.title;
                    // topRatedMoviesByGenreOriginalLanguages[
                    //   movieGenreCnt2
                    // ].textContent = `Original Language: ${mov.original_language.toUpperCase()}`;
                    // topRatedMoviesByGenreReleaseDates[
                    //   movieGenreCnt2
                    // ].textContent = `Release date: ${mov.release_date}`;
                    markup = "";
                    markup += `
                    <div class="popular-movies__movie-container__card" data-movieid="${mov.id}">
                    <img
                      src="https://image.tmdb.org/t/p/w300${mov.poster_path}"
                      class="
                        popular-movies__movie-container__card__img
                        popular-movies__movie-container__card__img-5
                      "
                    />
                    <h2
                      class="
                        popular-movies__movie-container__card__name
                        popular-movies__movie-container__card__name-5
                      "
                    >
                      ${mov.title}
                    </h2>
                    <div class="popular-movies__movie-container__card__overview">
                      <h2
                        class="popular-movies__movie-container__card__overview__heading"
                      >${mov.title}</h2>
                      <div
                        class="
                          popular-movies__movie-container__card__overview__info-container
                        "
                      >
                        <p
                          class="
                            popular-movies__movie-container__card__overview__genres
                            popular-movies__movie-container__card__overview__text
                          "
                        >Original language: ${mov.original_language}</p>
                        <p
                          class="
                            popular-movies__movie-container__card__overview__first-air-date
                            popular-movies__movie-container__card__overview__text
                          "
                        >${mov.release_date}</p>
                      </div>
                      <a href="/pages/details/movie/index.html"
                        class="popular-movies__movie-container__card__overview__btn"
                      >
                        Details
                      </a>
                    </div>
                  </div>
                    `;
                    document
                      .querySelector(".popular-movies__movie-container")
                      .insertAdjacentHTML("beforeend", markup);
                    movieGenreCnt2++;
                  }
                }

                // document
                //   .querySelector(".popular-movies__movie-container")
                //   .insertAdjacentHTML("beforeend", markup);
              });
              if (movieGenreCnt2 === 0) {
                const previousMarkup = document.querySelector(
                  ".no-movies-paragraph"
                );
                if (previousMarkup) {
                  previousMarkup.parentNode.removeChild(previousMarkup);
                }
                let markup = `<p class="no-movies-paragraph">NO MOVIES WITH THIS GENRE IN OUR BASE :(</p>`;
                // document
                //   .querySelector(".top-rated-tv-shows-by-genre")
                //   .insertAdjacentHTML("beforeend", markup);
                // topRatedMoviesCards.forEach((card) => {
                //   card.style.height = "0";
                // });
                // document.querySelector(
                //   ".top-rated-tv-shows-by-genre__movie-container"
                // ).style.visibility = "hidden";
              }
            })
            .then(() => {
              const btns = document.querySelectorAll(
                ".popular-movies__movie-container__card__overview__btn"
              );
              btns.forEach((btn) =>
                btn.addEventListener("click", function (e) {
                  // console.log(e.target.parentNode.parentNode.dataset.id);
                  localStorage.setItem(
                    "movieid",
                    e.target.parentNode.parentNode.dataset.movieid
                  );
                })
              );
            })
            .then(() => {
              topRatedMoviesArr2 = [];
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
      // tvShowGenres[i].textContent = data.genres[i].name;
      // tvShowGenres[i].dataset.id = data.genres[i].id;
    }
  })
  .then(() => {
    // console.log(movieGenresArr);
    movieGenresArr.forEach((mov, i) => {
      movieGenres[i].textContent = mov.name;
      movieGenres[i].dataset.id = mov.id;
    });
  });
