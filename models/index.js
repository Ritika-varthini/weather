const sequelize = require("../config/db");
const City = require("./City");
const Weather = require("./Weather");

// Associations (ONLY ONE FK: cityId)
City.hasMany(Weather, {
  foreignKey: "cityId",
  onDelete: "CASCADE",
});

Weather.belongsTo(City, {
  foreignKey: "cityId",
});

module.exports = {
  sequelize,
  City,
  Weather,
};
