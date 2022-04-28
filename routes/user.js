const express = require("express");
const router = express.Router();
const ragiController = require("../controllers/user");
const checkExist =require("../middleware/varify")
//router.post("/", loginController.login);

router.post("/ragistration", checkExist.uservalidation, ragiController.ragister);
router.post("/login", ragiController.login);


module.exports = router;