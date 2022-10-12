const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/sequelize");
const path = require("path");

const simpleUserRoutes = require("./routes/simple-user");
const annoucementsRoute = require("./routes/announcements.js");

const app = express();

app.use(bodyParser.json());
// Paramétrage des en-têtes

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
sequelize.initDb();

app.use("/mirouart-api/images/profils", express.static(path.join(__dirname, "images/profils")));
app.use("/mirouart-api/images/announcements", express.static(path.join(__dirname, "images/announcements")));

app.use("/api/user", simpleUserRoutes);
app.use("/api/announcement", annoucementsRoute);

module.exports = app;
