const express = require("express");
const router = express.Router();

const productsController = require("../../controllers/api/productsController");

router.get("/countByCategory", productsController.CountByCategory);
router.get("/produts", productsController.products);
router.get("/:id", productsController.find);

module.exports = router;
