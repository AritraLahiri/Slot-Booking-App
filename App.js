const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const Slot = require("./Models/Slot");
const User = require("./Models/User");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const route = require("./Routes/Home");

const sequelize = require("./util/database");

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(route);

// Slot.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Slot.hasMany(User);

sequelize
  .sync()
  .then((res) => {
    // console.log(res);
  })
  .catch((err) => console.log(err));

app.listen(3000);
