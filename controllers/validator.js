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

/*
exports.cartValidation = [
  body("number",'pleas enter valid cart').isCreditCard(),
  body("exp_month",'exp_month is empty').isInt({min:1,max:12}).withMessage("fill valid month"),
  body("exp_year",'exp year is empty').isLength({min:1}),
  body("cvc",'cvc is empty').isLength({min:3 , max:3}).withMessage("contains only 3 digits"),
];

*/
