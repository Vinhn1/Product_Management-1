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
  delete: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

const Product = mongoose.model("Product", singProductSchema, "product");

module.exports = Product;