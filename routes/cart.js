const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
router.post("/", cartController.addToCart);
router.get("/:id", cartController.getOne);
router.delete("/:id", cartController.RemoveCart);

module.exports = router;
