const { body } = require("express-validator");
const Category = require("../models/Category");
//validation for insert category
exports.validate = (method) => {
  switch (method) {
    case "insertCategory": {
      return [
        body("categoryName")
          .not()
          .isEmpty()
          .withMessage(" categoryName is required.."),
        body("subCategories")
          .not()
          .isEmpty()
          .withMessage("subCategories is required"),
      ];
    }
  }
};
//validation for update category
exports.updateValidate = (method) => {
  switch (method) {
    case "insertCategory": {
      return [
        body("categoryName")
          .not()
          .isEmpty()
          .withMessage(" categoryName is required.."),
        body("subCategories")
          .not()
          .isEmpty()
          .withMessage("subCategories is required"),
      ];
    }
  }
};
//validaton for insert product
exports.Productvalidate = (method) => {
  switch (method) {
    case "insertProduct": {
      return [
        body("title").not().isEmpty().withMessage(" title is required.."),
        body("desc").not().isEmpty().withMessage("description is required"),
        body("size").not().isEmpty().withMessage("size is required"),
        body("color").not().isEmpty().withMessage("color is required"),
      ];
    }
  }
};

//validation for update product
exports.ProductUpdatevalidate = (method) => {
  switch (method) {
    case "insertProduct": {
      return [
        body("title").not().isEmpty().withMessage(" title is required.."),
        body("desc").not().isEmpty().withMessage("description is required"),
        body("size").not().isEmpty().withMessage("size is required"),
        body("color").not().isEmpty().withMessage("color is required"),
      ];
    }
  }
};

exports.Ordertvalidate = (method) => {
  switch (method) {
    case "createOrder": {
      return [
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
          .withMessage("min 6 no."),
        body("contactNo")
          .not()
          .isEmpty()
          .withMessage("contactNo is required")
          .isLength({ min: 10 })
          .withMessage(" min. length required 10"),
        body("totalAmount")
          .not()
          .isEmpty()
          .withMessage("totalAmount is required"),
      ];
    }
  }
};
