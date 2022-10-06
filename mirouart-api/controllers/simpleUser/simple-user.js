const { SimpleUser, Announcement } = require("../../database/sequelize");
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const responseBuilder = require("../../functions-controles/response-builders.js");
const errorsMessage = require("../../functions-controles/errors-variables");
const validMessages = require("../../functions-controles/valid-variables");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const fs = require("fs");
const jwt = require("jsonwebtoken");

//inscription connexion

//inscription

exports.signup = (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res
      .status(400)
      .json(
        responseBuilder.buildErrorServerResponse(
          errorsMessage.emptyField.code,
          errorsMessage.emptyField.message
        )
      );
  }

  if (!validator.validate(req.body.email)) {
    return res
      .status(400)
      .json(
        responseBuilder.buildErrorResponse(
          errorsMessage.invalidEmailFormat.code,
          errorsMessage.invalidEmailFormat.message
        )
      );
  }

  bcrypt.hash(req.body.password, 10).then((hash) => {
    SimpleUser.create({
      email: req.body.email,
      password: hash,
      username: req.body.username,
    })
      .then((simpleUser) => {
        return res
          .status(201)
          .json(
            responseBuilder.buildValidresponse(
              validMessages.createSimpleUser.message,
              simpleUser
            )
          );
      })
      .catch((error) => {
        if (error instanceof UniqueConstraintError) {
          return res
            .status(400)
            .json(
              responseBuilder.buildErrorResponse(
                errorsMessage.emailNotAvailable.code,
                errorsMessage.emailNotAvailable.message
              )
            );
        }
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
  });
};

//connexion

exports.login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json(
        responseBuilder.buildErrorResponse(
          errorsMessage.emptyField.code,
          errorsMessage.emptyField.message
        )
      );
  }
  SimpleUser.findOne({
    where: { email: req.body.email },
  })
    .then((simpleUser) => {
      if (!simpleUser) {
        return res
          .status(404)
          .json(
            responseBuilder.buildErrorResponse(
              errorsMessage.emailNotFound.code,
              errorsMessage.emailNotFound.message
            )
          );
      }
      bcrypt.compare(req.body.password, simpleUser.password).then((valid) => {
        if (!valid) {
          return res
            .status(401)
            .json(
              responseBuilder.buildErrorResponse(
                errorsMessage.invalidPassword.code,
                errorsMessage.invalidPassword.message
              )
            );
        }
        const token = jwt.sign(
          // création d'un token d'authentification
          { userId: simpleUser.id },
          `${process.env.PRIVATE_KEY}`,
          {
            expiresIn: "24h",
          }
        );
        return res
          .status(200)
          .json(
            responseBuilder.buildValidresponse(
              validMessages.connectSimpleUser.message,
              { simpleUser, token }
            )
          );
      });
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

//update simpleUser

exports.updateSimpleUser = (req, res, next) => {
  const simpleUserId =req.body.simpleUserId;
  const email = req.body.email;
  const username = req.body.username;
  SimpleUser.findOne({ where: { id: simpleUserId } }).then((simpleUser) => {
    if (!simpleUser) {
      return res
        .status(404)
        .json(
          responseBuilder.buildErrorResponse(
            errorsMessage.emailNotFound.code,
            errorsMessage.emailNotFound.message
          )
        );
    }
    if (simpleUser.profilImgUrl) {
      const filename = simpleUser.profilImgUrl.split("mirouart-api/images/profils")[1];
      fs.unlink(`mirouart-api/images/profils/${filename}`, () => {});
    }
    if (req.file) {
      const file = `${req.file.filename}`;
      SimpleUser.update(
        {
          email,
          username,

          profilImgUrl: `${req.protocol}://${req.get(
            "host"
          )}/mirouart-api/images/profils/${file}`,
        },
        {
          where: {
            id: simpleUserId,
          },
        }
      )
        .then(() => {
          SimpleUser.findOne({
            where: { id: simpleUserId },
          }).then((profil) => {
            return res
              .status(200)
              .json(
                responseBuilder.buildValidresponse(
                  validMessages.updateSimpleUser.message,
                  profil
                )
              );
          });
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
      SimpleUser.update(
        {
          email,
          username,
        },
        { where: { id: simpleUserId } }
      )
        .then(() => {
          SimpleUser.findOne({
            where: { id: simpleUserId },
          }).then((profil) => {
            return res
              .status(200)
              .json(
                responseBuilder.buildValidresponse(
                  validMessages.updateSimpleUser.message,
                  profil
                )
              );
          });
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
  });
};

//deleteUser

exports.deleteSimpleUser = (req, res, next) => {
  const simpleUserId = parseInt(req.params.id);
  SimpleUser.findOne({ where: { id: simpleUserId } }).then((simpleUser) => {
    if (!simpleUser) {
      return res
        .status(404)
        .json(
          responseBuilder.buildErrorResponse(
            errorsMessage.emailNotFound.message,
            errorsMessage.emailNotFound.code
          )
        );
    }
    return simpleUser.destroy().then(() => {
      return Announcement.destroy({ where: { posterId: simpleUserId } })
        .then(() => {
          res
            .status(200)
            .json(
              responseBuilder.buildValidresponse(validMessages.deleteSimpleUser)
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
    });
  });
};
