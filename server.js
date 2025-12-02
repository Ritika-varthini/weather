const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY; 

  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    const kelvin = result.data.main.temp;
    const celsius = (kelvin - 273.15).toFixed(2);
    const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(2);

    res.json({
      city: result.data.name,
      celsius,
      fahrenheit,
      description: result.data.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
  console.log("API Key Loaded:", process.env.WEATHER_API_KEY);
});