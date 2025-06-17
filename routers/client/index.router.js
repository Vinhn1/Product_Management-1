const express = require("express");
const router = express.Router();

// HomeRouter
const homeRouter = require("../client/home.router");
// ProductRouter
const productRouter = require("../client/product.router");


module.exports = (app) => {
  // Trang Chu
  app.use("/", homeRouter);

  // Trang Danh Sach San Pham (Product)
  app.use("/product", productRouter);

};
