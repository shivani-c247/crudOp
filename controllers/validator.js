const { body } = require("express-validator");
const Category = require("../models/Category");
const Product = require("../models/Category");
//validation for insert category
exports.validate = [
  body("categoryName")
    .not()
    .isEmpty()
    .withMessage("Category name is required")
    .custom(async (value) => {
      const category = await Category.findOne({ categoryName: value });
      if (category) {
        throw new Error("Category Name is already taken");
      }
    }),
  body("subCategories")
    .not()
    .isEmpty()
    .withMessage("subCategories is required"),
];

exports.categoryUpdateValidation = [
  body("categoryName").not().isEmpty().withMessage("Category name is required"),
  body("subCategories")
    .not()
    .isEmpty()
    .withMessage("subCategories is required"),
];

//validaton for  product
exports.productvalidation = [
  body("title").not().isEmpty().withMessage("title is required"),
  body("desc").not().isEmpty().withMessage("description is required"),
  body("size").not().isEmpty().withMessage("size is required"),
  body("color").not().isEmpty().withMessage("color is required"),
  body("price")
    .not()
    .isEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("Only Decimals allowed"),
];

exports.OrderValidation = [
  body("address.*.fullAddress")
    .not()
    .isEmpty()
    .withMessage(" fullAddress is required.."),
  body("address.*.city").not().isEmpty().withMessage("city is required"),
  body("address.*.pinCode")
    .not()
    .isEmpty()
    .withMessage("pinCode is required")
    .isLength({ min: 6 })
    .withMessage("min 6 no.")
    .isNumeric()
    .withMessage("Only Decimals allowed"),
  body("contactNo")
    .not()
    .isEmpty()
    .withMessage("contactNo is required")
    .isMobilePhone()
    .isLength({ min: 10 })
    .withMessage(" min. length required 10"),
/*  body("totalAmount")
    .not()
    .isEmpty()
    .withMessage("totalAmount is required")
    .isNumeric()
    .withMessage("Only Decimals allowed"),*/
];
