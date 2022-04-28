const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address");
router.post("/", addressController.address);
//router.get("/:id", cartController.getCart);
//router.delete("/", cartController.removeCart);

module.exports = router;
