import WeatherInfo from "./WeatherInfo";
import { useState, useEffect } from "react";
import axios from "axios";

const SingleCountry = ({ country }) => {
  const languages = Object.values(country.languages);
  const api_key = process.env.REACT_APP_API_KEY;
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    const https = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${api_key}`;
    axios.get(https).then((response) => {
      const weatherData = response.data;
      setWeatherInfo(weatherData);
    });
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area.toLocaleString().replaceAll(",", " ")} km²</p>

      <b>Languages:</b>

      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <br></br>
      <img src={country.flags.png} alt="Country flag" height={140} with={140} />

      <br></br>
      <br></br>

      {Object.keys(weatherInfo).length ? (
        <WeatherInfo
          weatherInfo={weatherInfo}
          capitalName={country.capital[0]}
        />
      ) : null}
    </div>
  );
};

export default SingleCountry;
