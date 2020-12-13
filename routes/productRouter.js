const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.productList);

router.get("/:id/detail", productController.detail);

router.get("/create", productController.create);

router.post("/create", productController.createProd);

module.exports = router;
