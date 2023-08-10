import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Home.css'

const Home = () => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchCityName(position.coords.latitude, position.coords.longitude);
      }, (error) => {
        console.error("Error getting current location:", error);
      });
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  const fetchCityName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=57653045019fe17f778c50a6234b0fe6`
      );
      const city = response.data.name;
      console.log("City from current location:", city);
      setLocation(city);
    } catch (error) {
      setError("Error fetching city name from current location");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=57653045019fe17f778c50a6234b0fe6`
      );
      const weatherData = response.data;
      console.log("Weather Data:", weatherData);
      navigate(`/weather/${location}`, { state: { weatherData } });
    } catch (error) {
      setError("Location not found. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <div className="home-card">
        <form onSubmit={handleSubmit}>
          <h1 className="text-primary">Weather App</h1>
          <div className="form-group with-line">
            <input
              type="text"
              placeholder="Enter City Name"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <hr />
            <button
              type="button"
              className="btn btn-success mt-10 form-control"
              onClick={fetchCurrentLocation}
            >
              Current Device Location
            </button>
            <button type="submit" className="btn btn-primary form-control">
              Get Weather
            </button>
          </div>
        </form>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default Home;
