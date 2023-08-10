import React from "react";
import { useLocation } from "react-router-dom";
import { WiDaySunny, WiRain, WiSnow, WiStrongWind, WiCloudy, WiHumidity, WiThermometer } from "react-icons/wi";
import './weather.css';
import { FaMapMarkerAlt } from "react-icons/fa";
import countryList from 'country-list';

const Weather = () => {
  const location = useLocation();
  const weatherData = location.state ? location.state.weatherData : null;

  if (!weatherData) {
    return <p>No weather data available.</p>;
  }

  const kelvinToCelsius = (kelvin) => {
    const celsius = kelvin - 273.15;
    return Math.floor(celsius);
  };

  const getCountryName = (countryCode) => {
    const country = countryList.getName(countryCode);
    return country || countryCode;
  };

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
        return <WiDaySunny size={100} color="#f8d547" />;
      case "01n":
        return <WiDaySunny size={100} color="#222" />;
      case "02d":
      case "02n":
        return <WiCloudy size={100} color="#aab2b7" />;
      case "03d":
      case "03n":
        return <WiCloudy size={100} color="#aab2b7" />;
      case "04d":
      case "04n":
        return <WiCloudy size={100} color="#aab2b7" />;
      case "09d":
      case "09n":
        return <WiRain size={100} color="#51a0d5" />;
      case "10d":
      case "10n":
        return <WiRain size={100} color="#51a0d5" />;
      case "11d":
      case "11n":
        return <WiStrongWind size={100} color="#5f737d" />;
      case "13d":
      case "13n":
        return <WiSnow size={100} color="#9db9e2" />;
      case "50d":
      case "50n":
        return <WiCloudy size={100} color="#aab2b7" />;
      default:
        return null;
    }
  };

  return (
    <div className="weather-container">
      <form className="weather-card">
        <h1 className="text-primary main-title">Weather App</h1>
        <div className="weather-icon">{getWeatherIcon(weatherData.weather[0].icon)}</div>
        <h1 className="temperature">{kelvinToCelsius(weatherData.main.temp)}&deg;C</h1>
        <h4>{weatherData.weather[0].description}</h4>
        <div className="location">
          <FaMapMarkerAlt size={20} color="#666" />
          <span>
            {weatherData.name}, {getCountryName(weatherData.sys.country)}
          </span>
        </div>
        <div className="base-data">
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-row align-items-center">
              <WiThermometer size={35} color="#888" />
              <h5>{kelvinToCelsius(weatherData.main.feels_like)}&deg;C</h5>
            </div>
            <div className="text-center">
              <span className="feels-like-label">Feels like</span>
            </div>
          </div>
          <div className="humidity">
            <div className="d-flex flex-row align-items-center">
              <div className="humid">
                <WiHumidity size={35} color="#888" />
                <h5>{weatherData.main.humidity}%</h5>
              </div>
              <span className="humid-label">Humidity</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Weather;
