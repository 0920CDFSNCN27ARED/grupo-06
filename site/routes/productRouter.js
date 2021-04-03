const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const path = require("path");
const authMiddleware = require("../middlewares/authMiddleware");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const { check, validationResult, body } = require("express-validator");

const multer = require("multer");
const productsController = require("../controllers/productController");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/products");
    },
    filename: (req, file, cb) =>
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        ),
});
const upload = multer({ storage: storage });

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
    [
        check("name")
            .isLength({ min: 5 })
            .withMessage("Debe tener más de 5 caracteres"),
        //check("name").isEmpty().withMessage("No debe estar vacio"),
        check("description")
            .isLength({ min: 20 })
            .withMessage("Debe tener más de 20 caracteres"),
        body("img").custom(async function (value, { req }) {
            var extension = path.extname(req.files[0].filename).toLowerCase();
            switch (extension) {
                case ".jpg":
                    return ".jpg";
                case ".jpeg":
                    return ".jpeg";
                case ".png":
                    return ".png";
                case ".gif":
                    return ".gif";
                default:
                    throw new Error("Formato invalido");
            }
        }),
    ],
    productController.createProd
);
router.get("/procesadores", productController.listadoProducto);
router.get("/motherboards", productsController.listadoProducto);
router.get("/emorias-ram", productsController.listadoProducto);
router.get("/placas-de-video", productsController.listadoProducto);
router.get("/discos-rigidos", productsController.listadoProducto);
router.get("/notebooks", productsController.listadoProducto);
router.get("/mouses", productsController.listadoProducto);
router.get("/teclados", productsController.listadoProducto);
router.get("/auriculares", productsController.listadoProducto);
router.get("/parlantes", productsController.listadoProducto);
router.get("/sillas-gamers", productsController.listadoProducto);

router.get("/find", productController.find);

router.get("/:id/edit/", productController.edit);

router.put("/:id", upload.any(), productController.editProd);

//router.get("/:id/delete/", productController.deleteShow);

router.delete("/:id/delete", productController.delete);

module.exports = router;
