const User = require("../models/user");
const { body } = require("express-validator");

exports.uservalidation = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("username is required")
    .custom(async (value) => {
      const userCheck = await User.findOne({ username: value });
      if (userCheck) {
        throw new Error("username is already taken");
      }
    }),
  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("email is required")
    .custom(async (value) => {
      const emailCheck = await User.findOne({ email: value });
      if (emailCheck) {
        throw new Error("email is already taken");
      }
    }),
  body("password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isString()
    .isLength({ min: 8 })
    .not()
    .withMessage(" length should be 8 charecters")
    .isLowercase()
    .not()
    .withMessage(" one lower case is required")
    .isUppercase()
    .not()
    .withMessage(" one upper case is required")
    .isNumeric()
    .not()
    .withMessage(" one numeric is required")
    .isAlpha(),
];
