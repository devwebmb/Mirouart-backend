//erreurs 400

exports.emptyField = {
  code: "4000",
  message:
    "Tous les champs obligatoire doivent être renseignées, les données de formulaires ne doivent pas être null.",
};

exports.invalidEmailFormat = {
  code: "4001",
  message: "Votre adresse mail renseignée n'a pas un  format valide",
};

exports.emailNotAvailable = {
  code: "4002",
  message:
    "L'adresse mail est déjà présente dans la base de données, s'il s'agit de votre compte veuillez vous connecter avec votre adresse email et votre mot de passe.",
};

//erreurs 401
exports.invalidPassword = {
  code: "4010",
  message:
    "le mot de passe ne correspond pas au mot de passe de l'adresse mail renseignée.",
};

//erreurs 404
exports.emailNotFound = {
  code: "4040",
  message:
    "l'utilisateur n'existe pas, l'adresse email renseignée n'est pas présente dans la base de données.",
};

//erreurs 500
exports.internalServerError = {
  code: "5000",
  message: "Erreur de serveur, réessayer dans un instant.",
};
