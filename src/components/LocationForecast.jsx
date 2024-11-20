import PropTypes from "prop-types";

const LocationForecast = ({ forecastData }) => {
  const groupForecastByDay = (forecastList) => {
    const days = {};

    forecastList.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(forecast);
    });

    return days;
  };

  // Group the forecast list by day
  const groupedForecast = groupForecastByDay(forecastData.list);

  return (
    <div>
      <h2>5-Day Forecast {forecastData.city.name}, {forecastData.city.country}</h2>
      <div className="forecast-container">
        {Object.keys(groupedForecast).map((day, index) => {
          const dayForecast = groupedForecast[day];
          const { main, weather } = dayForecast[0]; // Take the first 3-hour segment as representative for the day

          return (
            <div key={index} className="forecast-day">
              <h3>{day}</h3>
              <p>Temperature: {main.temp}°C</p>
              <p>Weather: {weather[0].description}</p>
              <p>
                Min: {main.temp_min}°C, Max: {main.temp_max}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

LocationForecast.propTypes = {
    forecastData: PropTypes.object.isRequired,
  };

export default LocationForecast;
