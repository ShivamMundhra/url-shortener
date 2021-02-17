const express = require("express");

const authController = require("../controllers/authContoller");
const urlController = require("../controllers/urlContoller");

const router = express.Router();

router.get("/history", authController.protect, urlController.getHistory);

router.post("/isloggedin",authController.isLoggedIn);
router.post("/signup", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout)

module.exports = router;
