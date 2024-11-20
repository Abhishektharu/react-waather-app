import { useEffect, useState } from "react";
import axios from "axios";
import DisplayWeather from "./DisplayWeather";
import "./App.css";
import DisplayWeatherForecast from "./DisplayWeatherForecast";
import LocationForecast from "./LocationForecast";
import useWeather from "../hooks/useWeather";

const Weather = () => {
  const {fetchWeatherForecast, forecast } = useWeather();
  //get the city name from the user ;
  const [city, setCity] = useState(null);

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const [locationError, setLocationError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [forecastData, setForecastData] = useState(null);

  const API_KEY = "4653f26e9fcc3d5347d3668332334943";
  // console.log(forecast);

  const fetchWeather = async (event) => {
    event.preventDefault();
    if (city) {
      setLoading(true); //set the loading to true while fetching
      setWeatherData(null); // Clear previous weather data

      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      try {
        // Simulate a delay before making the request

        const response = await axios.get(URL);

        setWeatherData(response.data); // Set the weather data
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // console.log(forecast);
      } catch (error) {
        setError("City not found. Please try again." + error);
      } finally {
        setLoading(false); // Stop loading after data is fetched or an error occurs
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(city){
      fetchWeatherForecast(city);
    }
  }

  const findCoord = async () => {
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(currentWeatherURL);
    setWeatherData(response.data); // Set the weather data

    const forecast_response = await axios.get(forecastURL);
    setForecastData(forecast_response.data);
  };
  //get user's current location ;
  useEffect(() => {
    function success(position) {
      const { coords } = position;

      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
      console.log(coords.accuracy);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  console.log(latitude + " " + typeof latitude);
  console.log(longitude + " ");
  console.log(forecastData);

  return (
    <div>
      {/* <form onSubmit={fetchWeather}> */}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
          />
          {/* {console.log(weatherData)} */}
          {/* <button type="submit">Show Weather </button> */}
          <button type="submit">Show Forecast </button>
        </div>
      </form>
      <button onClick={findCoord}>Show location weather</button>
      {error && <p>{error}</p>}
      {/* {weatherData && <DisplayWeather data={weatherData} loading={loading}/>} */}
      {forecast && <DisplayWeatherForecast forecast={forecast} />}
      {forecastData && <LocationForecast forecastData={forecastData} />}
    </div>
  );
};

export default Weather;
