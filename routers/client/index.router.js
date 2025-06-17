const express = require("express");
const router = express.Router();

const controller = require("../../controllers/home.controller");

module.exports = (app) => {
  app.use("/", controller.index);
};
