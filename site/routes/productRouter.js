const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const path = require("path");
const authMiddleware = require("../middlewares/authMiddleware");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const { check, validationResult, body } = require("express-validator");

const multer = require("multer");
const storage = multer.diskStorage({
    filename: (req, file, cb) => cb(null,  file.fieldname + '-' + Date.now()),
});
const upload = multer({ storage: storage, dest: "public/images/products" });

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
    upload.single("image"),
    /*[
        check("name")
            .isLength({ min: 5 })
            .withMessage("Debe tener más de 5 caracteres"),
        //check("name").isEmpty().withMessage("No debe estar vacio"),
        check("description")
            .isLength({ min: 20 })
            .withMessage("Debe tener más de 20 caracteres"),
        body("img").custom(function(value, filename) {
            
        var extension = (path.extname(filename)).toLowerCase();
        switch (extension) {
            case '.jpg':
                return '.jpg';
            case '.jpeg':
                return '.jpeg';
            case  '.png':
                return '.png';
            case '.gif':
                return '.gif';
            default: 
                return false;
            
        
        }).withMessage("Image type invalid")
    ],*/
    productController.createProd
);

router.get("/:id/edit/", productController.edit);

router.put("/:id", upload.any(), productController.editProd);

router.get("/:id/delete/", productController.deleteShow);

router.delete("/:id/delete", productController.delete);

module.exports = router;
