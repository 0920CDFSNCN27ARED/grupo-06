const express = require("express");
const router = express.Router();

const productsController = require("../../controllers/api/productsController");

router.get("/", productsController.products);
router.get("/:id", productsController.find);

router.get("/count", productsController.count);

module.exports = router;
