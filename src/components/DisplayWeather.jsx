
function DisplayWeather({ data , loading, forecast}) {

  const { name, main, weather, wind } = data;

  if (loading) {
    return <p>Loading...</p>;  // Show loading message when loading is true
  }

  if (!data) {
    return null;  // Avoid rendering if no data is available
  }

  return (
    <div>
      {loading ? console.log(loading) : null}
      {/* {console.log(loading)} */}
      
      <div className="icon-temp">
						<img
							className=""
							src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
							alt={weather[0].description}
						/>
						{Math.round(main.temp)}
						<sup className="deg">°C</sup>
					</div>
          <div className="des-wind">
						<p>{weather[0].description.toUpperCase()}</p>
      <p>Wind Speed: {wind.speed} m/s</p>
					</div>


      <h2>Weather in {name}</h2>
      <p>Temperature: {main.temp}°C</p>
      <p>Pressure: {main.pressure}°C</p>
      <p>Humidity: {main.humidity}°C</p>
      <p>Sealevel: {main.sea_level}°C</p>
      <p>Ground Level : {main.grnd_level}°C</p>
      <p>Feels Like: {main.feels_like}°C</p>
      <p>Weather: {weather[0].description}</p>
      <p>Humidity: {main.humidity}%</p>


    </div>
  );
}


export default DisplayWeather;
