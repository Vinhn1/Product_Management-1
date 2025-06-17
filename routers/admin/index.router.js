const express = require("express");
const router = express.Router();
const productRouter = require("./product.roter.js");
const dashboardRouter = require("./dashboad.roter.js");

module.exports = (app) => {
    // Redirect /admin to /admin/dashboard
    app.get("/admin", (req, res) => {
        res.redirect("/admin/dashboard");
    });
    
    app.use("/admin/dashboard", dashboardRouter);
    app.use("/admin/products", productRouter);
};