const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");



router.get("/checkout", checkoutController.checkout);

module.exports = router;
