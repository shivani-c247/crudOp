const express = require("express");
const router = express.Router();
const validator =require("../middleware/verify")
const addressController = require("../controllers/address");

router.post("/", validator.addressValidation ,addressController.address);
//router.get("/:id", cartController.getCart);
//router.delete("/", cartController.removeCart);

module.exports = router;
