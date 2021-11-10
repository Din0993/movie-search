"use strict";

let id = Number(localStorage.getItem("movieid"));
let movieForTrailer;

const moviePoster = document.querySelector(".movie-details__poster");
const movieName = document.querySelector(".movie-details__info__name");
const movieGenres = document.querySelector(".movie-details__info__genres");
const movieRuntime = document.querySelector(".movie-details__info__runtime");
const movieReleaseDate = document.querySelector(
  ".movie-details__info__release-date"
);
const movieTagline = document.querySelector(".movie-details__info__tagline");
const movieRating = document.querySelector(".movie-details__info__rating");
const movieSynopsis = document.querySelector(".movie-details__info__synopsis");
const movieDirectors = document.querySelector(".movie-details__info__director");
const movieScreenplay = document.querySelector(
  ".movie-details__info__screenplay"
);
const movieStory = document.querySelector(".movie-details__info__story");
const movieCharacters = document.querySelector(
  ".movie-details__info__characters"
);
const moviePlayTrailerBtn = document.querySelector(
  ".movie-details__info__play-trailer-btn"
);

const movieDetailsStatus = document.querySelector(
  ".movie-detailed-info__status"
);
const movieDetailsOriginalLanguage = document.querySelector(
  ".movie-detailed-info__original-language"
);
const movieDetailsProductionCompanies = document.querySelector(
  ".movie-detailed-info__production-companies"
);
const movieDetailsProductionCountries = document.querySelector(
  ".movie-detailed-info__production-countries"
);
const movieDetailsBudget = document.querySelector(
  ".movie-detailed-info__budget"
);
const movieDetailsRevenue = document.querySelector(
  ".movie-detailed-info__revenue"
);
const movieDetailsSpokenLanguages = document.querySelector(
  ".movie-detailed-info__spoken-languages"
);
const movieDetailsHomepageLink = document.querySelector(
  ".movie-detailed-info__links__homepage"
);
const movieDetailsImdbLink = document.querySelector(
  ".movie-detailed-info__links__imdb"
);

const movieCast = document.querySelector(".movie-cast-and-crew__cast");
const movieCrew = document.querySelector(".movie-cast-and-crew__crew");
const movieCastLoadAllBtn = document.querySelector(".movie-cast-and-crew__btn");
const movieCastCollapseBtn = document.querySelector(
  ".movie-cast-and-crew__btn2"
);

getMovieDetails(id).then((data) => {
  let allGenres = "";
  data.genres.forEach((genre) => (allGenres += genre.name + ", "));
  let runtimeH = Math.floor(data.runtime / 60);
  let runtimeM = Math.round(data.runtime % 60);

  let productionCompanies = "";
  data.production_companies.forEach(
    (comp) => (productionCompanies += comp.name + ", ")
  );
  let productionCountries = "";
  data.production_countries.forEach(
    (country) => (productionCountries += country.iso_3166_1 + ", ")
  );
  let spokenLanguages = "";
  data.spoken_languages.forEach(
    (sl) => (spokenLanguages += sl.english_name + ", ")
  );

  moviePoster.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w300${data.poster_path}`
  );
  movieName.textContent = `${data.title} (${data.release_date.split("-")[0]})`;
  movieGenres.innerHTML += `${allGenres.substring(0, allGenres.length - 2)}`;
  movieRuntime.innerHTML += `${runtimeH}h${runtimeM}m`;
  movieReleaseDate.innerHTML += `${data.release_date}`;
  movieTagline.innerHTML += `${data.tagline}`;
  movieRating.innerHTML += `${data.vote_average} <i class="far fa-star"></i>`;
  movieSynopsis.innerHTML += `<br/>${data.overview}`;
  movieDetailsStatus.innerHTML += `${data.status}`;
  movieDetailsOriginalLanguage.innerHTML += `${data.original_language.toUpperCase()}`;
  movieDetailsProductionCompanies.innerHTML += `${productionCompanies.substring(
    0,
    productionCompanies.length - 2
  )}`;
  movieDetailsProductionCountries.innerHTML += `${productionCountries.substring(
    0,
    productionCountries.length - 2
  )}`;
  movieDetailsBudget.innerHTML += `$${data.budget.toLocaleString()}`;
  movieDetailsRevenue.innerHTML += `$${data.revenue.toLocaleString()}`;
  movieDetailsSpokenLanguages.innerHTML += `${spokenLanguages.substring(
    0,
    spokenLanguages.length - 2
  )}`;
  movieDetailsImdbLink.setAttribute(
    "href",
    `https://www.imdb.com/title/${data.imdb_id}`
  );
  movieDetailsHomepageLink.setAttribute("href", `${data.homepage}`);
});

getMovieCredits(id).then((data) => {
  let directorMarkup = ``;
  let storyMarkup = ``;
  let screenplayMarkup = ``;
  let charactersMarkup = ``;
  let directorsNumb = -1;
  let storyNumb = -1;
  let charactersNumb = -1;
  let screenNumb = -1;

  data.crew.forEach((crew) => {
    if (crew.job === "Director") {
      directorsNumb++;
    }
    if (crew.job === "Story") {
      storyNumb++;
    }
    if (crew.job === "Screenplay") {
      screenNumb++;
    }
    if (crew.job === "Characters") {
      charactersNumb++;
    }
  });

  if (directorsNumb === -1) {
    movieDirectors.remove();
  }
  if (storyNumb === -1) {
    movieStory.remove();
  }
  if (charactersNumb === -1) {
    movieCharacters.remove();
  }
  if (screenNumb === -1) {
    movieScreenplay.remove();
  }

  data.crew.forEach((crew) => {
    if (crew.job === "Director") {
      if (directorsNumb !== 0) {
        directorMarkup += `
      <a href="/pages/details/people/index.html" class="movie-details__info__main-crew__link" data-peopleid=${crew.id}>${crew.name}</a>, 
      `;
        directorsNumb--;
      } else {
        directorMarkup += `
        <a href="/pages/details/people/index.html" class="movie-details__info__main-crew__link" data-peopleid=${crew.id}>${crew.name}</a>
        `;
      }
    }
    if (crew.job === "Story") {
      if (storyNumb !== 0) {
        storyMarkup += `
        <a href="/pages/details/people/index.html" class="movie-details__info__main-crew__link" data-peopleid=${crew.id}>${crew.name}</a>, 
        `;
        storyNumb--;
      } else {
        storyMarkup += `
            <a href="/pages/details/people/index.html" class="movie-details__info__main-crew__link" data-peopleid=${crew.id}>${crew.name}</a>
            `;
      }
    }
    if (crew.job === "Screenplay") {
      if (screenNumb !== 0) {
        screenplayMarkup += `
        <a href="/pages/details/people/index.html" class="movie-details__info__main-crew__link" data-peopleid=${crew.id}>${crew.name}</a>, 
        `;
        screenNumb--;
      } else {
        screenplayMarkup += `
        <a href="/pages/details/people/index.html" class="movie-details__info__main-crew__link" data-peopleid=${crew.id}>${crew.name}</a> 
        `;
      }
    }
    if (crew.job === "Characters") {
      if (charactersNumb !== 0) {
        charactersMarkup += `
        <a href="/pages/details/people/index.html" class="movie-details__info__main-crew__link" data-peopleid=${crew.id}>${crew.name}</a>, 
        `;
        charactersNumb--;
      } else {
        charactersMarkup += `
        <a href="/pages/details/people/index.html" class="movie-details__info__main-crew__link" data-peopleid=${crew.id}>${crew.name}</a>
        `;
      }
    }
  });
  movieDirectors.insertAdjacentHTML("beforeend", directorMarkup);
  movieStory.insertAdjacentHTML("beforeend", storyMarkup);
  movieScreenplay.insertAdjacentHTML("beforeend", screenplayMarkup);
  movieCharacters.insertAdjacentHTML("beforeend", charactersMarkup);
  directorMarkup = "";
  storyMarkup = "";
  screenplayMarkup = "";
  charactersMarkup = "";
});

function loadMovieCast() {
  getMovieCredits(id)
    .then((data) => {
      let castMarkup = "";
      let crewMarkup = "";
      for (let i = 0; i < 5; i++) {
        castMarkup += `
          <a href="/pages/details/people/index.html" class="movie-cast-and-crew__cast__card" data-peopleid=${data.cast[i].id}>
          <img
            src="https://image.tmdb.org/t/p/w92${data.cast[i].profile_path}"
            class="movie-cast-and-crew__cast__img"
          />
          <div class="movie-cast-and-crew__cast__info">
            <p class="movie-cast-and-crew__cast__name"><span class="details-red-color">Name: </span>${data.cast[i].name}</p>
            <p class="movie-cast-and-crew__cast__character"><span class="details-red-color">Character: </span>${data.cast[i].character}</p>
          </div>
        </a>
          `;
        crewMarkup += `
          <a href="/pages/details/people/index.html" class="movie-cast-and-crew__crew__card" data-peopleid=${
            data.crew[i].id
          }>
          <img
            src=${
              data.crew[i].profile_path
                ? `https://image.tmdb.org/t/p/w92${data.crew[i].profile_path}`
                : "/images/placeholder-movie.png"
            }
            class="movie-cast-and-crew__crew__img"
          />
          <div class="movie-cast-and-crew__crew__info">
            <p class="movie-cast-and-crew__crew__name"><span class="details-red-color">Name: </span>${
              data.crew[i].name
            }</p>
            <p class="movie-cast-and-crew__crew__job"><span class="details-red-color">Job: </span>${
              data.crew[i].job
            }</p>
          </div>
        </a>
          `;
      }
      movieCast.insertAdjacentHTML("beforeend", castMarkup);
      movieCrew.insertAdjacentHTML("beforeend", crewMarkup);
      castMarkup = "";
      crewMarkup = "";
    })
    .then(() => {
      document
        .querySelectorAll(".movie-cast-and-crew__cast__card")
        .forEach((card) => {
          card.addEventListener("click", function () {
            localStorage.setItem("peopleid", card.dataset.peopleid);
          });
        });

      document
        .querySelectorAll(".movie-cast-and-crew__crew__card")
        .forEach((card) => {
          card.addEventListener("click", function () {
            localStorage.setItem("peopleid", card.dataset.peopleid);
          });
        });
    });
}

loadMovieCast();

movieCastLoadAllBtn.addEventListener("click", function () {
  movieCastLoadAllBtn.style.display = "none";
  movieCastCollapseBtn.style.display = "block";
  movieCast.innerHTML = "";
  movieCrew.innerHTML = "";
  getMovieCredits(id)
    .then((data) => {
      let castMarkup = "";
      let crewMarkup = "";
      data.cast.forEach((c) => {
        castMarkup += `
          <a href="/pages/details/people/index.html" class="movie-cast-and-crew__cast__card" data-peopleid=${
            c.id
          }>
          <img
            src=${
              c.profile_path
                ? `https://image.tmdb.org/t/p/w92${c.profile_path}`
                : "/images/placeholder-movie.png"
            }
            class="movie-cast-and-crew__cast__img"
          />
          <div class="movie-cast-and-crew__cast__info">
            <p class="movie-cast-and-crew__cast__name"><span class="details-red-color">Name: </span>${
              c.name
            }</p>
            <p class="movie-cast-and-crew__cast__character"><span class="details-red-color">Character: </span>${
              c.character
            }</p>
          </div>
        </a>
          `;
      });
      data.crew.forEach((c) => {
        crewMarkup += `
        <a href="/pages/details/people/index.html" class="movie-cast-and-crew__crew__card" data-peopleid=${
          c.id
        }>
        <img
          src=${
            c.profile_path
              ? `https://image.tmdb.org/t/p/w92${c.profile_path}`
              : "/images/placeholder-movie.png"
          }
          class="movie-cast-and-crew__crew__img"
        />
        <div class="movie-cast-and-crew__crew__info">
          <p class="movie-cast-and-crew__crew__name"><span class="details-red-color">Name: </span>${
            c.name
          }</p>
          <p class="movie-cast-and-crew__crew__job"><span class="details-red-color">Job: </span>${
            c.job
          }</p>
        </div>
      </a>
        `;
      });

      movieCast.insertAdjacentHTML("beforeend", castMarkup);
      movieCrew.insertAdjacentHTML("beforeend", crewMarkup);
      castMarkup = "";
      crewMarkup = "";
    })
    .then(() => {
      document
        .querySelectorAll(".movie-cast-and-crew__cast__card")
        .forEach((card) => {
          card.addEventListener("click", function () {
            localStorage.setItem("peopleid", card.dataset.peopleid);
          });
        });

      document
        .querySelectorAll(".movie-cast-and-crew__crew__card")
        .forEach((card) => {
          card.addEventListener("click", function () {
            localStorage.setItem("peopleid", card.dataset.peopleid);
          });
        });
    });
});
movieCastCollapseBtn.addEventListener("click", function () {
  movieCastLoadAllBtn.style.display = "block";
  movieCastCollapseBtn.style.display = "none";
  movieCast.innerHTML = "";
  movieCrew.innerHTML = "";
  loadMovieCast();
});

getMovieVideos(id).then((data) => {
  data.results.forEach((d) => {
    if (d.name.includes("Trailer") && !d.name.includes("Teaser")) {
      if (d.name === "Final Trailer") {
        movieForTrailer = { key: d.key, name: d.name };
      } else {
        movieForTrailer = { key: d.key, name: d.name };
      }
    }
  });
});

moviePlayTrailerBtn.addEventListener("click", function () {
  document.querySelector(".modal-yt-video").style.display = "block";
  document.querySelector(".modal-yt-video").style.position = "fixed";
  document.querySelector(
    ".modal-yt-video__heading"
  ).textContent = `${movieForTrailer.name}`;
  document
    .querySelector("#ytplayer-modal")
    .setAttribute(
      "src",
      `https://www.youtube.com/embed/${movieForTrailer.key}?autoplay=0`
    );
});

document.querySelector(".close-modal").addEventListener("click", function () {
  document.querySelector(".modal-yt-video").style.display = "none";
  document.querySelector("#ytplayer-modal").setAttribute("src", "");
});
