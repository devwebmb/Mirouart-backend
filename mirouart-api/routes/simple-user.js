const express = require("express");
const router = express.Router();

const simpleUserCtrl = require("../controllers/simpleUser/simple-user");

router.post("/simpleUser/signup", simpleUserCtrl.signup);
router.post("/simpleUser/login", simpleUserCtrl.login);

module.exports = router;
