import React from "react";

const WeatherInfo = ({ weatherInfo, capitalName }) => {
  const weatherIcon = `http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`;
  return (
    <div>
      <div>
        <h1>Weather in {capitalName}</h1>

        <p>temperature {weatherInfo.main.temp} Celsius </p>

        <img src={weatherIcon} alt="Country flag" height={140} with={140} />

        <p>wind {weatherInfo.wind.speed} m/s </p>
      </div>
    </div>
  );
};

export default WeatherInfo;
