import React, { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeatherEmoji = (main) => {
    if (main === "Clear") return "☀️";
    if (main === "Clouds") return "☁️";
    if (main === "Rain") return "🌧️";
    if (main === "Drizzle") return "🌦️";
    if (main === "Thunderstorm") return "⛈️";
    if (main === "Snow") return "❄️";
    if (main === "Mist" || main === "Fog" || main === "Haze")
      return "🌫️";
    return "🌡️";
  };

  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setResult(null);

    const apiKey = "c3cd3d2f1a33ad857bf98fe37ca1fc93";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setResult(data);
      } else {
        setError("City not found");
      }
    } catch {
      setError("Error fetching data");
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h2>Weather App</h2>

      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>Get Weather</button>
      </div>

      {loading && <p className="loading-text">Loading...</p>}
      {error && !loading && <p className="error-text">{error}</p>}

      {result && !loading && (
        <div className="weather-result">
          <h3>
            {result.name}, {result.sys.country}
          </h3>

          <p className="weather-emoji">
            {getWeatherEmoji(result.weather[0].main)}
          </p>

          <p style={{ textTransform: "capitalize" }}>
            {result.weather[0].description}
          </p>

          <p>🌡 Temp: {result.main.temp} °C</p>
          <p>💧 Humidity: {result.main.humidity}%</p>
          <p>💨 Wind: {result.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
