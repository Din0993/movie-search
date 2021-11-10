"use strict";
let hiddenMenuStatus = 0;
const searchInput = document.querySelector(".navigation__input");
const searchSuggestions = document.querySelector(".navigation__suggestions");

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

searchInput.addEventListener("input", displaySuggestions);

window.onload = function () {
  document.onclick = function (e) {
    if (e.target.className !== searchSuggestions.className) {
      searchSuggestions.style.display = "none";
    }
  };
};

function displaySuggestions() {
  if (searchInput.value !== "") {
    searchAnything(searchInput.value)
      .then((data) => {
        let markup = ``;
        searchSuggestions.style.display = "flex";
        data.results.forEach((el, i) => {
          let link = ``;
          let idStr = ``;
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
              // localStorage.setItem("id", el.dataset.id);
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
