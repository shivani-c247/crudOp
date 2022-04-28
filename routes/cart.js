const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
router.post("/", cartController.addToCart);
router.get("/:id", cartController.getCart);
router.delete("/", cartController.removeCart);
//router.post("/remove", cartController.RemoveCart);
module.exports = router;
