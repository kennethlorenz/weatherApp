const cityLocation = document.getElementById("location");
const unitChangeBtn = document.getElementById("unit");
const xMarkBtn = document.getElementById("xmark");
const searchIcon = document.getElementById("magnifying");

xMarkBtn.style.display = "none";

function getCurrentDateAndTime() {
  const currentDate = new Date();
  let dayName = currentDate.toLocaleString("en-us", { weekday: "long" });
  let day = currentDate.getDate();
  let month = currentDate.toLocaleString("default", { month: "long" });
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  let dateString = `${dayName} ${day} ${month} ${year} | ${hour}:${minutes}`;
  return dateString;
}

async function getWeatherData(city) {
  const apiKey = "FTQDUTWGT93NS9LP54Y58HUPK";

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let monthName = date.toLocaleString("default", { month: "long" });
  let day = date.getDate();
  let dayName = getCurrentDay(date.getDay());

  let startDate = convertDate(`${year}-${month}-${day}`);
  let endDate = convertDate(`${year}-${month}-${day + 7}`);

  console.log(startDate, endDate);
  const res = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?key=${apiKey}`,
    { mode: "cors" }
  );

  const weatherData = await res.json();
  const address = weatherData.resolvedAddress;
  let datetime = weatherData.currentConditions.datetime;
  let currentTime = datetime.slice(0, 5);
  let currentDate = getCurrentDate(year, monthName, day, dayName);
  const temp = weatherData.currentConditions.temp;
  const condition = weatherData.currentConditions.conditions;
  const feelsLike = weatherData.currentConditions.feelslike;
  const wind = weatherData.currentConditions.winddir;
  const humidity = weatherData.currentConditions.humidity;
  const uvIndex = weatherData.currentConditions.uvindex;
  const visibility = weatherData.currentConditions.visibility;
  const cloudiness = weatherData.currentConditions.cloudcover;
  const chanceOfRain = weatherData.currentConditions.precipprob;
  const sunset = weatherData.currentConditions.sunset;
  const sunrise = weatherData.currentConditions.sunrise;
  console.log(weatherData);

  const cityContainer = document.getElementById("city");
  const dateContainer = document.getElementById("date");
  const tempContainer = document.getElementById("temperature");
  const conditionContainer = document.getElementById("condition");
  const feelsContainer = document.getElementById("feelsLike");
  const windDirContainer = document.getElementById("windDirection");
  const humidityContainer = document.getElementById("humidity");
  const uvIndexContainer = document.getElementById("uvIndex");
  const visibilityContainer = document.getElementById("visibility");
  const cloudinessContainer = document.getElementById("cloudiness");
  const chanceOfRainContainer = document.getElementById("chanceOfRain");
  const sunriseContainer = document.getElementById("sunrise");
  const sunsetContainer = document.getElementById("sunset");

  cityContainer.textContent = address;
  dateContainer.textContent = `${currentDate} | ${currentTime}`;
  const weatherObj = {
    address,
    currentTime,
    temp,
    condition,
    feelsLike,
    wind,
    humidity,
    uvIndex,
    visibility,
    cloudiness,
    chanceOfRain,
    feelsLike,
    sunset,
    sunrise,
  };
  console.log(weatherObj);
  return weatherObj;
}

function convertDate(str) {
  return str
    .split("-")
    .map((s) => (s < 10 ? `0${s}` : s))
    .join("-");
}

function getCurrentDay(day) {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return dayNames[day];
}

function getCurrentDate(year, month, day, dayName) {
  let currentDate = `${dayName} ${day} ${month} ${year}`;

  return currentDate;
}

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
  if (inputLength === 0) {
    console.log("Filled");
    xMarkBtn.style.display = "none";
  } else {
    xMarkBtn.style.display = "block";
  }
});

cityLocation.addEventListener("keyup", async (e) => {
  if (e.key === "Enter") {
    const city = cityLocation.value;
    await getWeatherData(city);
  }
});

getWeatherData("toronto");
