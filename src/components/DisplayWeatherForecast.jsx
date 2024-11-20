
import PropTypes from 'prop-types';

// Helper function to group the forecast by day
const groupForecastByDay = (forecastList) => {
  const days = {};

  forecastList.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
    });
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(forecast);
  });

  return days;
};


const DisplayWeatherForecast = ({forecast}) => {

  // Group the forecast list by day
  const groupedForecast = groupForecastByDay(forecast.list);

  return (
    <div>
      <h2>5-Day Forecast {forecast.city.name}</h2>
      <div className="forecast-container">
        {Object.keys(groupedForecast).map((day, index) => {
          const dayForecast = groupedForecast[day];
          const { main, weather } = dayForecast[0]; // Take the first 3-hour segment as representative for the day
          
          return (
            <div key={index} className="forecast-day">
              <h3>{day}</h3>
              <p>Temperature: {main.temp}°C</p>
              <p>Weather: {weather[0].description}</p>
              <p>Min: {main.temp_min}°C, Max: {main.temp_max}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

DisplayWeatherForecast.propTypes = {
  forecast: PropTypes.object.isRequired,
};

export default DisplayWeatherForecast