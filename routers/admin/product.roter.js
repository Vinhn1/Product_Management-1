const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");

// Danh sách sản phẩm
router.get("/", controller.index);

// Tạo dữ liệu test
router.get("/test-data", controller.createTestData);

// Tạo sản phẩm mới
router.get("/create", controller.create);
router.post("/create", controller.createPost);

// Đổi trạng thái sản phẩm
router.get("/change-status/:status/:id", controller.changeStatus);

// Cập nhật trạng thái sản phẩm (POST)
router.post("/update-status", controller.updateStatus);

// Xóa sản phẩm (POST)
router.post("/delete/:id", controller.delete);

module.exports = router;
