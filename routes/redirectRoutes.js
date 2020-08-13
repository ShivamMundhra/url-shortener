const express = require("express");
const router = express.Router();

const redirectController = require("../controllers/redirectController");

router.get("/:shortId", redirectController.redirect);

module.exports = router;
