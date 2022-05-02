const express = require("express");
const router = express.Router();
const stripController = require("../controllers/stripe");
router.post("/", stripController.stripe);

module.exports = router;
