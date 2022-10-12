const { Announcement } = require("../../database/sequelize");
const fs = require("fs");
const responseBuilder = require("../../functions-controles/response-builders.js");
const errorsMessage = require("../../functions-controles/errors-variables");
const validMessages = require("../../functions-controles/valid-variables");

/*add annoucement*/
exports.addAnnouncement = (req, res, next) => {
  const annonce = req.body.annonce;
  const author = req.body.author;
  const title = req.body.title;
  const posterId = req.body.posterId;
  const category = req.body.category;
  const price = req.body.price;
  if (req.files) {
    const file = req.files[0] ? `${req.files[0].filename}` : null;
    const file2 = req.files[1] ? `${req.files[1].filename}` : null;
    const file3 = req.files[2] ? `${req.files[2].filename} ` : null;
    Announcement.create({
      title: title,
      author: author,
      annonce: annonce,
      posterId: posterId,
      category: category,
      price: price,
      imgUrl1: file
        ? `${req.protocol}://${req.get(
            "host"
          )}/mirouart-api/images/announcements/${file}`
        : null,
      imgUrl2: file2
        ? `${req.protocol}://${req.get(
            "host"
          )}/mirouart-api/images/announcements/${file2}`
        : null,
      imgUrl3: file3
        ? `${req.protocol}://${req.get(
            "host"
          )}/mirouart-api/images/announcements/${file3}`
        : null,
    })
      .then((announcement) => {
        return res
          .status(201)
          .json(
            responseBuilder.buildValidresponse(
              validMessages.addAnnouncement.message,
              announcement
            )
          );
      })
      .catch((error) => {
        return res
          .status(500)
          .json(
            responseBuilder.buildErrorServerResponse(
              errorsMessage.internalServerError.code,
              errorsMessage.internalServerError.message,
              error
            )
          );
      });
  } else {
    Announcement.create({
      title: title,
      author: author,
      annonce: annonce,
      posterId: posterId,
      category: category,
      price: price,
    })
      .then((announcement) => {
        return res
          .status(201)
          .json(
            responseBuilder.buildValidresponse(
              validMessages.addAnnouncement.message,
              announcement
            )
          );
      })
      .catch((error) => {
        return res
          .status(500)
          .json(
            responseBuilder.buildErrorServerResponse(
              errorsMessage.internalServerError.code,
              errorsMessage.internalServerError.message,
              error
            )
          );
      });
  }
};

/*delete announcement*/

exports.deleteAnnouncement = (req, res, next) => {
  const announcementId = parseInt(req.params.id);
  Announcement.findOne({ where: { id: announcementId } })
    .then((announcement) => {
      if (!announcement) {
        return res
          .status(404)
          .json(
            responseBuilder.buildErrorResponse(
              errorsMessage.announcementNotfound.message,
              errorsMessage.announcementNotfound.code
            )
          );
      }
      if (announcement.imgUrl1) {
        const filename = announcement.imgUrl1.split("/images/announcements")[1];
        fs.unlink(`images/announcements/${filename}`, () => {
          announcement.destroy().then(() => {
            res
              .status(200)
              .json(
                responseBuilder.buildValidDeleteresponse(
                  validMessages.deleteAnnouncement
                )
              );
          });
        });
      } else if (announcement.imgUrl2) {
        const filename = announcement.imgUrl2.split("/images/announcements")[1];
        fs.unlink(`images/announcements/${filename}`, () => {
          announcement.destroy().then(() => {
            res
              .status(200)
              .json(
                responseBuilder.buildValidDeleteresponse(
                  validMessages.deleteAnnouncement
                )
              );
          });
        });
      } else if (announcement.imgUrl3) {
        const filename = announcement.imgUrl3.split("/images/announcements")[1];
        fs.unlink(`images/announcements/${filename}`, () => {
          announcement.destroy().then(() => {
            res
              .status(200)
              .json(
                responseBuilder.buildValidDeleteresponse(
                  validMessages.deleteAnnouncement
                )
              );
          });
        });
      } else {
        announcement.destroy().then(() => {
          res
            .status(200)
            .json(
              responseBuilder.buildValidDeleteresponse(
                validMessages.deleteAnnouncement
              )
            );
        });
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .json(
          responseBuilder.buildErrorServerResponse(
            errorsMessage.internalServerError.code,
            errorsMessage.internalServerError.message,
            error
          )
        );
    });
};

/*get all annonces*/
exports.getAllAnnouncements = (req, res, next) => {
  Announcement.findAll({ order: [["updatedAt", "DESC"]] })
    .then((announcements) => {
      res
        .status(200)
        .json(
          responseBuilder.buildValidresponse(
            validMessages.getAllAnnouncements.message,
            announcements
          )
        );
    })
    .catch((error) => {
      return res
        .status(500)
        .json(
          responseBuilder.buildErrorServerResponse(
            errorsMessage.internalServerError.code,
            errorsMessage.internalServerError.message,
            error
          )
        );
    });
};

/*get one annonce*/
exports.getOneAnnouncement = (req, res, next) => {
  const announcementId = parseInt(req.params.id);
  Announcement.findOne({ where: { id: announcementId } })

    .then((announcement) => {
      if (!announcement) {
        return res
          .status(404)
          .json(
            responseBuilder.buildErrorResponse(
              errorsMessage.announcementNotfound.message
            )
          );
      }
      return res
        .status(200)
        .json(
          responseBuilder.buildValidresponse(
            validMessages.getOneAnnouncement.message,
            announcement
          )
        );
    })
    .catch((error) => {
      return res
        .status(500)
        .json(
          responseBuilder.buildErrorServerResponse(
            errorsMessage.internalServerError.code,
            errorsMessage.internalServerError.message,
            error
          )
        );
    });
};
