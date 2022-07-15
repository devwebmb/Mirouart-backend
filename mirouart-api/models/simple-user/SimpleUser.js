module.exports = (sequelize, Datatypes) => {
  return sequelize.define("simpleUser", {
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    profilImgUrl: {
      type: Datatypes.STRING,
    },
    userName: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};
