const express = require("express");
const { sequelize } = require("./models");  // loads both City and Weather
const weatherRoutes = require("./routes/weatherRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use("/weather", weatherRoutes);

// Recreate tables from models
sequelize
  .sync({ force: true })  // drops existing tables and recreates them
  .then(() => {
    console.log("Database connected and tables recreated");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));
