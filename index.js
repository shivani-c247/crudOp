const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const expressValidator = require("express-validator");
//app.use(expressValidator())
const bodyparser = require("body-parser");
const path = require("path");

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

app.listen(process.env.PORT || 8000, () => {
  console.log(" server is running at port 8000");
});
