const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/category");
const   Validate  = require("../controllers/validator")
const {upload} = require('../helpers/helper');
router.post( '/', upload.array('categoryImages'), Validate.validate('insertCategory'), 
    categoryController.insertCategory,
  )
router.put("/:id", categoryController.update);
router.get("/",categoryController.getAll);
router.get("/count",categoryController.countAllCategories);
router.get("/condition",categoryController.SearchByCondition);
router.get("/:id",categoryController.getOne);
router.delete("/:id",categoryController.delete)

module.exports=router;

