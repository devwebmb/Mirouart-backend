const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/sequelize");

const app = express();

app.use(bodyParser.json());

sequelize.initDb();

module.exports = app;
