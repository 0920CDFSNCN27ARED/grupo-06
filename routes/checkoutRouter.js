const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

router.get("/", authenticateMiddleware, checkoutController.checkout);

module.exports = router;
