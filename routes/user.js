const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const checkExist =require("../middleware/verify")
//router.post("/", loginController.login);

router.post("/registration", checkExist.uservalidation, userController.register);
router.post("/login", userController.login);


module.exports = router;