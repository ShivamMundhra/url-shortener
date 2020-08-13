const express = require("express");
const urlController = require("../controllers/urlContoller");

const router = express.Router();

router.post("/", urlController.shorten);

module.exports = router;
