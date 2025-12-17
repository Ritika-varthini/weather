const express = require("express");
const sequelize = require("./config/db");
const weatherRoutes = require("./routes/weatherRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/weather", weatherRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected");
    return sequelize.sync();
  })
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Database error:", err.message);
  });
