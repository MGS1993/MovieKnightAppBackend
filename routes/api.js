const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const expoPushToken = require("../Controllers/expoPushTokens");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/registerToken", expoPushToken.registerToken);

module.exports = router;
