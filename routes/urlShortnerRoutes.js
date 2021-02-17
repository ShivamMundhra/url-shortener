const express = require("express");
const urlController = require("../controllers/urlContoller");
const authcontroller = require("../controllers/authContoller");
const router = express.Router();

router.post("/", authcontroller.checkUser, urlController.shorten);

module.exports = router;
