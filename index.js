const body = document.querySelector("body");
const container = document.querySelector(".container");
const searchIcon = document.getElementById("search-icon");
const searchBox = document.getElementById("search-box");
const search = document.querySelector(".hide-search");
const searchLable = document.getElementById("search-label");
const dropDown = document.querySelector(".drop-down");
const loadingAnimation = document.querySelector(".lds-ring");

const setCurrentLocation = document.getElementById("set-current-location");
function bodyClickListener(e) {
  e.stopImmediatePropagation();
  changeLabel(false);

  body.removeEventListener("click", bodyClickListener);
}
searchBox.addEventListener("click", (e) => {
  e.stopPropagation();
  changeLabel(true);
  searchIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    changeLabel(true);
    const location = searchBox.value;
    console.log("Location from the event listener: ", location);
    fetchData(false, false, location);

    changeLabel(false);
  });
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
    }
    fetchData(false, false, location);

    changeLabel(false);
  }
});

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
      },
      {
        enableHighAccuracy: true,
      }
    );
  } else {
    console.error("Geolocation is not available in this browser.");
  }
}

// function searchMechanism(show) {
//   if (show) {
//     body.classList.add("show-elements");
//     search.classList.add("show-search");
//     search.classList.remove("hide-search");
//     search.addEventListener("click", (e) => {
//       e.stopPropagation();
//     });
//     searchBox.focus();
//   } else {
//     body.classList.remove("show-elements");
//     search.classList.remove("show-search");
//     search.classList.add("hide-search");
//     searchBox.value = "";
//   }
// }

// searchIcon.addEventListener("click", (e) => {
//   e.stopPropagation();
//   searchMechanism(true);
//   body.addEventListener("click", (e) => {
//     e.stopImmediatePropagation();
//     searchMechanism(false);
//   });
// });

function content(data) {
  const currentLocation = document.getElementById("current-location");
  const currentTemp = document.getElementById("current-temp");
  const feelsLike = document.getElementById("feel-val");
  const windVal = document.getElementById("win-val");
  const humVal = document.getElementById("hum-val");
  currentLocation.innerText = data[0].name;
  const temp = data[1].temp.toFixed(0);
  currentTemp.innerText = temp;
  currentTemp.classList.add("animation");
  currentLocation.classList.add("text-animation");
  setTimeout(() => {
    currentLocation.classList.remove("text-animation");
    currentTemp.classList.remove("animation");
  }, 1000);
  feelsLike.innerText = data[1].feels_like;
  windVal.innerText = data[1].wind_speed.toFixed(0);
  humVal.innerText = data[1].humidity;
  console.log(data[0].name);
}

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
      if (lat && long) {
        // searchBox.value = fetchedData[0].name;
      }
      console.log(fetchedData);
      showLoadingAnimation(false);
      content(fetchedData);
    } else {
      if (res.status === 400) {
        alert("Location Invalid");
        showLoadingAnimation(false);
      }
      console.log("error");
    }
  }
}

function showLoadingAnimation(value) {
  if (value) {
    // container.style.transition = "opacity 500ms";
    // container.style.opacity = "0.3";
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
