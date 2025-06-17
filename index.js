const express = require("express");
const app = express();
const port = 3000;
// Goi lai ham router de render ra giao dien
const router = require("./routers/client/index.router");
// Đối số chỉ định thư mục gốc để phục vụ các tài sản tĩnh
app.use(express.static("public"));



// Cau hinh pug va su dung (template engines)
app.set("views", "./views");
app.set("view engine", "pug");
router(app);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
