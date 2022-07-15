const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

// création d'une instance sequelize (paramètres de connexions)
const dataBase = new Sequelize(
  `${process.env.DB_NAME}`, // nom de la bdd
  `${process.env.DB_USER}`, // nom utilisateur
  `${process.env.DB_PASSWORD}`, // mdp utilisateur
  {
    host: `${process.env.DB_HOST}`, // où se trouve la bdd
    dialect: "mariadb", // dialecte pour sequelize pour interragir avec la bdd
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    login: false,
  }
);

// test de la connexion
dataBase
  .authenticate()
  .then(() => console.log("Connexion à la base de données réussie"))
  .catch((error) =>
    console.log({
      error,
      message: "Impossible de se connecter à la base de données",
    })
  );


// initialiser la bdd avec la création d'un administrateur
const initDb = () => {
  return dataBase.sync({ force: true }).then(() => {
    console.log("la base de données est initialisée.");
  });
};

module.exports = { initDb};
