const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/fileterStatus");
const searchHelper = require("../../helpers/search");
const paginate = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  try {
    // Bộ lọc
    const filterStatus = filterStatusHelper(req.query);
    const status = req.query.status || "";
    const keyword = req.query.keyword || "";

    // Lấy tất cả sản phẩm chưa bị xóa
    let products = await Product.find({ delete: { $ne: true } });
    console.log("Sản phẩm từ DB:", products);

    // Lọc theo trạng thái
    if (status === "active") {
      products = products.filter((item) => item.status === "active");
    } else if (status === "inactive") {
      products = products.filter((item) => item.status === "inactive");
    }

    // Lọc theo từ khóa
    products = searchHelper(products, keyword);

    // Tính giá mới
    const newProduct = products.map((item) => {
      const itemObj = item.toObject(); // Chuyển mongoose document thành plain object
      itemObj.priceNew = (
        (itemObj.price * (100 - itemObj.discountPercentage)) /
        100
      ).toFixed(0);
      return itemObj;
    });

    // Pagination
    const currentPage = parseInt(req.query.page) || 1;
    const limitItem = 4;
    const { paginationItems, totalPage } = paginate(
      newProduct,
      currentPage,
      limitItem
    );

    console.log("Sản phẩm sau khi xử lý:", paginationItems);

    res.render("admin/page/product/index", {
      pageTitle: "Danh Sách Sản Phẩm",
      products: paginationItems,
      filterStatus: filterStatus,
      keyword: keyword,
      status,
      pagination: {
        totalPage,
        currentPage,
      },
    });
  } catch (error) {
    console.error("Lỗi trong controller admin:", error);
    res.status(500).send("Lỗi server");
  }
};

// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne(
      { _id: id },
      { $set: { status: status } }
    );
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Lỗi khi đổi trạng thái:", error);
    res.redirect("/admin/products");
  }
};

// [POST] /admin/products/update-status
module.exports.updateStatus = async (req, res) => {
  try {
    const { id, newStatus, page, status, keyword } = req.body;
    if (!id || !newStatus) {
      return res.status(400).send("Invalid data");
    }
    await Product.updateOne({ _id: id }, { $set: { status: newStatus } });
    // Giữ nguyên các tham số lọc khi redirect
    let redirectUrl = "/admin/products";
    const params = [];
    if (page) params.push(`page=${page}`);
    if (status) params.push(`status=${status}`);
    if (keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);
    if (params.length > 0) redirectUrl += `?${params.join("&")}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái:", error);
    res.redirect("/admin/products");
  }
};

// [POST] /admin/products/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.deleteOne({ _id: id }, { $set: { delete: true } });
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    res.redirect("/admin/products");
  }
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/page/product/create", {
    pageTitle: "Thêm Sản Phẩm Mới",
  });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    res.redirect("/admin/products");
  }
};

// [GET] /admin/products/test-data
module.exports.createTestData = async (req, res) => {
  try {
    const testProducts = [
      {
        title: "iPhone 15 Pro",
        description: "Điện thoại iPhone 15 Pro mới nhất từ Apple",
        price: 999,
        discountPercentage: 10,
        stock: 50,
        thumbnail: "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
        status: "active",
        position: 1,
        delete: false
      },
      {
        title: "Samsung Galaxy S24",
        description: "Điện thoại Samsung Galaxy S24 với camera chất lượng cao",
        price: 899,
        discountPercentage: 15,
        stock: 30,
        thumbnail: "https://via.placeholder.com/300x300?text=Samsung+S24",
        status: "active",
        position: 2,
        delete: false
      },
      {
        title: "MacBook Pro M3",
        description: "Laptop MacBook Pro với chip M3 mạnh mẽ",
        price: 1999,
        discountPercentage: 5,
        stock: 20,
        thumbnail: "https://via.placeholder.com/300x300?text=MacBook+Pro+M3",
        status: "active",
        position: 3,
        delete: false
      }
    ];

    for (const productData of testProducts) {
      const newProduct = new Product(productData);
      await newProduct.save();
    }

    res.send("Đã tạo dữ liệu test thành công! <a href='/admin/products'>Xem danh sách</a>");
  } catch (error) {
    console.error("Lỗi khi tạo dữ liệu test:", error);
    res.status(500).send("Lỗi khi tạo dữ liệu test");
  }
};
