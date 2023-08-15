import React from "react";
import { useLocation, Link } from "react-router-dom";
import { WiDaySunny, WiRain, WiSnow, WiStrongWind, WiCloudy, WiHumidity, WiThermometer } from "react-icons/wi";
import { AiOutlineArrowLeft } from "react-icons/ai";
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

  const iconColor = "#1f8bfd";

  const getCountryName = (countryCode) => {
    const country = countryList.getName(countryCode);
    return country || countryCode;
  };

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
        return <WiDaySunny size={100} color={iconColor} />;
      case "01n":
        return <WiDaySunny size={100} color={iconColor} />;
      case "02d":
      case "02n":
        return <WiCloudy size={100} color={iconColor} />;
      case "03d":
      case "03n":
        return <WiCloudy size={100} color={iconColor} />;
      case "04d":
      case "04n":
        return <WiCloudy size={100} color={iconColor} />;
      case "09d":
      case "09n":
        return <WiRain size={100} color={iconColor} />;
      case "10d":
      case "10n":
        return <WiRain size={100} color={iconColor} />;
      case "11d":
      case "11n":
        return <WiStrongWind size={100} color={iconColor} />;
      case "13d":
      case "13n":
        return <WiSnow size={100} color={iconColor} />;
      case "50d":
      case "50n":
        return <WiCloudy size={100} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <div className="weather-container">
      <form className="weather-card">
        <div className="title-arrow">
          <Link to="/" className="back-arrow">
            <span className="arrow-icon"><AiOutlineArrowLeft /></span>
          </Link>
          <h1 className="text-primary main-title">Weather App</h1>
        </div>
        <hr className="line" />
        <div className="weather-icon">{getWeatherIcon(weatherData.weather[0].icon)}</div>
        <h1 className="temperature">{kelvinToCelsius(weatherData.main.temp)}<span className="slim">&deg;</span><span className="slim">C</span></h1>
        <h4>{weatherData.weather[0].description}</h4>
        <div className="mb-3">
          <FaMapMarkerAlt size={20} color="#666" className="location-icon" />
          <span className="ms-1">{weatherData.name}, {getCountryName(weatherData.sys.country)}</span>
        </div>
        <hr className="line" />
        <div className="base-data">
          <div className="base-data-top">
            <div className="d-flex flex-row align-items-center">
              <WiThermometer size={35} color={iconColor} />
            </div>
            <div className="flex-container">
              <h5>{kelvinToCelsius(weatherData.main.feels_like)}&deg;C</h5>
              <div className="text-center">
                <span className="feels-like-label">Feels like</span>
              </div>
            </div>
          </div>
          <div className="vertical-line"></div>
          <div className="base-data-top">
            <div className="d-flex flex-row align-items-center">
              <div>
                <WiHumidity size={35} color={iconColor} />
              </div>
              <div className="flex-container">
                <h5 className="humidity-percent">{weatherData.main.humidity}%</h5>
                <div className="text-center">
                  <span className="humid-label">Humidity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Weather;
