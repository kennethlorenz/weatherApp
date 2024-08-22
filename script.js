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

function updateCurrentTempScale() {
  let tempScale = document.getElementById("tempScale").textContent;
  let scale = document.getElementById("scale");
  scale.textContent = isCelsius(tempScale) ? "°F" : "°C";
}

async function getWeatherData(city) {
  const apiKey = "FTQDUTWGT93NS9LP54Y58HUPK";

  let tempScale = document.getElementById("tempScale").textContent;
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
  tempContainer.textContent = isCelsius(tempScale)
    ? `${temp}`
    : `${convertToCelsius(temp).slice(0, 2)}`;
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

  secondDayTemp.textContent = isCelsius(tempScale)
    ? dayTempArray[0]
    : convertToCelsius(dayTempArray[0]).slice(0, 2);
  thirdDayTemp.textContent = isCelsius(tempScale)
    ? dayTempArray[1]
    : convertToCelsius(dayTempArray[1]).slice(0, 2);
  fourthDayTemp.textContent = isCelsius(tempScale)
    ? dayTempArray[2]
    : convertToCelsius(dayTempArray[2]).slice(0, 2);
  fifthDayTemp.textContent = isCelsius(tempScale)
    ? dayTempArray[3]
    : convertToCelsius(dayTempArray[3]).slice(0, 2);
  sixthDayTemp.textContent = isCelsius(tempScale)
    ? dayTempArray[4]
    : convertToCelsius(dayTempArray[4]).slice(0, 2);
  seventhDayTemp.textContent = isCelsius(tempScale)
    ? dayTempArray[5]
    : convertToCelsius(dayTempArray[5]).slice(0, 2);
  eightDayTemp.textContent = isCelsius(tempScale)
    ? dayTempArray[6]
    : convertToCelsius(dayTempArray[6]).slice(0, 2);

  updateCurrentTempScale();
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

function isCelsius(temp) {
  if (temp == "C") {
    return true;
  } else {
    return false;
  }
}

function convertToCelsius(temp) {
  let celsiusTemp = Math.round((temp - 32) * (5 / 9));
  return celsiusTemp.toString();
}

function convertToFahrenheit(temp) {
  let fahrenheitTemp = Math.round((temp * 9) / 5 + 32);
  return fahrenheitTemp.toString();
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

function updateTempBasedOnScale() {
  let tempScale = document.getElementById("tempScale").textContent;
  const tempContainer = document.getElementById("temperature");
  const secondDayTemp = document.getElementById("secondDayTemp");
  const thirdDayTemp = document.getElementById("thirdDayTemp");
  const fourthDayTemp = document.getElementById("fourthDayTemp");
  const fifthDayTemp = document.getElementById("fifthDayTemp");
  const sixthDayTemp = document.getElementById("sixthDayTemp");
  const seventhDayTemp = document.getElementById("seventhDayTemp");
  const eightDayTemp = document.getElementById("eightDayTemp");

  console.log(isCelsius(tempScale));

  tempContainer.textContent = isCelsius(tempScale)
    ? convertToCelsius(tempContainer.textContent).slice(0, 2)
    : convertToFahrenheit(tempContainer.textContent).slice(0, 2);

  secondDayTemp.textContent = isCelsius(tempScale)
    ? convertToCelsius(secondDayTemp.textContent).slice(0, 2)
    : convertToFahrenheit(secondDayTemp.textContent).slice(0, 2);

  thirdDayTemp.textContent = isCelsius(tempScale)
    ? convertToCelsius(thirdDayTemp.textContent).slice(0, 2)
    : convertToFahrenheit(thirdDayTemp.textContent).slice(0, 2);

  fourthDayTemp.textContent = isCelsius(tempScale)
    ? convertToCelsius(fourthDayTemp.textContent).slice(0, 2)
    : convertToFahrenheit(fourthDayTemp.textContent).slice(0, 2);

  fifthDayTemp.textContent = isCelsius(tempScale)
    ? convertToCelsius(fifthDayTemp.textContent).slice(0, 2)
    : convertToFahrenheit(fifthDayTemp.textContent).slice(0, 2);

  sixthDayTemp.textContent = isCelsius(tempScale)
    ? convertToCelsius(sixthDayTemp.textContent).slice(0, 2)
    : convertToFahrenheit(sixthDayTemp.textContent).slice(0, 2);

  seventhDayTemp.textContent = isCelsius(tempScale)
    ? convertToCelsius(seventhDayTemp.textContent).slice(0, 2)
    : convertToFahrenheit(seventhDayTemp.textContent).slice(0, 2);

  eightDayTemp.textContent = isCelsius(tempScale)
    ? convertToCelsius(eightDayTemp.textContent).slice(0, 2)
    : convertToFahrenheit(eightDayTemp.textContent).slice(0, 2);
}

xMarkBtn.addEventListener("click", () => {
  let inputField = document.getElementById("location");
  inputField.value = "";
  xMarkBtn.style.display = "none";
});

unitChangeBtn.addEventListener("click", (e) => {
  let tempScale = document.getElementById("tempScale");
  updateTempBasedOnScale();
  if (tempScale.textContent === "F") {
    tempScale.textContent = "C";
  } else {
    tempScale.textContent = "F";
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
