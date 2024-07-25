const cityLocation = document.getElementById("location");
const unitChangeBtn = document.getElementById("unit");
const xMarkBtn = document.getElementById("xmark");
const searchIcon = document.getElementById("magnifying");

xMarkBtn.style.display = "none";

xMarkBtn.addEventListener("click", () => {
  let inputField = document.getElementById("location");
  inputField.value = "";
  xMarkBtn.style.display = "none";
});

unitChangeBtn.addEventListener("click", (e) => {
  console.log(e.target.textContent);
  if (e.target.textContent === "Change to °F") {
    e.target.textContent = "Change to °C";
  } else {
    e.target.textContent = "Change to °F";
  }
});

cityLocation.addEventListener("keyup", (e) => {
  const inputLength = cityLocation.value.length;
  console.log(inputLength);
  if (inputLength === 0) {
    console.log("Filled");
    xMarkBtn.style.display = "none";
  } else {
    xMarkBtn.style.display = "block";
  }
});

cityLocation.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const city = cityLocation.value;
    console.log(city);
    //getWeatherData(city);
  }
});

function getCurrentDateAndTime() {
  const currentDate = new Date();
  let dayName = currentDate.toLocaleString("en-us", { weekday: "long" });
  let day = currentDate.getDate();
  let month = currentDate.toLocaleString("default", { month: "long" });
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  let dateString = `${dayName} ${day} ${month} ${year} | ${hour}:${minutes}`;
  console.log(`${dayName} ${day} ${month} ${year} | ${hour}:${minutes}`);
}

async function getWeatherData(city) {
  const apiKey = "ASAL3VGETC2PTQ6332SXBPBB8";
  const res = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/2024-07-17/2024-07-24?key=${apiKey}`,
    { mode: "cors" }
  );

  const weatherData = await res.json();

  const address = weatherData.resolvedAddress;
  const condition = weatherData.currentConditions.conditions;
  const temp = weatherData.currentConditions.temp;
  const feelsLike = weatherData.currentConditions.feelslike;
  const description = weatherData.description;
  const sunset = weatherData.currentConditions.sunset;
  const sunrise = weatherData.currentConditions.sunrise;
  console.log(weatherData);
  console.log(
    address,
    condition,
    temp,
    feelsLike,
    description,
    sunset,
    sunrise
  );
}

//getWeatherData();
