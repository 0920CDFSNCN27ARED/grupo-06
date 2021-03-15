const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const path = require("path");
const authMiddleware = require("../middlewares/authMiddleware");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const { check, validationResult, body } = require("express-validator");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, "public/images/products")
    },
    filename: (req, file, cb) => cb(null,  file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage: storage});

router.get("/", productController.productList);

router.get("/:id/detail", productController.detail);

router.get(
    "/create",
    authenticateMiddleware,
    authMiddleware,
    productController.create
);

router.post(
    "/create",
    upload.any(),
    /*[
        check("name")
            .isLength({ min: 5 })
            .withMessage("Debe tener más de 5 caracteres"),
        //check("name").isEmpty().withMessage("No debe estar vacio"),
        check("description")
            .isLength({ min: 20 })
            .withMessage("Debe tener más de 20 caracteres"),
    ],*/
    productController.createProd
);

router.get("/:id/edit/", productController.edit);

router.put("/:id", upload.any(), productController.editProd);

router.get("/:id/delete/", productController.deleteShow);

router.delete("/:id/delete", productController.delete);

module.exports = router;
