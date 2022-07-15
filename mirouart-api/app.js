const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/sequelize");

const simpleUserRoutes = require("./routes/simple-user");

const app = express();

app.use(bodyParser.json());

sequelize.initDb();

app.use("/api/user", simpleUserRoutes);

module.exports = app;
