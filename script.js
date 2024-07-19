async function getWeatherData() {
  const apiKey = "ASAL3VGETC2PTQ6332SXBPBB8";
  const res = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/toronto/2024-07-17/2024-07-24?key=${apiKey}`,
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

getWeatherData();
