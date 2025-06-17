const express = require("express");
const router = express.Router();

// Gọi home.controller.js
const controller = require("../../controllers/client/home.controller");

router.get("/", controller.index);

module.exports = router;