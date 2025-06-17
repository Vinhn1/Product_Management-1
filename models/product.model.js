const mongoose = require("mongoose");

const singProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  delete: Boolean,
});

const Product = mongoose.model("Product", singProductSchema, "product");

module.exports = Product;