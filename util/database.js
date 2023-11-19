const Sequelize = require("sequelize");
const sequelize = new Sequelize("slot-bookingapp", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
