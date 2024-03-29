const express = require("express");
const multer = require("../middlewares/multer")
const router = express.Router();

const simpleUserCtrl = require("../controllers/simpleUser/simple-user");

/*Connexion, inscription*/
router.post("/simpleUser/signup", simpleUserCtrl.signup);
router.post("/simpleUser/login", simpleUserCtrl.login);

/*Modification*/
router.put("/simpleUser/updateData",multer, simpleUserCtrl.updateSimpleUser);

/*delete*/
router.delete("/simpleUser/delete/:id", simpleUserCtrl.deleteSimpleUser)

module.exports = router;
