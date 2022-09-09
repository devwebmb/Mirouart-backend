module.exports = (sequelize, Datatypes) => {
  return sequelize.define("simpleUser", {
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: {
        msg: "Cet adresse mail est déjà utilisée.", // Gère l'unicité de l'adresse mail dans la bdd
      },
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    profilImgUrl: {
      type: Datatypes.STRING,
    },
    username: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: {
        msg: "Ce nom d'utilisateur est déjà utilisé.", // Gère l'unicité de l'adresse mail dans la bdd
      },
    },
  });
};
