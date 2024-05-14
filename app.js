const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const restaurants = require('./public/jsons/restaurant.json').results

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

// 將跟目錄重新導向至正確的餐廳頁面 /restaurants
app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

// 正確的餐廳頁面清單
app.get("/restaurants", (req, res) => {
  res.render("index", {restaurants:restaurants});
});

app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id;
  res.send(`這是第${id}頁面`);
});

app.listen(port, () => {
  console.log(`伺服器正在運行 on http://localhost:${port}`);
});
