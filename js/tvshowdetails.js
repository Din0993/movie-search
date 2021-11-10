"use strict";

let movieForTrailer;
const tvShowDetailsBackgroundImage = document.querySelector(".blurry-bg");
const poster = document.querySelector(".tv-show-details__poster");
const nameTV = document.querySelector(".tv-show-details__info__name");
const genres = document.querySelector(".tv-show-details__info__genres");
const runtime = document.querySelector(".tv-show-details__info__runtime");
const userScore = document.querySelector(".tv-show-details__info__userscore");
const playTrailerBtn = document.querySelector(
  ".tv-show-details__info__play-trailer-btn"
);
const tagLine = document.querySelector(".tv-show-details__info__tagline");
const synopsis = document.querySelector(".tv-show-details__info__synopsis");
const creators = document.querySelector(".tv-show-details__info__creators");
const cast = document.querySelector(".tv-cast-and-crew__cast");
const crew = document.querySelector(".tv-cast-and-crew__crew");
const loadAllCastAndCrewBtn = document.querySelector(".tv-cast-and-crew__btn");
const collapseCastAndCrewBtn = document.querySelector(
  ".tv-cast-and-crew__btn2"
);
const tvShowDetailsLang = document.querySelector(
  ".tv-detailed-info-and-links__original-language"
);
const tvShowDetailsOriginCountry = document.querySelector(
  ".tv-detailed-info-and-links__country"
);
const tvShowDetailsStatus = document.querySelector(
  ".tv-detailed-info-and-links__status"
);
const tvShowDetailsType = document.querySelector(
  ".tv-detailed-info-and-links__type"
);
const tvShowDetailsNetworks = document.querySelector(
  ".tv-detailed-info-and-links__networks"
);
const tvShowDetailsFirstAirDate = document.querySelector(
  ".tv-detailed-info-and-links__first-air"
);
const tvShowDetailsLastAirDate = document.querySelector(
  ".tv-detailed-info-and-links__last-air"
);
const tvShowDetailsNumOfSeasons = document.querySelector(
  ".tv-detailed-info-and-links__number-of-seasons"
);
const tvShowDetailsNumOfEpisodes = document.querySelector(
  ".tv-detailed-info-and-links__number-of-episodes"
);
const tvShowDetailsHomepage = document.querySelector(
  ".tv-detailed-info-and-links__homepage"
);
const currentLastSeasonPoster = document.querySelector(
  ".current-last-season__img"
);
const currentLastSeasonName = document.querySelector(
  ".current-last-season__name"
);
const currentLastSeasonsAirDate = document.querySelector(
  ".current-last-season__air-date"
);
const currentLastSeasonEpisodeName = document.querySelector(
  ".current-last-season__episode-name"
);
const currentLastSeasonEpisodeAirDate = document.querySelector(
  ".current-last-season__episode-air-date"
);
const currentLastSeasonEpisodeNumber = document.querySelector(
  ".current-last-season__episode-number"
);
const currentLastSeasonEpisodeSynopsis = document.querySelector(
  ".current-last-season__episode-synopsis"
);

const allEpisodesContainer = document.querySelector(
  ".current-last-season__episodes__container"
);

const showAllEpisodesBtn = document.querySelector(".show-all-episodes-btn");
const hideAllEpisodesBtn = document.querySelector(".hide-episodes-btn");

let id = Number(localStorage.getItem("tvid"));
let castLoaded = 0;
getTvShowDetails(id).then((data) => {
  let allGenres = ``;
  data.genres.forEach((genre) => (allGenres += genre.name + ", "));
  let allCreators = ``;
  data.created_by.forEach((creator) => (allCreators += creator.name + ", "));
  let allNetworks = ``;
  data.networks.forEach((network) => {
    allNetworks += network.name + ", ";
  });
  poster.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w300${data.poster_path}`
  );
  nameTV.textContent = `${data.name} (${data.first_air_date.split("-")[0]})`;
  genres.innerHTML += ` ${allGenres.substring(0, allGenres.length - 2)}`;
  runtime.innerHTML += ` ${data.episode_run_time[0]} minutes`;
  userScore.innerHTML += ` ${data.vote_average}`;
  userScore.innerHTML += ` <i class="far fa-star"></i>`;
  tagLine.innerHTML += ` ${data.tagline ? data.tagline : "No information"}`;
  synopsis.innerHTML += `${data.overview}`;
  creators.innerHTML = `${
    allCreators
      ? allCreators.substring(0, allCreators.length - 2)
      : "No information"
  }`;
  tvShowDetailsLang.innerHTML += `${data.languages[0].toUpperCase()}`;
  tvShowDetailsOriginCountry.innerHTML += `${data.origin_country[0].toUpperCase()}`;
  tvShowDetailsStatus.innerHTML += `${data.status}`;
  tvShowDetailsType.innerHTML += `${data.type}`;
  tvShowDetailsNetworks.innerHTML += `${allNetworks.substring(
    0,
    allNetworks.length - 2
  )}`;
  tvShowDetailsFirstAirDate.innerHTML += `${data.first_air_date}`;
  tvShowDetailsLastAirDate.innerHTML += `${data.last_air_date}`;
  tvShowDetailsNumOfSeasons.innerHTML += `${data.number_of_seasons}`;
  tvShowDetailsNumOfEpisodes.innerHTML += `${data.number_of_episodes}`;
  tvShowDetailsHomepage.innerHTML += `<a href= ${data.homepage} class="homepage-link"><i class="fas fa-link"></i></a>`;

  currentLastSeasonEpisodeName.innerHTML += `${data.last_episode_to_air.name}`;
  currentLastSeasonEpisodeAirDate.innerHTML += `${data.last_episode_to_air.air_date}`;
  currentLastSeasonEpisodeNumber.innerHTML += `${data.last_episode_to_air.episode_number}`;

  getLastSeason(id, data.number_of_seasons)
    .then((data) => {
      if (data.status_code !== 34) {
        currentLastSeasonPoster.setAttribute(
          "src",
          data.poster_path
            ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
            : "/images/placeholder-movie.png"
        );
        currentLastSeasonName.innerHTML += `${
          data.name ? data.name : "No information"
        }`;
        currentLastSeasonsAirDate.innerHTML += `${
          data.air_date ? data.air_date : "No information"
        }`;
        let episodeMarkup = ``;
        data.episodes.forEach((episode) => {
          episodeMarkup += `
      <div class="current-last-season__episodes__card">
      <img src=${
        episode.still_path
          ? `https://image.tmdb.org/t/p/original${episode.still_path}`
          : "/images/placeholder-movie.png"
      } class="current-last-season__episodes__card__img" />
      <div class="current-last-season__episodes__card__info">
        <p
          class="current-last-season__episodes__card__info__episode-number"
        >
          <span class="details-red-color">Episode number: </span>${
            episode.episode_number
          }
        </p>
        <p class="current-last-season__episodes__card__info__episode-name">
          <span class="details-red-color">Name: </span>${
            episode.name ? episode.name : "No information"
          }
        </p>
        <p
          class="
            current-last-season__episodes__card__info__episode-air-date
          "
        >
          <span class="details-red-color">Air date: </span>${episode.air_date}
        </p>
        <p
          class="current-last-season__episodes__card__info__episode-rating"
        >
          <span class="details-red-color">Average rating: </span>${
            episode.vote_average
          } <i class="far fa-star"></i> 
        </p>
        <p
          class="
            current-last-season__episodes__card__info__episode-synopsis
          "
        >
          <span class="details-red-color">Synopsis: </span>${episode.overview}
        </p>
      </div>
    </div>
      `;
        });
        allEpisodesContainer.insertAdjacentHTML("beforeend", episodeMarkup);
        episodeMarkup = "";
      } else {
        getLastSeason(id, data.number_of_seasons - 1).then((data) => {
          currentLastSeasonPoster.setAttribute(
            "src",
            data.poster_path
              ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
              : "/images/placeholder-movie.png"
          );
          currentLastSeasonName.innerHTML += `${
            data.name ? data.name : "No information"
          }`;
          currentLastSeasonsAirDate.innerHTML += `${
            data.air_date ? data.air_date : "No information"
          }`;
          let episodeMarkup = ``;
          data.episodes.forEach((episode) => {
            episodeMarkup += `
        <div class="current-last-season__episodes__card">
        <img src=${
          episode.still_path
            ? `https://image.tmdb.org/t/p/original${episode.still_path}`
            : "/images/placeholder-movie.png"
        } class="current-last-season__episodes__card__img" />
        <div class="current-last-season__episodes__card__info">
          <p
            class="current-last-season__episodes__card__info__episode-number"
          >
            <span class="details-red-color">Episode number: </span>${
              episode.episode_number
            }
          </p>
          <p class="current-last-season__episodes__card__info__episode-name">
            <span class="details-red-color">Name: </span>${
              episode.name ? episode.name : "No information"
            }
          </p>
          <p
            class="
              current-last-season__episodes__card__info__episode-air-date
            "
          >
            <span class="details-red-color">Air date: </span>${episode.air_date}
          </p>
          <p
            class="current-last-season__episodes__card__info__episode-rating"
          >
            <span class="details-red-color">Average rating: </span>${
              episode.vote_average
            } <i class="far fa-star"></i> 
          </p>
          <p
            class="
              current-last-season__episodes__card__info__episode-synopsis
            "
          >
            <span class="details-red-color">Synopsis: </span>${episode.overview}
          </p>
        </div>
      </div>
        `;
          });
          allEpisodesContainer.insertAdjacentHTML("beforeend", episodeMarkup);
          episodeMarkup = "";
        });
      }
    })
    .catch((err) => console.log(err));
});

function loadCast() {
  // getTvShowCredits(id).then((data) => {
  //   console.log(data);
  //   if (data.cast.length !== 0 && data.crew.length !== 0) {
  //     for (let i = 0; i < 3; i++) {
  //       markupCast += `
  //   <div class="tv-cast-and-crew__cast__card" >
  //   <img
  //     src="https://image.tmdb.org/t/p/w92${data.cast[i].profile_path}"
  //     class="tv-cast-and-crew__cast__img"
  //   />
  //   <div class="tv-cast-and-crew__cast__info">
  //     <p class="tv-cast-and-crew__cast__name"><span class="details-red-color">Name: </span>${data.cast[i].name}</p>
  //     <p class="tv-cast-and-crew__cast__character"><span class="details-red-color">Character: </span>${data.cast[i].character}</p>
  //   </div>
  // </div>
  //   `;
  //     }

  //     cast.insertAdjacentHTML("beforeend", markupCast);
  //     markupCast = "";
  //     if (data.cast.length !== 0 && data.crew.length !== 0) {
  //       markupCrew += `
  //   <div class="tv-cast-and-crew__crew__card">
  //   <img
  //     src= ${
  //       data.crew[0].profile_path
  //         ? `https://image.tmdb.org/t/p/w92${data.crew[0].profile_path}`
  //         : "/images/placeholder-movie.png"
  //     }
  //     class="tv-cast-and-crew__crew__img"
  //   />
  //   <div class="tv-cast-and-crew__crew__info">
  //     <p class="tv-cast-and-crew__crew__name"><span class="details-red-color">Name: </span>${
  //       data.crew[0].name
  //     }</p>
  //     <p class="tv-cast-and-crew__crew__job"><span class="details-red-color">Job: </span>${
  //       data.crew[0].job
  //     }</p>
  //     <p class="tv-cast-and-crew__crew__known-for"><span class="details-red-color">Known for: </span>${
  //       data.crew[0].known_for_department
  //     }</p>
  //   </div>
  // </div>
  //   `;

  //       markupCrew += `
  //   <div class="tv-cast-and-crew__crew__card">
  //   <img
  //     src= ${
  //       data.crew[1].profile_path
  //         ? `https://image.tmdb.org/t/p/w92${data.crew[1].profile_path}`
  //         : "/images/placeholder-movie.png"
  //     }
  //     class="tv-cast-and-crew__crew__img"
  //   />
  //   <div class="tv-cast-and-crew__crew__info">
  //     <p class="tv-cast-and-crew__crew__name"><span class="details-red-color">Name: </span>${
  //       data.crew[1].name
  //     }</p>
  //     <p class="tv-cast-and-crew__crew__job"><span class="details-red-color">Job: </span>${
  //       data.crew[1].job
  //     }</p>
  //     <p class="tv-cast-and-crew__crew__known-for"><span class="details-red-color">Known for: </span>${
  //       data.crew[1].known_for_department
  //     }</p>
  //   </div>
  // </div>
  //   `;

  //       markupCrew += `
  //   <div class="tv-cast-and-crew__crew__card">
  //   <img
  //     src= ${
  //       data.crew[2].profile_path
  //         ? `https://image.tmdb.org/t/p/w92${data.crew[2].profile_path}`
  //         : "/images/placeholder-movie.png"
  //     }
  //     class="tv-cast-and-crew__crew__img"
  //   />
  //   <div class="tv-cast-and-crew__crew__info">
  //     <p class="tv-cast-and-crew__crew__name"><span class="details-red-color">Name: </span>${
  //       data.crew[2].name
  //     }</p>
  //     <p class="tv-cast-and-crew__crew__job"><span class="details-red-color">Job: </span>${
  //       data.crew[2].job
  //     }</p>
  //     <p class="tv-cast-and-crew__crew__known-for"><span class="details-red-color">Known for: </span>${
  //       data.crew[2].known_for_department
  //     }</p>
  //   </div>
  // </div>
  //   `;
  //     }
  //     crew.insertAdjacentHTML("beforeend", markupCrew);
  //     markupCrew = "";
  //   } else {
  getAggregateTvShowCredits(id)
    .then((data) => {
      let markupCast = ``;
      let markupCrew = ``;
      for (
        let i = 0;
        data.cast.length > 5 ? i < 5 : i < data.cast.length;
        i++
      ) {
        markupCast += `
      <a href="/pages/details/people/index.html" class="tv-cast-and-crew__cast__card" data-peopleid=${
        data.cast[i].id
      }>
      <img
        src=${
          data.cast[i].profile_path
            ? `https://image.tmdb.org/t/p/w92${data.cast[i].profile_path}`
            : "/images/placeholder-movie.png"
        }
        class="tv-cast-and-crew__cast__img"
      />
      <div class="tv-cast-and-crew__cast__info">
        <p class="tv-cast-and-crew__cast__name"><span class="details-red-color">Name: </span>${
          data.cast[i].name
        }</p>
        <p class="tv-cast-and-crew__cast__character"><span class="details-red-color">Character: </span>${
          data.cast[i].roles[0].character
        }</p>
      </div>
    </a>
      `;
      }
      cast.insertAdjacentHTML("beforeend", markupCast);
      markupCast = "";
      for (
        let i = 0;
        data.crew.length > 5 ? i < 5 : i < data.crew.length;
        i++
      ) {
        markupCrew += `
      <a href="/pages/details/people/index.html" class="tv-cast-and-crew__crew__card" data-peopleid=${
        data.crew[i].id
      }>
      <img
        src= ${
          data.crew[i].profile_path
            ? `https://image.tmdb.org/t/p/w92${data.crew[i].profile_path}`
            : "/images/placeholder-movie.png"
        }
        class="tv-cast-and-crew__crew__img"
      />
      <div class="tv-cast-and-crew__crew__info">
        <p class="tv-cast-and-crew__crew__name"><span class="details-red-color">Name: </span>${
          data.crew[i].name
        }</p>
        <p class="tv-cast-and-crew__crew__job"><span class="details-red-color">Job: </span>${
          data.crew[i].jobs[0].job
        }</p>
        <p class="tv-cast-and-crew__crew__known-for"><span class="details-red-color">Known for: </span>${
          data.crew[i].known_for_department
        }</p>
      </div>
    </a>
      `;
      }
      crew.insertAdjacentHTML("beforeend", markupCrew);
      markupCrew = "";
    })
    .then(() => {
      document
        .querySelectorAll(".tv-cast-and-crew__cast__card")
        .forEach((c) => {
          c.addEventListener("click", function () {
            localStorage.setItem("peopleid", c.dataset.peopleid);
          });
        });
      document
        .querySelectorAll(".tv-cast-and-crew__crew__card")
        .forEach((c) => {
          c.addEventListener("click", function () {
            localStorage.setItem("peopleid", c.dataset.peopleid);
          });
        });
    });
}
//});
// .then(()=> {
//   document.querySelectorAll('.tv-cast-and-crew__cast__card').forEach(card => {
//     card.addEventListener('click',function(){
//       localStorage.setItem('id',card.getAttribute('data-id'));
//     })
//   })
// });
//}
loadCast();

loadAllCastAndCrewBtn.addEventListener("click", function () {
  castLoaded = 1;
  cast.innerHTML = "";
  crew.innerHTML = "";
  getAggregateTvShowCredits(id)
    .then((data) => {
      let markupCast = ``;
      let markupCrew = ``;
      data.cast.forEach((cast) => {
        markupCast += `
      <a href="/pages/details/people/index.html" class="tv-cast-and-crew__cast__card" data-peopleid=${
        cast.id
      }>
      <img
        src=${
          cast.profile_path
            ? `https://image.tmdb.org/t/p/w92${cast.profile_path}`
            : "/images/placeholder-movie.png"
        }
        class="tv-cast-and-crew__cast__img"
      />
      <div class="tv-cast-and-crew__cast__info">
        <p class="tv-cast-and-crew__cast__name"><span class="details-red-color">Name: </span>${
          cast.name
        }</p>
        <p class="tv-cast-and-crew__cast__character"><span class="details-red-color">Character: </span>${
          cast.roles[0].character
        }</p>
      </div>
    </a>
      `;
      });
      cast.insertAdjacentHTML("beforeend", markupCast);
      markupCast = "";
      data.crew.forEach((crew) => {
        markupCrew += `
      <a href="/pages/details/people/index.html" class="tv-cast-and-crew__crew__card" data-peopleid=${
        crew.id
      }>
      <img
        src= ${
          crew.profile_path
            ? `https://image.tmdb.org/t/p/w92${crew.profile_path}`
            : "/images/placeholder-movie.png"
        }
        class="tv-cast-and-crew__crew__img"
      />
      <div class="tv-cast-and-crew__crew__info">
        <p class="tv-cast-and-crew__crew__name"><span class="details-red-color">Name: </span>${
          crew.name
        }</p>
        <p class="tv-cast-and-crew__crew__job"><span class="details-red-color">Job: </span>${
          crew.jobs[0].job
        }</p>
        <p class="tv-cast-and-crew__crew__known-for"><span class="details-red-color">Known for: </span>${
          crew.known_for_department
        }</p>
      </div>
    </a>
      `;
      });
      crew.insertAdjacentHTML("beforeend", markupCrew);
      markupCrew = "";
    })
    .then(() => {
      document
        .querySelectorAll(".tv-cast-and-crew__cast__card")
        .forEach((c) => {
          c.addEventListener("click", function () {
            localStorage.setItem("peopleid", c.dataset.peopleid);
          });
        });
      document
        .querySelectorAll(".tv-cast-and-crew__crew__card")
        .forEach((c) => {
          c.addEventListener("click", function () {
            localStorage.setItem("peopleid", c.dataset.peopleid);
          });
        });
    });
  loadAllCastAndCrewBtn.style.display = "none";
  collapseCastAndCrewBtn.style.display = "block";
});

collapseCastAndCrewBtn.addEventListener("click", function () {
  collapseCastAndCrewBtn.style.display = "none";
  loadAllCastAndCrewBtn.style.display = "block";
  cast.innerHTML = "";
  crew.innerHTML = "";
  loadCast();
});

showAllEpisodesBtn.addEventListener("click", function () {
  allEpisodesContainer.style.display = "flex";
  showAllEpisodesBtn.style.display = "none";
  hideAllEpisodesBtn.style.display = "block";
});

hideAllEpisodesBtn.addEventListener("click", function () {
  allEpisodesContainer.style.display = "none";
  showAllEpisodesBtn.style.display = "block";
  hideAllEpisodesBtn.style.display = "none";
});

getTvShowVideos(id).then((data) => {
  data.results.forEach((d) => {
    console.log(d);
    if (d.name.includes("Trailer") && !d.name.includes("Teaser")) {
      if (d.name === "Final Trailer") {
        movieForTrailer = { key: d.key, name: d.name };
      } else {
        movieForTrailer = { key: d.key, name: d.name };
      }
    } else {
      movieForTrailer = { key: d.key, name: d.name };
    }
  });
});

playTrailerBtn.addEventListener("click", function () {
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
