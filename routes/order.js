const express = require("express");
const orderController = require("../controllers/order");
const Validate = require("../controllers/validator");
const router = express.Router();

router.post(
  "/",
  Validate.Ordertvalidate,
  orderController.createOrder
);
router.get("/:id", orderController.getOne);
module.exports = router;
