const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router =require("./routes/index")

mongoose
  .connect("mongodb://localhost:27017/Crude", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection is sucessful");
  })
  .catch((e) => {
    console.log(" no connection");
  });
  
//main route
  app.use("/V1",router)

  app.listen(process.env.PORT || 8000, () => {
  console.log(" server is running at port 8000");
});
