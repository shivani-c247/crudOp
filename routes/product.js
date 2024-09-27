const express = require("express");
const { upload } = require("../helpers/helper");
const productController = require("../controllers/product");
const validate = require("../controllers/validator");

const router = express.Router();
router.post(
  "/",
  upload.array("images"),
  validate.productvalidation,
  productController.insertProduct
);
router.put(
  "/:id",upload.array("images"),
  validate.productvalidation,
  productController.updateProduct
);
router.get("/", productController.allProduct);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteData);
module.exports = router;
