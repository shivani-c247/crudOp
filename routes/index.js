const { Router } = require("express");
const productRoute = require("./product");
const categoryRoute = require("./category");
const cartRoute = require("./cart");
const orderRoute = require("./order");
const registrationRoute = require("./user");
const stripRoute = require("./stripe");
const router = Router();

router.use("/api/products", productRoute);
router.use("/api/category", categoryRoute);
router.use("/api/cart", cartRoute);
router.use("/api/order", orderRoute);
router.use("/", registrationRoute);
router.use("/charge", stripRoute);
module.exports = router;
