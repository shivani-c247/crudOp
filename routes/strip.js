const express = require("express");
const router = express.Router();
const stripController = require("../controllers/strip");
router.post("/", stripController.strip);

module.exports = router;
