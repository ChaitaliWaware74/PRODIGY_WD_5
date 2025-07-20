# PRODIGY_WD_5

# Weather App

This is a simple web-based weather application that allows users to:

- Search weather by entering a **city name**, or  
- Automatically fetch weather using their **current location** (via Geolocation API).

It uses:
- [OpenWeatherMap API](https://openweathermap.org/api) for weather data.
- [OpenCage Geocoding API](https://opencagedata.com/api) for reverse geolocation (latitude/longitude → city).

## Features

-  Detect user's current location using browser Geolocation.
-  Fetch current weather information for the detected or entered city.
-  Displays temperature, weather description, humidity, and wind speed.
-  Fallback to “Your Location” when precise city is not available.

##  Technologies Used

- **HTML** – Structure of the page  
- **CSS** – Styling the layout (optional customization)  
- **JavaScript (Vanilla)** – Logic to fetch and display weather using APIs

##  How to Run the Project

1. Clone or download this repository.
2. Replace the placeholder API keys with your actual ones:

```js
const weatherApiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const geoApiKey = "YOUR_OPENCAGE_API_KEY";
