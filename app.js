const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const restaurants = require("./public/jsons/restaurant.json").results;

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
  const keyword = req.query.keyword?.trim();

  // 透過關鍵字找出餐廳陣列中符合的餐廳
  const matchedrestaurants = keyword
    ? restaurants.filter((info) =>
        // Object.value可以把一包物件傳進去，並把每個屬性的值都印出來
        // some() 只要任何一個條件符合，就可以return
        // 將每一家餐廳物件的值取出來，回傳新的陣列，透過 array.some 來比對關鍵字
        Object.values(info).some((property) => {
          // 只比對字串屬性
          if (typeof property === "string") {
            return property.toLowerCase().includes(keyword.toLowerCase());
          }
          return false;
        })
      )
    : restaurants;

  res.render("index", { restaurants: matchedrestaurants, keyword });
});

app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find((info) => info.id.toString() === id);
  console.log(restaurant)
  res.render("detail", {restaurant});
});

app.listen(port, () => {
  console.log(`伺服器正在運行 on http://localhost:${port}`);
});
