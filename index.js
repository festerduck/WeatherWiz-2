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
