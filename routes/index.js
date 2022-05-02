const { Router } = require("express");
const productRoute = require("./product");
const categoryRoute = require("./category");
const cartRoute = require("./cart");
const orderRoute = require("./order");
const ragiRoute = require("./user");
const stripRoute = require("./stripe");
const router = Router();

router.use("/api/products", productRoute);
router.use("/api/category", categoryRoute);
router.use("/api/cart", cartRoute);
router.use("/api/order", orderRoute);
router.use("/", ragiRoute);
router.use("/createOrder", stripRoute);
module.exports = router;
