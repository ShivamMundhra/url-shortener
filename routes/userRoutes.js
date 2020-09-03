const express = require("express");

const authController = require("../controllers/authContoller");
const urlController = require("../controllers/urlContoller");

const router = express.Router();

router.post("/signup", authController.register);
router.post("/login", authController.login);
router.post("/history", authController.protect, urlController.getHistory);

module.exports = router;
