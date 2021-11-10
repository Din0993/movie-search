"use strict";

const top100MostPopular = [];

actorMostPopularMultiple(1)
  .then((data) =>
    data.results.forEach((mov) => {
      top100MostPopular.push(mov);
    })
  )
  .then(() => {
    actorMostPopularMultiple(2)
      .then((data) =>
        data.results.forEach((mov) => {
          top100MostPopular.push(mov);
        })
      )
      .then(() => {
        actorMostPopularMultiple(3)
          .then((data) =>
            data.results.forEach((mov) => {
              top100MostPopular.push(mov);
            })
          )
          .then(() => {
            actorMostPopularMultiple(4)
              .then((data) =>
                data.results.forEach((mov) => {
                  top100MostPopular.push(mov);
                })
              )
              .then(() => {
                actorMostPopularMultiple(5)
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
                      let place;
                      let birthday;
                      actorDetails(mov.id)
                        .then((data) => {
                          birthday = data.birthday;
                          place = data.place_of_birth;
                        })
                        .then(() => {
                          let markup = ``;
                          markup += `
                        <div class="popular-movies__movie-container__card" data-peopleid="${
                          mov.id
                        }">
                        <img
                          src= ${
                            mov.profile_path
                              ? `https://image.tmdb.org/t/p/w154${mov.profile_path}`
                              : "/images/placeholder-movie.png"
                          }
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
                          ${mov.name}
                        </h2>
                        <div class="popular-movies__movie-container__card__overview">
                          <h2
                            class="popular-movies__movie-container__card__overview__heading"
                          >${mov.name}</h2>
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
                            >Department: ${mov.known_for_department}</p>
                            <p
                              class="
                                popular-movies__movie-container__card__overview__first-air-date
                                popular-movies__movie-container__card__overview__text
                              "
                            >Birthday: ${birthday}</p>
                            <p
                              class="
                                popular-movies__movie-container__card__overview__first-air-date
                                popular-movies__movie-container__card__overview__text
                              "
                            >Place of birth: ${place}</p>
                          </div>
                          <a href ="/pages/details/people/index.html"
                            class="popular-movies__movie-container__card__overview__btn"
                          >
                            Details
                          </a>
                        </div>
                      </div>
                        `;
                          moviesContainer.insertAdjacentHTML(
                            "beforeend",
                            markup
                          );
                        })
                        .then(() => {
                          const btns = document.querySelectorAll(
                            ".popular-movies__movie-container__card__overview__btn"
                          );
                          btns.forEach((btn) =>
                            btn.addEventListener("click", function (e) {
                              localStorage.setItem(
                                "peopleid",
                                e.target.parentNode.parentNode.dataset.peopleid
                              );
                            })
                          );
                        });
                    });
                  });
              });
          });
      });
  });
