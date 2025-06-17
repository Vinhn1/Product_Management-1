const express = require("express");
const app = express();
const port = 3000;

const adminRouter = require("./routers/admin/index.router");
// Goi file ket noi db
const database = require("./config/database");
const systemsConfig = require("./config/stystems");

// Su dung file .env
require("dotenv").config();

// Goi Ham Connect db
database.connect();

// Goi lai ham router de render ra giao dien
const router = require("./routers/client/index.router");
// Đối số chỉ định thư mục gốc để phục vụ các tài sản tĩnh
app.use(express.static("public"));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cau hinh pug va su dung (template engines)
app.set("views", "./views");
app.set("view engine", "pug");

router(app);
adminRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
