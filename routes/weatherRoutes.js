const express = require("express");
const axios = require("axios");
const Weather = require("../models/Weather");
require("dotenv").config();

const router = express.Router();

// GET /weather?q=London
router.get("/", async (req, res) => {
  try {
    const city = req.query.q;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
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
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

module.exports = router;
