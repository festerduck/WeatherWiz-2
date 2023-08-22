const body = document.querySelector("body");
const container = document.querySelector(".container");
const searchIcon = document.getElementById("search-icon");
const searchBox = document.getElementById("search-box");
const search = document.querySelector(".hide-search");

function searchMechanism(show) {
  if (show) {
    body.classList.add("show-elements");
    search.classList.add("show-search");
    search.classList.remove("hide-search");
    search.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    searchBox.focus();
  } else {
    body.classList.remove("show-elements");
    search.classList.remove("show-search");
    search.classList.add("hide-search");
    searchBox.value = "";
  }
}

searchIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  searchMechanism(true);
  body.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    searchMechanism(false);
  });
});

function content(data) {
  const currentLocation = document.getElementById("current-location");
  const currentTemp = document.getElementById("current-temp");
  currentLocation.innerText = data[0].name;
  const temp = data[1].temp.toFixed(0);
  currentTemp.innerText = temp;
  console.log(data[0].name);
}

const apiUrl = "http://localhost:3000/fetchedData";

async function fetchData() {
  const res = await fetch(apiUrl, {
    method: "GET",
  });
  if (res.ok) {
    const fetchedData = await res.json();
    console.log(fetchedData);
    content(fetchedData);
  } else {
    console.log("error");
  }
}

fetchData();
