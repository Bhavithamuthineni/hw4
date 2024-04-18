import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchWeather(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  const fetchWeather = async (latitude, longitude) => {
    const apiKey = '755c5cd48d5c5f1ef0396858280f9b14';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setTemperature(data.main.temp);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      {temperature !== null ? (
        <div>
          <p>Current location: {location.latitude}, {location.longitude}</p>
          <p>Current temperature: {temperature}°C</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;