const express = require("express");
const router = express.Router();
const stripController = require("../controllers/stripe");
const validate = require("../controllers/validator");
router.post("/", stripController.createPaymentIntent);


module.exports = router;
