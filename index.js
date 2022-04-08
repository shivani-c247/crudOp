const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

const expressValidator = require("express-validator");
//app.use(expressValidator())
const bodyparser = require("body-parser");
const path = require("path");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


mongoose
  .connect("mongodb://localhost:27017/Crude", {
    //useCreatIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection is sucessful");
  })
  .catch((e) => {
    console.log(" no connection");
  });

app.use(express.json());
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log(" server is running at port 8000");
});
