async function getWeatherData() {
  const apiKey = "ASAL3VGETC2PTQ6332SXBPBB8";
  const res = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/calgary/2024-07-17/2024-07-24?key=${apiKey}`,
    { mode: "cors" }
  );

  const weatherData = await res.json();

  console.log(weatherData);
}

getWeatherData();
