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
