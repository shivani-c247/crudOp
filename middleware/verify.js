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
        throw new Error("username is already exist");
      }
    }),
  body("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email")
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
    .isAlpha()
    .withMessage(" paa not match"),
];


exports.addressValidation = [
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
    .isLength({ min: 10 ,max:10 })
    .withMessage(" min. length required 10"),
];