"use strict";
let id = Number(localStorage.getItem("peopleid"));

const peopleImage = document.querySelector(".people-details__img");
const peopleName = document.querySelector(".people-details__name");
const peoplePOB = document.querySelector(".people-details__place-of-birth");
const peopleBirthday = document.querySelector(".people-details__birthday");
const peopleKnownForDept = document.querySelector(
  ".people-details__known-for-department"
);
const peopleBiography = document.querySelector(".people-details__biography");
const peopleKnownForContainer = document.querySelector(
  ".people-known-for__container"
);
const peopleCreditsContainer = document.querySelector(".people-all-credits");

let crewCreditsMarkup = ``;
let castCreditsMarkup = ``;
let cnt1 = 0;
let cnt2 = 0;
let cnt3 = 0;
let cnt4 = 0;
let cnt5 = 0;
let cnt6 = 0;
let cnt7 = 0;
let cnt8 = 0;
let cnt9 = 0;
let cnt10 = 0;
let cnt11 = 0;
let cnt12 = 0;

let castSortedByPopularity;
let idStrPeopleDetails = "";

actorDetails(id).then((data) => {
  const dt = new Date();
  const day = dt.getDay();
  const month = dt.getMonth() + 1;
  const year = dt.getFullYear();
  let age;
  if (data.birthday) {
    const [yearPeople, monthPeople, dayPeople] = data.birthday.split("-");

    if (
      Number(monthPeople) > month ||
      (Number(monthPeople) === month && Number(dayPeople) > day)
    ) {
      age = year - Number(yearPeople) - 1;
    } else {
      age = year - Number(yearPeople);
    }
  }
  peopleImage.setAttribute(
    "src",
    data.profile_path
      ? `https://image.tmdb.org/t/p/w300${data.profile_path}`
      : "/images/placeholder-movie.png"
  );
  peopleName.textContent = data.name;
  peoplePOB.innerHTML += `${data.place_of_birth}`;
  peopleBirthday.innerHTML += `${data.birthday} (${
    age ? age + " years old" : "No Information"
  })`;
  peopleKnownForDept.innerHTML += `${data.known_for_department}`;
  peopleBiography.textContent = `${data.biography}`;
});
actorAllCredits(id)
  .then((data) => {
    castSortedByPopularity = data.cast.sort(propComparator("vote_count"));
  })
  .then(() => {
    let cardMarkup = ``;
    for (
      let i = 0;
      castSortedByPopularity.length > 10
        ? i < 10
        : i < castSortedByPopularity.length;
      i++
    ) {
      if (castSortedByPopularity[i].media_type === "movie") {
        idStrPeopleDetails = "movie";
        cardMarkup += `
        <a href="/pages/details/movie/index.html" class="people-known-for__card" data-movieid="${
          castSortedByPopularity[i].id
        }">
          <img src=${
            castSortedByPopularity[i].poster_path
              ? `https://image.tmdb.org/t/p/w300${castSortedByPopularity[i].poster_path}`
              : "/images/placeholder-movie.png"
          } class="people-known-for__poster" />
          <p class="people-known-for__as-character">
            <span class="details-red-color">As: </span><br/>
            ${castSortedByPopularity[i].character}
          </p>
        </a>
      `;
      }
      if (castSortedByPopularity[i].media_type === "tv") {
        idStrPeopleDetails = "tv";
        cardMarkup += `
        <a href="/pages/details/tvshow/index.html" class="people-known-for__card" data-tvid="${
          castSortedByPopularity[i].id
        }">
          <img src=${
            castSortedByPopularity[i].poster_path
              ? `https://image.tmdb.org/t/p/w300${castSortedByPopularity[i].poster_path}`
              : "/images/placeholder-movie.png"
          } class="people-known-for__poster" />
          <p class="people-known-for__as-character">
            <span class="details-red-color">As:</span><br/>
            ${castSortedByPopularity[i].character}
          </p>
        </a>
      `;
      }
    }
    peopleKnownForContainer.insertAdjacentHTML("beforeend", cardMarkup);
    cardMarkup = "";
  })
  .then(() => {
    document.querySelectorAll(".people-known-for__card").forEach((card) => {
      card.addEventListener("click", function () {
        if (card.dataset.movieid) {
          localStorage.setItem(`movieid`, card.dataset.movieid);
        } else {
          localStorage.setItem(`tvid`, card.dataset.tvid);
        }
      });
    });
  });

actorAllCredits(id)
  .then((data) => {
    if (data.cast.length > 0) {
      castCreditsMarkup += `
    <div class="people-all-credits__department people-all-credits__department__acting">
    <h3 class="people-all-credits__department__heading">Acting</h3>
    
  </div>
    `;
    }
  })
  .then(() => {
    peopleCreditsContainer.insertAdjacentHTML("beforeend", castCreditsMarkup);
    castCreditsMarkup = "";
  })
  .then(() => {
    if (document.querySelector(".people-all-credits__department__acting")) {
      createMarkupDepartmentActing()
        .then((data) => {
          document
            .querySelector(".people-all-credits__department__acting")
            .insertAdjacentHTML("beforeend", data);
        })
        .then(() => {
          const cards = document.querySelectorAll(".people-all-credits__card");
          cards.forEach((c) => {
            c.addEventListener("click", function () {
              // localStorage.setItem("id", c.dataset.id);
              if (c.dataset.movieid) {
                localStorage.setItem("movieid", c.dataset.movieid);
              }
              if (c.dataset.tvid) {
                localStorage.setItem("tvid", c.dataset.tvid);
              }
            });
          });
        })
        .then(() => {
          actorAllCredits(id)
            .then((data) => {
              data.crew.forEach((c) => {
                if (c.department === "Production") {
                  if (cnt1 !== 1) {
                    crewCreditsMarkup += `
          <div class="people-all-credits__department people-all-credits__department__production">
          <h3 class="people-all-credits__department__heading">Production</h3>
          </div>
          `;
                    cnt1++;
                  }
                }
                if (c.department === "Crew") {
                  if (cnt2 !== 1) {
                    crewCreditsMarkup += `
          <div class="people-all-credits__department people-all-credits__department__crew">
          <h3 class="people-all-credits__department__heading">Crew</h3>
          
          </div>
          `;
                    cnt2++;
                  }
                }
                if (c.department === "Directing") {
                  if (cnt3 !== 1) {
                    crewCreditsMarkup += `
          <div class="people-all-credits__department people-all-credits__department__directing">
          <h3 class="people-all-credits__department__heading">Directing</h3>
          
          </div>
          `;
                    cnt3++;
                  }
                }
                if (c.department === "Editing") {
                  if (cnt4 !== 1) {
                    crewCreditsMarkup += `
          <div class="people-all-credits__department people-all-credits__department__editing">
          <h3 class="people-all-credits__department__heading">Editing</h3>
          
          </div>
          `;
                    cnt4++;
                  }
                }
                if (c.department === "Sound") {
                  if (cnt5 !== 1) {
                    crewCreditsMarkup += `
          <div class="people-all-credits__department people-all-credits__department__sound">
          <h3 class="people-all-credits__department__heading">Sound</h3>
          
          </div>
          `;
                    cnt5++;
                  }
                }
                if (c.department === "Lighting") {
                  if (cnt6 !== 1) {
                    crewCreditsMarkup += `
          <div class="people-all-credits__department people-all-credits__department__lighting">
          <h3 class="people-all-credits__department__heading">Lighting</h3>
          
          </div>
          `;
                    cnt6++;
                  }
                }
                if (c.department === "Visual Effects") {
                  if (cnt7 !== 1) {
                    crewCreditsMarkup += `
          <div class="people-all-credits__department people-all-credits__department__vfx">
          <h3 class="people-all-credits__department__heading">Visual Effects</h3>
          
          </div>
          `;
                    cnt7++;
                  }
                }
                if (c.department === "Art") {
                  if (cnt8 !== 1) {
                    crewCreditsMarkup += `
          <div class="people-all-credits__department people-all-credits__department__art">
          <h3 class="people-all-credits__department__heading">Art</h3>
          
          </div>
          `;

                    cnt8++;
                  }
                }
                if (c.department === "Writing") {
                  if (cnt9 !== 1) {
                    crewCreditsMarkup += `
          <div class="people-all-credits__department people-all-credits__department__writing">
          <h3 class="people-all-credits__department__heading">Writing</h3>
          
          </div>
          `;
                    cnt9++;
                  }
                }
                if (c.department === "Camera") {
                  if (cnt10 !== 1) {
                    crewCreditsMarkup += `
          <div class="people-all-credits__department people-all-credits__department__camera">
          <h3 class="people-all-credits__department__heading">Camera</h3>
          
          </div>
          `;
                    cnt10++;
                  }
                }
                if (c.department === "Actors") {
                  if (cnt11 !== 1) {
                    crewCreditsMarkup += `
          <div class="people-all-credits__department people-all-credits__department__actors">
          <h3 class="people-all-credits__department__heading">Actors</h3>
          
          </div>
          `;
                    cnt11++;
                  }
                }
                if (c.department === "Costume & Make-Up") {
                  if (cnt12 !== 1) {
                    crewCreditsMarkup += `
          <div class="people-all-credits__department people-all-credits__department__costume">
          <h3 class="people-all-credits__department__heading">Costume & Make-Up</h3>
          
          </div>
          `;
                    cnt12++;
                  }
                }
              });
            })
            .then(() => {
              peopleCreditsContainer.insertAdjacentHTML(
                "beforeend",
                crewCreditsMarkup
              );
              crewCreditsMarkup = "";
            })
            .then(() => {
              if (
                document.querySelector(
                  ".people-all-credits__department__production"
                )
              ) {
                createMarkupDepartment("Production")
                  .then((data) => {
                    document
                      .querySelector(
                        ".people-all-credits__department__production"
                      )
                      .insertAdjacentHTML("beforeend", data);
                  })
                  .then(() => {
                    setCardsEvent();
                  })
                  .then(() => {
                    if (
                      document.querySelector(
                        ".people-all-credits__department__crew"
                      )
                    ) {
                      createMarkupDepartment("Crew")
                        .then((data) => {
                          document
                            .querySelector(
                              ".people-all-credits__department__crew"
                            )
                            .insertAdjacentHTML("beforeend", data);
                        })
                        .then(() => {
                          setCardsEvent();
                        });
                    }
                  })
                  .then(() => {
                    if (
                      document.querySelector(
                        ".people-all-credits__department__directing"
                      )
                    ) {
                      createMarkupDepartment("Directing")
                        .then((data) => {
                          document
                            .querySelector(
                              ".people-all-credits__department__directing"
                            )
                            .insertAdjacentHTML("beforeend", data);
                        })
                        .then(() => {
                          setCardsEvent();
                        });
                    }
                  })
                  .then(() => {
                    if (
                      document.querySelector(
                        ".people-all-credits__department__editing"
                      )
                    ) {
                      createMarkupDepartment("Editing")
                        .then((data) => {
                          document
                            .querySelector(
                              ".people-all-credits__department__editing"
                            )
                            .insertAdjacentHTML("beforeend", data);
                        })
                        .then(() => {
                          setCardsEvent();
                        });
                    }
                  })
                  .then(() => {
                    if (
                      document.querySelector(
                        ".people-all-credits__department__sound"
                      )
                    ) {
                      createMarkupDepartment("Sound")
                        .then((data) => {
                          document
                            .querySelector(
                              ".people-all-credits__department__sound"
                            )
                            .insertAdjacentHTML("beforeend", data);
                        })
                        .then(() => {
                          setCardsEvent();
                        });
                    }
                  })
                  .then(() => {
                    if (
                      document.querySelector(
                        ".people-all-credits__department__lighting"
                      )
                    ) {
                      createMarkupDepartment("Lighting")
                        .then((data) => {
                          document
                            .querySelector(
                              ".people-all-credits__department__lighting"
                            )
                            .insertAdjacentHTML("beforeend", data);
                        })
                        .then(() => {
                          setCardsEvent();
                        });
                    }
                  })
                  .then(() => {
                    if (
                      document.querySelector(
                        ".people-all-credits__department__vfx"
                      )
                    ) {
                      createMarkupDepartment("Visual Effects")
                        .then((data) => {
                          document
                            .querySelector(
                              ".people-all-credits__department__vfx"
                            )
                            .insertAdjacentHTML("beforeend", data);
                        })
                        .then(() => {
                          setCardsEvent();
                        });
                    }
                  })
                  .then(() => {
                    if (
                      document.querySelector(
                        ".people-all-credits__department__art"
                      )
                    ) {
                      createMarkupDepartment("Art")
                        .then((data) => {
                          document
                            .querySelector(
                              ".people-all-credits__department__art"
                            )
                            .insertAdjacentHTML("beforeend", data);
                        })
                        .then(() => {
                          setCardsEvent();
                        });
                    }
                  })
                  .then(() => {
                    if (
                      document.querySelector(
                        ".people-all-credits__department__writing"
                      )
                    ) {
                      createMarkupDepartment("Writing")
                        .then((data) => {
                          document
                            .querySelector(
                              ".people-all-credits__department__writing"
                            )
                            .insertAdjacentHTML("beforeend", data);
                        })
                        .then(() => {
                          setCardsEvent();
                        });
                    }
                  })
                  .then(() => {
                    if (
                      document.querySelector(
                        ".people-all-credits__department__camera"
                      )
                    ) {
                      createMarkupDepartment("Camera")
                        .then((data) => {
                          document
                            .querySelector(
                              ".people-all-credits__department__camera"
                            )
                            .insertAdjacentHTML("beforeend", data);
                        })
                        .then(() => {
                          setCardsEvent();
                        });
                    }
                  })
                  .then(() => {
                    if (
                      document.querySelector(
                        ".people-all-credits__department__actors"
                      )
                    ) {
                      createMarkupDepartment("Actors")
                        .then((data) => {
                          document
                            .querySelector(
                              ".people-all-credits__department__actors"
                            )
                            .insertAdjacentHTML("beforeend", data);
                        })
                        .then(() => {
                          setCardsEvent();
                        });
                    }
                  })
                  .then(() => {
                    if (
                      document.querySelector(
                        ".people-all-credits__department__costume"
                      )
                    ) {
                      createMarkupDepartment("Costume & Make-Up")
                        .then((data) => {
                          document
                            .querySelector(
                              ".people-all-credits__department__costume"
                            )
                            .insertAdjacentHTML("beforeend", data);
                        })
                        .then(() => {
                          setCardsEvent();
                        });
                    }
                  });
              }
            });
        });
    }
  });

function setCardsEvent() {
  const cards = document.querySelectorAll(".people-all-credits__card");
  cards.forEach((c) => {
    c.addEventListener("click", function () {
      if (c.dataset.movieid) {
        localStorage.setItem("movieid", c.dataset.movieid);
      }
      if (c.dataset.tvid) {
        localStorage.setItem("tvid", c.dataset.tvid);
      }
    });
  });
}

function propComparator(prop) {
  return function (a, b) {
    return b[prop] - a[prop];
  };
}

async function createMarkupDepartment(dept) {
  let markup = ``;
  await actorAllCredits(id).then((data) => {
    let arr = [];
    data.crew.forEach((c) => {
      arr.push(c);
    });
    arr.forEach((c) => {
      if (c.media_type === "movie") {
        c.release_date !== "" && c.release_date !== undefined
          ? (c.release_date = Number(c.release_date.split("-")[0]))
          : (c.release_date = 0);
      } else if (c.media_type === "tv") {
        c.first_air_date !== "" && c.first_air_date !== undefined
          ? (c.first_air_date = Number(c.first_air_date.split("-")[0]))
          : (c.first_air_date = 0);
        c.release_date = c.first_air_date;
      }
    });
    arr = data.crew.sort(propComparator(`release_date`));
    arr.forEach((c) => {
      if (c.department === dept) {
        markup += `
      <a href=${
        c.media_type === "movie"
          ? "/pages/details/movie/index.html"
          : "/pages/details/tvshow/index.html"
      } class="people-all-credits__card" data-${
          c.media_type === "movie" ? "movie" : "tv"
        }id="${c.id}">
        <p class="people-all-credits__name-of-credit">${
          c.media_type === "movie" ? c.title : c.name
        } ...${c.job}</p>
        <p class="people-all-credits__year-of-credit">${
          c.release_date !== 0 ? c.release_date : "No Information"
        }</p>
      </a>
        `;
      }
    });
  });
  return markup;
}

async function createMarkupDepartmentActing() {
  let markup = ``;
  await actorAllCredits(id).then((data) => {
    let arr = [];
    data.cast.forEach((c) => {
      arr.push(c);
    });
    arr.forEach((c) => {
      if (c.media_type === "movie") {
        c.release_date !== "" && c.release_date !== undefined
          ? (c.release_date = Number(c.release_date.split("-")[0]))
          : (c.release_date = 0);
      } else if (c.media_type === "tv") {
        c.first_air_date !== "" && c.first_air_date !== undefined
          ? (c.first_air_date = Number(c.first_air_date.split("-")[0]))
          : (c.first_air_date = 0);
        c.release_date = c.first_air_date;
      }
    });
    arr = data.cast.sort(propComparator(`release_date`));
    arr.forEach((c) => {
      markup += `
      <a href=${
        c.media_type === "movie"
          ? "/pages/details/movie/index.html"
          : "/pages/details/tvshow/index.html"
      } class="people-all-credits__card" data-${
        c.media_type === "movie" ? "movie" : "tv"
      }id="${c.id}">
        <p class="people-all-credits__name-of-credit">${
          c.media_type === "movie" ? c.title : c.name
        } ...as ${c.character}</p>
        <p class="people-all-credits__year-of-credit">${
          c.release_date !== 0 ? c.release_date : "No Information"
        }</p>
      </a>
        `;
    });
  });
  return markup;
}
