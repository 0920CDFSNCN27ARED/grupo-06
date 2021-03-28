const express = require("express");
const router = express.Router();

const productsController = require("../../controllers/api/productsController");
router.get("/count", productsController.count);
router.get("/total-price", productsController.totalPrice);
router.get("/last", productsController.lastProduct);
router.get("/", productsController.products);
router.get("/:id", productsController.find);

module.exports = router;
