const express = require("express");
const router = express.Router();

const announcementCtrl = require("../controllers/announcements/announcement");

/*create*/

router.post("/add", announcementCtrl.addAnnouncement);

/*get */
router.get("/", announcementCtrl.getAllAnnouncements);
router.get("/:id", announcementCtrl.getOneAnnouncement);

/*delete*/
router.delete("/delete/:id", announcementCtrl.deleteAnnouncement);

module.exports = router;
