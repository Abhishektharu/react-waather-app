// The custom hook will handle both fetching weather data by city or by user's geolocation.
import axios from "axios";
import { useState } from "react";

const useWeather = () => {
  //get the city name from the user ;

  
  const [forecast, setForecast] = useState(null);

  const API_KEY = "4653f26e9fcc3d5347d3668332334943";
  // console.log(forecast);

  const fetchWeatherForecast = async (city) => {
    if (city) {
      setForecast(null);
      const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
      try {
        const forecast_response = await axios.get(forecast_url);
        
        setForecast(forecast_response.data);
      } catch (error) {
        console.log("City not found. Please try again. " + error);
      }
    }
  };
  return {
    fetchWeatherForecast,
    forecast
  };
};

export default useWeather;
