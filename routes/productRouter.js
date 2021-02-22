const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/authMiddleware");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/products");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

var upload = multer({ storage: storage });

router.get("/", authenticateMiddleware, productController.productList);

router.get("/:id/detail", authenticateMiddleware, productController.detail);

router.get(
    "/create",
    authenticateMiddleware,
    authMiddleware,
    productController.create
);

router.post("/create", upload.any(), productController.createProd);

router.get("/edit/:id", authMiddleware, productController.edit);

router.put("/:id", upload.any(), productController.editProd);

router.get("/:id/delete", authMiddleware, productController.deleteShow);

router.delete("/:id/delete", productController.delete);

module.exports = router;
