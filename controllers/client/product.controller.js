// Nhúng file product.model để láy ra được data
const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    // Lay du lieu data tu file model
    const products = await Product.find({});
    console.log(products);
    res.render("client/page/product/product", {
        pageTitle: "Danh Sách Sản Phẩm",
        products: products,
    });
}