const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");
const Validate = require("../controllers/validator");
const { upload } = require("../helpers/helper");
router.post(
  "/",
  upload.array("categoryImages"),
  Validate.validate,
  categoryController.insertCategory
);
router.put(
  "/:id", upload.array("categoryImages"),
  Validate.categoryUpdateValidation,
  categoryController.update
);
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);
router.delete("/:id", categoryController.delete);

module.exports = router;
