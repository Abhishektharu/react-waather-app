import React, { useState, useEffect } from 'react';
import DisplayWeather from './DisplayWeather';
import ForecastWeather from './ForecastWeather';
import useWeather from './useWeather';
import './App.css';

const Weather = () => {
  const [city, setCity] = useState('');
  
  // Destructure data and functions from the custom hook
  const {
    weatherData,
    forecastData,
    loading,
    error,
    locationError,
    fetchWeatherByCity,
    getUserLocation,
  } = useWeather();

  // Use the custom hook to fetch user location on component mount
  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  // Handle form submit to fetch weather by city
  const handleSubmit = (event) => {
    event.preventDefault();
    if (city) {
      fetchWeatherByCity(city);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>

      {locationError && (
        <>
          <p>{locationError}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Get Weather</button>
          </form>
        </>
      )}

      {error && <p>{error}</p>}

      {/* Display current weather data */}
      <DisplayWeather data={weatherData} loading={loading} />

      {/* Display 5-day forecast data */}
      {forecastData && <ForecastWeather forecastData={forecastData} />}
    </div>
  );
};

export default Weather;
