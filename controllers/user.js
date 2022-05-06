const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const { username, email, password ,address,contactNo} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({
      username,
      email,
      password: hashedPassword,
      address,
      contactNo
    });

    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error,
    });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(200).json({
      message: "user not found",
    });
    return;
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(422).json({
      errors: { message:"password not match"},
    });
  }

  // generate JWT token code
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return res.status(200).json({ message: "login successfully", token: token });
};
