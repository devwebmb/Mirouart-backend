// simpleUser

exports.createSimpleUser = {
  message: `Le simpleUser a été ajouté à la base de données`,
};

exports.connectSimpleUser = {
  message: "le simpleUser a bien été connecté.",
};

exports.updateSimpleUser = {
  message: "Les données du simpleUser ont bien été modifiées",
};

exports.deleteSimpleUser = {
  message: "Les données du simpleUser et ses annonces ont été effacées de la base de données."
}

/*announcement*/

exports.addAnnouncement = {
  message: "l'annonce a été ajoutée à la base de données",
};

exports.deleteAnnouncement = {
  message: "L'annonce a été retiré de la base de données",
};

exports.getAllAnnouncements = {
  message: 'Voici toutes les annonces stockées dans la base de données.'
}

exports.getOneAnnouncement = {
  message: "Voici l'annonce demandée stockée dans la base de données"
}