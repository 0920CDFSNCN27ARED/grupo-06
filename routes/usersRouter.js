const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");
const path = require("path");
const { check, validationResult, body } = require("express-validator");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/users");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

var upload = multer({ storage: storage });

router.get("/login", usersController.login);

router.post("/login", usersController.processLogin);

router.get("/register", usersController.register);

router.post(
    "/register",
    upload.any(),
    [
        check("first_name").isLength({ min: 2 }).withMessage("falta el nombre"),
        check("last_name").isLength({ min: 2 }).withMessage("falta apellido"),
        check("email").isEmail().withMessage("debe ser un email valido"),
        check("password")
            .isLength({ min: 2 })
            .withMessage("la contraseña debe tener mas de 2 caracteres"),
    ],
    usersController.create
);

module.exports = router;
