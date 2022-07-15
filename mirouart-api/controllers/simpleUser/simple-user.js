const { SimpleUser } = require("../../database/sequelize");
const bcrypt = require("bcrypt");

//inscription connexion

//inscription

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    SimpleUser.create({
      email: req.body.email,
      password: hash,
      userName: req.body.userName,
    })
      .then((simpleUser) => {
        const message = `L'utilisateur dont l'email est ${req.body.email} a bien été créé.`;
        res.status(201).json({ message, data: simpleUser });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas pu être créé, réessayer dans un instant.";
        return res.status(500).json({ message, data: error });
      });
  });
};

//connexion

exports.login = (req, res, next) => {
  SimpleUser.findOne({
    where: { email: req.body.email },
  })
    .then((simpleUser) => {
      if (!simpleUser) {
        const message =
          "l'utilisateur n'existe pas, l'adresse mail du freelance renseignée n'est pas présente dans la base de données.";
        return res.status(404).json({ message });
      }
      bcrypt.compare(req.body.password, simpleUser.password).then((valid) => {
        if (!valid) {
          const message = "le mot de passe est incorrect";
          return res.status(401).json({ message });
        }
        const message = "L'utilisateur' a été connecté avec succès";
        return res.status(200).json({ message });
      });
    })
    .catch((error) => {
      const message =
        "l'utilisateur n'a pas être connecté, réessayez dans un instant";
      res.status(500).json({ message, data : error });
    });
};
