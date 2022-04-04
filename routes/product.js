const express = require('express');
//const express = require('express');
const {upload} = require('../helpers/helper');
const productController = require("../controllers/product");
const   Validate  = require("../controllers/validator")

const router = express.Router();


router.post("/",upload.array('images'), Validate.Productvalidate('insertProduct'),
productController.insertProduct);
router.put("/:id",productController.updateProduct);
router.get("/",productController.AllProduct);
router.get("/count",productController.countAllProducts);

router.get("/condition",productController.SearchByCondition);
router.get("/:id",productController.getOneData);
router.delete("/:id",productController.deleteData)

module.exports=router;

