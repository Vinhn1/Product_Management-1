const express = require("express");
const router = express.Router();

// Goi Controller 
const controller = require("../../controllers/admin/dashboard.controller");

router.get("/", controller.dashboard);

module.exports = router;