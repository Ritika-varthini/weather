const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Weather = sequelize.define("Weather", {
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Weather;
