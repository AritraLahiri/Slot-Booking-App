const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Slot = sequelize.define("Slot", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Time: Sequelize.STRING,
  Remaining: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  Link: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Slot;
