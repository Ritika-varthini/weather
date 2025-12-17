const express = require("express");
const axios = require("axios");
const Weather = require("../models/Weather");
require("dotenv").config();

const router = express.Router();

// Main weather route
// Supports: /weather?q=London&units=metric
router.get("/", async (req, res) => {
  try {
    const city = req.query.q; // use 'q' like OpenWeatherMap
    const units = req.query.units || "metric"; // default to metric

    if (!city) {
      return res.status(400).json({ error: "City parameter (q) is required" });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: units,
        },
      }
    );

    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
    };

    // Save to database
    await Weather.create(weatherData);

    res.json(weatherData);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

// Optional: /weather/:city for your front-end
router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const units = "metric"; // front-end uses metric by default

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: units,
        },
      }
    );

    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
    };

    await Weather.create(weatherData);

    res.json(weatherData);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

module.exports = router;
