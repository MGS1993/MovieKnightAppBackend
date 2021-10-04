const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const expoPushToken = require("../Controllers/expoPushTokens");
const tvController = require("../Controllers/tvController");

router.post("/login", userController.login);
router.post("/register", userController.register);

router.post("/registerToken", expoPushToken.registerToken);

router.post("/track_tv_show", tvController.trackTvShow);
router.get("/get_tracked_shows/:email", tvController.getTrackedShows);

router.get("/append_schedule/:_id/:identifier", tvController.appendSchedule);

router.delete("/delete_tv_show/:id/:email", tvController.deleteShow);

module.exports = router;
