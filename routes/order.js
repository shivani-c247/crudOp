const express = require("express");
const orderController = require("../controllers/order");
const validate = require("../controllers/validator");
const router = express.Router();

router.post("/", validate.OrderValidation, orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.get("/:id", orderController.getOne);
module.exports = router;
