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

  let dayNamesArray = [];
  let dayTempArray = [];

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
  const temp = weatherData.currentConditions.temp.toString().slice(0, 2);
  const condition = weatherData.currentConditions.conditions;
  const feelsLike = weatherData.currentConditions.feelslike;
  const humidity = weatherData.currentConditions.humidity;
  const visibility = weatherData.currentConditions.visibility;
  const cloudiness = weatherData.currentConditions.cloudcover;
  const chanceOfRain = weatherData.currentConditions.precipprob;
  const sunset = weatherData.currentConditions.sunset.slice(0, 5);
  const sunrise = weatherData.currentConditions.sunrise.slice(0, 5);
  console.log(weatherData);
  let dates = weatherData.days.slice(1, 8);
  dates.forEach((date) =>
    dayNamesArray.push(getCurrentDay(new Date(date.datetime).getUTCDay()))
  );

  dates.forEach((date) => dayTempArray.push(date.temp.toString().slice(0, 2)));

  console.log(dayNamesArray);
  console.log(dayTempArray);

  const cityContainer = document.getElementById("city");
  const dateContainer = document.getElementById("date");
  const tempContainer = document.getElementById("temperature");
  const conditionContainer = document.getElementById("condition");
  const feelsContainer = document.getElementById("feelsLike");
  const visibilityContainer = document.getElementById("visibility");
  const cloudinessContainer = document.getElementById("cloudiness");
  const chanceOfRainContainer = document.getElementById("chanceOfRain");
  const sunriseContainer = document.getElementById("sunrise");
  const sunsetContainer = document.getElementById("sunset");
  const humidityContainer = document.getElementById("humidity");
  const secondConsecutiveDay = document.getElementById("secondConsecutiveDay");
  const thirdConsecutiveDay = document.getElementById("thirdConsecutiveDay");
  const fourthConsecutiveDay = document.getElementById("fourthConsecutiveDay");
  const fifthConsecutiveDay = document.getElementById("fifthConsecutiveDay");
  const sixthConsecutiveDay = document.getElementById("sixthConsecutiveDay");
  const seventhConsecutiveDay = document.getElementById(
    "seventhConsecutiveDay"
  );
  const eigthConsecutiveDay = document.getElementById("eightConsecutiveDay");

  const secondDayTemp = document.getElementById("secondDayTemp");
  const thirdDayTemp = document.getElementById("thirdDayTemp");
  const fourthDayTemp = document.getElementById("fourthDayTemp");
  const fifthDayTemp = document.getElementById("fifthDayTemp");
  const sixthDayTemp = document.getElementById("sixthDayTemp");
  const seventhDayTemp = document.getElementById("seventhDayTemp");
  const eightDayTemp = document.getElementById("eightDayTemp");

  cityContainer.textContent = address;
  dateContainer.textContent = `${currentDate} | ${currentTime}`;
  tempContainer.textContent = `${temp}°F`;
  conditionContainer.textContent = condition;
  feelsContainer.textContent = `Feels Like ${feelsLike}°F`;
  visibilityContainer.textContent = `${visibility}km`;
  cloudinessContainer.textContent = `${cloudiness}%`;
  chanceOfRainContainer.textContent = `${chanceOfRain}%`;
  sunriseContainer.textContent = `${sunrise}`;
  sunsetContainer.textContent = `${sunset}`;
  humidityContainer.textContent = `${humidity}%`;
  secondConsecutiveDay.textContent = dayNamesArray[0];
  thirdConsecutiveDay.textContent = dayNamesArray[1];
  fourthConsecutiveDay.textContent = dayNamesArray[2];
  fifthConsecutiveDay.textContent = dayNamesArray[3];
  sixthConsecutiveDay.textContent = dayNamesArray[4];
  seventhConsecutiveDay.textContent = dayNamesArray[5];
  eigthConsecutiveDay.textContent = dayNamesArray[6];

  secondDayTemp.textContent = dayTempArray[0];
  thirdDayTemp.textContent = dayTempArray[1];
  fourthDayTemp.textContent = dayTempArray[2];
  fifthDayTemp.textContent = dayTempArray[3];
  sixthDayTemp.textContent = dayTempArray[4];
  seventhDayTemp.textContent = dayTempArray[5];
  eightDayTemp.textContent = dayTempArray[6];

  const weatherObj = {
    address,
    currentTime,
    temp,
    condition,
    feelsLike,
    humidity,
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
