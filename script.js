const weatherApiKey = "e53896284e2627f4567236982ac97a9b"; // OpenWeatherMap API Key
const geoKey = "d648a4f8c32e453681bd22262604ea14";       // OpenCage API Key

// 1. Get weather by city input
function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        displayWeather(data.name, data);
      } else {
        document.getElementById("weatherResult").innerHTML =
          `<p style="color:red;">❌ City not found. Please try again.</p>`;
      }
    })
    .catch((error) => {
      console.error("City weather fetch error:", error);
      document.getElementById("weatherResult").innerHTML = "Something went wrong.";
    });
}

// 2. Get weather using user's current location
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  } else {
    alert("Geolocation not supported by your browser.");
  }
}

function successCallback(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  console.log("📍 Coordinates:", lat, lon);

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;

  fetch(weatherURL)
    .then(res => res.json())
    .then(weatherData => {
      if (weatherData.cod === 200) {
        getCityNameFromCoordinates(lat, lon).then(cityName => {
          displayWeather(cityName, weatherData);
        });
      } else {
        document.getElementById("weatherResult").innerHTML =
          `<p style="color:red;">❌ Weather not found for your location.</p>`;
      }
    })
    .catch(error => {
      console.error("Weather fetch error:", error);
      document.getElementById("weatherResult").innerHTML =
        "❌ Could not fetch weather data.";
    });
}

function getCityNameFromCoordinates(lat, lon) {
  const geoURL = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geoKey}`;

  return fetch(geoURL)
    .then(res => res.json())
    .then(data => {
      const comp = data.results[0]?.components;

      if (!comp) return "Unknown Location";

      // Use best available name
      return (
        comp.city ||
        comp.town ||
        comp.village ||
        comp.suburb ||
        comp.county ||
        comp.state_district ||
        comp.state ||
        comp.country ||
        "Unknown Location"
      );
    })
    .catch(err => {
      console.error("City name fetch error:", err);
      return "Unknown Location";
    });
}

function errorCallback(error) {
  let errorMessage = "Location access denied or unavailable.";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorMessage = "Location access was denied.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorMessage = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      errorMessage = "Location request timed out.";
      break;
    case error.UNKNOWN_ERROR:
      errorMessage = "An unknown error occurred.";
      break;
  }
  alert(errorMessage);
  console.error("Geolocation error:", error);
}

// 3. Display weather result
function displayWeather(cityName, data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.getElementById("weatherResult").innerHTML = `
    <div class="weather-card">
      <h2>${cityName}, ${data.sys.country}</h2>
      <div class="weather-main">
        <img src="${iconUrl}" alt="${data.weather[0].description}" />
        <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
      </div>
      <p class="weather-desc">${data.weather[0].description}</p>
      <div class="weather-details">
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
        <p>🌡 Feels like: ${Math.round(data.main.feels_like)}°C</p>
      </div>
    </div>
  `;
}
