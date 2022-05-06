const express = require("express");
const router = express.Router();
const stripController = require("../controllers/stripe");
const validate = require("../controllers/validator");
router.post("/",validate.cartValidation, stripController.createCharges);

module.exports = router;
