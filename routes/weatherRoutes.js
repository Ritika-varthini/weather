const express = require("express");
const axios = require("axios");
const { Weather, City } = require("../models");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cityName = req.query.q;

    if (!cityName) {
      return res.status(400).json({ error: "City is required" });
    }

    // Fetch weather
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: cityName,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    // Find or create city
    const [city] = await City.findOrCreate({
      where: { name: response.data.name },
    });

    // Save weather
    const weatherData = await Weather.create({
      cityId: city.id,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
    });

    res.json({
      city: city.name,
      temperature: weatherData.temperature,
      description: weatherData.description,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

module.exports = router;
