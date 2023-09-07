const body = document.querySelector("body");
const container = document.querySelector(".container");
const searchIcon = document.getElementById("search-icon");
const searchBox = document.getElementById("search-box");
const search = document.querySelector(".hide-search");
const searchLable = document.getElementById("search-label");
const dropDown = document.querySelector(".drop-down");
const loadingAnimation = document.querySelector(".lds-ring");
const errorClose = document.getElementById("close-error");
const setCurrentLocation = document.getElementById("set-current-location");
const hourlyCta = document.getElementById("hourly-cta");
const dailyCta = document.getElementById("daily-cta");
const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");

const white = "#ebf8ff";
const black = "#051923";
const yellow = "#ffcf0a";
const blue = "#0250b6";
let hClicked = true;
let dClicked = false;
let yes = true;
let no = false;
function bodyClickListener(e) {
  e.stopImmediatePropagation();
  changeLabel(false);
  searchIcon.removeEventListener("click", bodyClickListener);
  body.removeEventListener("click", bodyClickListener);
}
searchBox.addEventListener("click", (e) => {
  e.stopPropagation();
  changeLabel(true);

  const searchIconClickHandler = (e) => {
    e.stopPropagation();
    changeLabel(true);
    const location = searchBox.value;
    if (location) {
      fetchData(false, false, location);

      changeLabel(false);
      searchIcon.removeEventListener("click", searchIconClickHandler);
    }
  };
  searchIcon.addEventListener("click", searchIconClickHandler);
  dropDown.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  body.addEventListener("click", bodyClickListener);
});

function changeLabel(value) {
  if (value) {
    searchLable.style.transition = "background-color 0.3s, opacity 0.3s";
    searchIcon.style.transition = "opacity 0.3s";
    searchLable.style.backgroundColor = "#353535";
    searchBox.style.color = "#ebf8ff";
    searchIcon.style.opacity = 0;
    dropDown.style.display = "block";
    searchBox.focus();
    setTimeout(() => {
      searchIcon.src = "icons/search-gray.png";
      searchIcon.style.opacity = 1;
    }, 200);
  } else {
    searchLable.style.transition = "background-color 0.3s, opacity 0.3s";
    searchLable.style.backgroundColor = "";
    searchIcon.style.transition = "opacity 0.3s";
    searchIcon.style.opacity = 0;
    searchBox.style.color = "";
    dropDown.style.display = "none";
    setTimeout(() => {
      searchIcon.src = "icons/search.png";
      searchIcon.style.opacity = 1;
    }, 200);
  }
}

setCurrentLocation.addEventListener("click", () => {
  showLoadingAnimation(true);
  geoLocationFromBrowser();
  changeLabel(false);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const location = searchBox.value;
    console.log("Location from the event listener: ", location);
    if (searchBox.value != "") {
      showLoadingAnimation(true);
      fetchData(false, false, location);
      changeLabel(false);
    }
  }
});

errorClose.addEventListener("mouseenter", (e) => {
  e.stopPropagation();
  errorClose.style.transition = "opacity 100ms";
  errorClose.style.opacity = 0.3;
  setTimeout(() => {
    errorClose.style.opacity = 1;
    errorClose.src = "icons/close.png";
  }, 100);
});
errorClose.addEventListener("mouseleave", (e) => {
  e.stopPropagation();
  errorClose.style.transition = "opacity 100ms";
  errorClose.style.opacity = 0.3;
  setTimeout(() => {
    errorClose.style.opacity = 1;
    errorClose.src = "icons/close-white.png";
  }, 100);
});
errorClose.addEventListener("click", (e) => {
  const errorPop = document.querySelector(".error");
  errorPop.classList.remove("pop-down");
});

hourlyCta.addEventListener("click", (e) => {
  e.stopPropagation();
  dClicked = false;
  hClicked = true;
  toggleCta(false);
});
dailyCta.addEventListener("click", (e) => {
  e.stopPropagation();
  hClicked = false;
  dClicked = true;
  toggleCta(true);
});

hourlyCta.addEventListener("mouseenter", (e) => {
  if (hClicked == false) {
    hoverCta(hourlyCta, true);
  }
});
hourlyCta.addEventListener("mouseleave", (e) => {
  if (hClicked == false) {
    hoverCta(hourlyCta, false);
  }
});
dailyCta.addEventListener("mouseenter", (e) => {
  if (dClicked == false) {
    hoverCta(dailyCta, true);
  }
});
dailyCta.addEventListener("mouseleave", (e) => {
  if (dClicked == false) {
    hoverCta(dailyCta, false);
  }
});
noButton.addEventListener("click", (e) => {
  window.location.href = "/no.html";
});
yesButton.addEventListener("mouseenter", (e) => {
  if (yes == false) {
    hoverCta(yesButton, true);
  }
});
yesButton.addEventListener("mouseleave", (e) => {
  if (yes == false) {
    hoverCta(yesButton, false);
  }
});
noButton.addEventListener("mouseenter", (e) => {
  if (no == false) {
    hoverCta(noButton, true);
  }
});
noButton.addEventListener("mouseleave", (e) => {
  if (no == false) {
    hoverCta(noButton, false);
  }
});
yesButton.addEventListener("click", (e) => {
  buttonAnimation(yesButton, true);
  const preload = document.querySelector(".preload");
  container.style.display = "flex";
  preload.style.transition = "all 500ms";
  preload.style.opacity = 0.3;
  setTimeout(() => {
    preload.style.opacity = 0;
    showError("WELCOME!");
  }, 500);
  setTimeout(() => {
    preload.style.display = "none";
    showLoadingAnimation(false);
  }, 2000);
  showLoadingAnimation(true);
});
noButton.addEventListener("click", (e) => {
  buttonAnimation(noButton, true);
});
function buttonAnimation(elementId, value) {
  const trans = 0.3;
  elementId.style.color = white;
  elementId.style.backgroundColor = blue;
  elementId.style.transition = `all ${trans}s`;
}

function showError(message) {
  const errorPop = document.querySelector(".error");
  const text = errorPop.querySelector("h2");
  text.innerText = message;
  errorPop.style.display = "flex";
  setTimeout(() => {
    errorPop.classList.remove("pop-down");
  }, 5000);
  setTimeout(() => {
    errorPop.style.display = "none";
    errorPop.classList.add("pop-down");
  }, 7000);
}

function showCurrentLocationIcon(value) {
  const current = document.getElementById("current-location-icon-dark");
  if (value) {
    current.style.transition = "opacity 700ms";
    current.style.opacity = 0.3;
    setTimeout(() => {
      current.style.opacity = 1;
      current.style.display = "block";
    }, 200);
  } else {
    current.style.transition = "opacity 700ms";
    current.style.opacity = 1;
    setTimeout(() => {
      current.style.opacity = 0.3;
      current.style.display = "none";
    }, 200);
  }
}

function toggleCta(value) {
  const hourlyCta = document.getElementById("hourly-cta");
  const dailyCta = document.getElementById("daily-cta");
  const conditions = document.querySelector(".conditions-parent");
  const daily = document.querySelector(".daily-conditions");
  if (value) {
    hourlyCta.style.backgroundColor = "#ebf8ff";
    dailyCta.style.backgroundColor = blue;
    dailyCta.style.color = "#ebf8ff";
    hourlyCta.style.color = "#051923";
    hourlyCta.style.transform = "scale(1)";
    dailyCta.style.transform = "scale(1)";
    conditions.style.display = "none";
    daily.style.display = "grid";
    daily.style.animation = "toggleCta 1000ms ease-in-out";
    setTimeout(() => {}, 200);
  } else {
    dailyCta.style.backgroundColor = "";
    hourlyCta.style.backgroundColor = "";
    hourlyCta.style.color = "";
    dailyCta.style.color = "";
    conditions.style.display = "flex";
    daily.style.display = "none";
    hourlyCta.style.transform = "scale(1)";
  }
}

function hoverCta(element, mouseValue) {
  const transVal = "400ms";
  if (mouseValue) {
    element.style.transition = `color ${transVal}, background-color ${transVal}, transform ${transVal}`;
    element.style.backgroundColor = yellow;
    element.style.color = black;
    element.style.transform = "scale(1.05)";
  } else {
    element.style.transition = `color ${transVal}, background-color ${transVal}, transform ${transVal}`;
    element.style.backgroundColor = white;
    element.style.color = black;
    element.style.transform = "scale(1)";
  }
}

function geoLocationFromBrowser() {
  if ("geolocation" in navigator) {
    const options = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const current = {
          long: longitude,
          lat: latitude,
        };
        console.log("Latitude:", current.lat);
        console.log("Longitude:", current.long);
        fetchData(current.lat, current.long, "");
      },
      function (error) {
        console.error("Error getting location:", error.message);
        showError(error.message);
        fetchData(false, false, "London");
      },
      {
        enableHighAccuracy: true,
      }
    );
  } else {
    console.error("Geolocation is not available in this browser.");
    showError("Geolocation is not available in this browser.");
  }
}

function content(data) {
  function updateIcons(time) {
    for (let i = 0; i < 7; i++) {
      const iconElement = document.getElementById(`t${i + 1}-icon`);
      const iconCode = time[i].data.weather[0].icon;
      console.log(iconCode);
      const iconSource = `weather-icons/v2/${iconCode}.svg`;
      iconElement.style.opacity = 0;
      iconElement.style.transition = "opacity 500ms";
      console.log(iconSource);
      setTimeout(() => {
        iconElement.style.opacity = 1;
        iconElement.src = iconSource;
      }, 500);
    }
  }
  function updateTime(time) {
    for (let i = 1; i < 7; i++) {
      const timeElement = document.getElementById(`t${i + 1}-time`);
      const hour = time[i].time.hours;
      const minute = time[i].time.minutes;
      const second = time[i].time.seconds;
      timeElement.innerText = hour + ":" + minute + second;
      console.log("Time : " + hour + ":" + minute + ":" + second);
    }
    console.log("Update time function", time);
  }
  function updateWeeklyIcons(time) {
    for (let i = 1; i < 7; i++) {
      const icon = document.getElementById(`c${i}-img`);
      const iconCode = time[i].data.weather[0].icon;
      const iconSource = `weather-icons/v2/${iconCode}.svg`;
      icon.src = iconSource;
    }
  }
  function updateDay(time) {
    for (let i = 1; i < 7; i++) {
      const day = document.getElementById(`c${i}`);
      const dayVal = time[i].time.day;
      day.innerText = dayVal;
    }
  }
  function updateTemp(time) {
    for (let i = 1; i < 7; i++) {
      const temp = document.getElementById(`c${i}-val`);
      const tempValDay = time[i].data.temp.day.toFixed(0) + "°";
      const tempValNight = time[i].data.temp.night.toFixed(0) + "°";
      temp.innerText = tempValDay + "/" + tempValNight;
    }
  }
  function updateIconsWithDelay(time, i, delay) {
    setTimeout(() => {
      const iconElement = document.getElementById(`t${i + 1}-icon`);
      const iconCode = time[i].data.weather[0].icon;
      const iconSource = `weather-icons/v2/${iconCode}.svg`;
      iconElement.style.opacity = 0;
      iconElement.style.transition = "opacity 1000ms";
      iconElement.onload = () => {
        iconElement.style.opacity = 1;
      };

      iconElement.src = iconSource;
    }, delay);
  }

  function updateCatSays(data) {
    const current = data.weather[0];
    const random = Math.round(Math.random());
    const randomCat = Math.floor(Math.random() * (3 - 0 + 0) + 0);
    console.log("Random Cat: ", randomCat);
    const catSays = {
      sunny: [
        "Sunglasses for you, extra stretches in the sun for your cat!",
        "Get ready for a sunbeam dance-off with your kitty!",
      ],
      cloudy: [
        "Cloudy skies, but your cat's playfulness is anything but gloomy!",
        "Clouds are no match for the purrfect playtime with your feline friend!",
      ],
      rainy: [
        "Rainy days call for rainy playdates with your cat!",
        "Why God Why? Why Raining?",
      ],
      thunder: [
        "Boom, crash, meow! It's a thunderous playtime with your kitty.",
        "Thunder and lightning, but your cat's antics are electrifying!",
      ],
      snow: [
        "Snowflakes are falling, and your cat is leaping into action!",
        "Snowy adventures await—paws and whiskers ready, kitty!",
      ],
      fog: [
        "Mysterious fog? Time for your cat's top-secret hide-and-seek!",
        "Foggy days are perfect for a game of 'Where's the Kitty?'",
      ],
      wind: [
        "Wind's whispering secrets, and your cat is all ears!",
        "Wind-blown whiskers and a playful feline—what a combo!",
      ],
      night: [
        "Starry skies, endless playtime possibilities with your cat!",
        "Me No Play! Me Sleep!",
      ],
    };
    const catRec = {
      shocked: [
        "assets/v2/shocked.svg",
        "assets/v2/puzzled.svg",
        "assets/v2/shocked.svg",
        "assets/v2/puzzled.svg",
      ],
      sleep: [
        "assets/v2/sleep.svg",
        "assets/v2/deep-sleep.svg",
        "assets/v2/sleep.svg",
        "assets/v2/deep-sleep.svg",
      ],
      sad: [
        "assets/v2/sad.svg",
        "assets/v2/sad.svg",
        "assets/v2/sad.svg",
        "assets/v2/sad.svg",
      ],
      happy: [
        "assets/v2/sus.svg",
        "assets/v2/suss-suss.svg",
        "assets/v2/play.svg",
        "assets/v2/awwed.svg",
      ],
      mad: [
        "assets/v2/mad.svg",
        "assets/v2/mad.svg",
        "assets/v2/mad.svg",
        "assets/v2/mad.svg",
      ],
    };
    const catText = document.getElementById("about-cat");
    const catImg = document.getElementById("cat-img");
    if (current.icon === "01d") {
      catText.innerText = catSays.sunny[random];
      catImg.src = `assets/v2/play.svg`;
      catImg.classList.add("cat-animation");
    }
    if (current.icon === "01n") {
      catText.textContent = catSays.night[random];
      catImg.classList.add("cat-animation");
      if (random === 1) catImg.src = catRec.sleep[randomCat];
      else catImg.src = catRec.happy[randomCat];
    }
    if (current.icon === "02d" || current.icon === "02n") {
      catText.textContent = catSays.cloudy[random];
      catImg.classList.add("cat-animation");
      catImg.src = catRec.happy[randomCat];
    }
    if (current.icon === "03d" || current.icon === "03n") {
      catText.textContent = catSays.cloudy[random];
      catImg.classList.add("cat-animation");
      catImg.src = catRec.happy[randomCat];
    }
    if (current.icon === "04d" || current.icon === "04n") {
      catText.textContent = catSays.cloudy[random];
      catImg.classList.add("cat-animation");
      catImg.src = catRec.happy[randomCat];
    }
    if (current.icon === "09d" || current.icon === "09n") {
      catText.textContent = catSays.rainy[random];
      catImg.classList.add("cat-animation");
      if (random === 1) catImg.src = catRec.mad[randomCat];
      else catImg.src = catRec.happy[randomCat];
    }
    if (current.icon === "10d" || current.icon === "10n") {
      catText.textContent = catSays.rainy[random];
      catImg.classList.add("cat-animation");
      if (random === 1) catImg.src = catRec.mad[randomCat];
      else catImg.src = catRec.happy[randomCat];
    }
    if (current.icon === "11d" || current.icon === "11n") {
      catText.textContent = catSays.thunder[random];
      catImg.classList.add("cat-animation");
      catImg.src = catRec.shocked[randomCat];
    }
    if (current.icon === "13d" || current.icon === "13n") {
      catText.textContent = catSays.snow[random];
      catImg.classList.add("cat-animation");
      catImg.src = catRec.happy[random];
    }
    if (current.icon === "50d" || current.icon === "50n") {
      catText.textContent = catSays.fog[random];
      catImg.classList.add("cat-animation");
      catImg.src = catRec.happy[random];
    }
  }
  const currentLocation = document.getElementById("current-location");
  const currentTemp = document.getElementById("current-temp");
  const feelsLike = document.getElementById("feel-val");
  const windVal = document.getElementById("win-val");
  const humVal = document.getElementById("hum-val");
  const precipitation = document.getElementById("ch-val");
  currentLocation.innerText = data.location.name;
  const temp = data.current.temp.toFixed(0);
  currentTemp.innerText = temp;
  currentTemp.classList.add("animation");
  currentLocation.classList.add("text-animation");
  showCurrentLocationIcon(true);
  setTimeout(() => {
    currentLocation.classList.remove("text-animation");
    currentTemp.classList.remove("animation");
  }, 1000);
  feelsLike.innerText = data.current.feels_like.toFixed(0);
  windVal.innerText = data.current.wind_speed.toFixed(0);
  humVal.innerText = data.current.humidity;
  precipitation.innerText = (data.hourly[0].data.pop * 100).toFixed(0);
  const now = document.getElementById("t1-icon");
  now.src = `weather-icons/v2/${data.current.weather[0].icon}.svg`;

  updateTime(data.hourly);
  // updateIcons(data.hourly);
  updateWeeklyIcons(data.weekly);
  updateDay(data.weekly);
  updateTemp(data.weekly);
  for (let i = 1; i < 7; i++) {
    let delay = 100 + i * 100;
    updateIconsWithDelay(data.hourly, i, delay);
  }
  updateCatSays(data.current);
}

// const baseUrl = "http://localhost:3000/fetchedData";
const baseUrl = "http://20.26.238.217:3000/fetchedData";

async function fetchData(lat, long, location) {
  console.log("Entered Location: ", location);

  if (lat && long) {
    const apiUrl = `${baseUrl}?lat=${lat}&long=${long}&latLong=${true}`;
    await GetDataFromServer(apiUrl);
    console.log("Request has been send using Latitude and Longitude");
  } else {
    const apiUrl = `${baseUrl}?location=${encodeURIComponent(
      location
    )}&latLong=${false}`;
    await GetDataFromServer(apiUrl);
    console.log("Request has been sent using Location Query");
  }
  async function GetDataFromServer(apiUrl) {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (res.ok) {
      const fetchedData = await res.json();
      console.log(fetchedData);
      showLoadingAnimation(false);
      content(fetchedData);
      if (!lat && !long) {
        showCurrentLocationIcon(false);
      }
    } else {
      if (res.status === 400) {
        showError("Location Invalid");
        showLoadingAnimation(false);
      }
      console.log("error");
    }
  }
}

function showLoadingAnimation(value) {
  if (value) {
    container.classList.add("loading");
    setTimeout(() => {
      container.style.opacity = 1;
      loadingAnimation.style.display = "flex";
    }, 300);
  } else {
    container.style.transition = "opacity 500ms";
    container.style.opacity = "0";
    setTimeout(() => {
      container.classList.remove("loading");
      loadingAnimation.style.display = "none";
      container.style.opacity = 1;
    }, 300);
  }
}

//MAIN FUNCTION
geoLocationFromBrowser();
