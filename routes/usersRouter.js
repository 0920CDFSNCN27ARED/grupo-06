const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");
const path = require("path");
const { check, validationResult, body } = require("express-validator");
const fs = require("fs");
const getUsers = require("../utils/getUsers");
const bcrypt = require("bcrypt");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const recordameMiddleware = require("../middlewares/recordameMiddleware");

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

router.get("/login", authenticateMiddleware, usersController.login);

router.post(
    "/login",
    [
        check("email").isEmail().withMessage("debe ser un email valido"),
        check("password")
            .isLength({ min: 2 })
            .withMessage("la contraseña debe tener mas de 2 caracteres"),
    ],
    usersController.processLogin
);

router.get(
    "/register",
    recordameMiddleware,
    authenticateMiddleware,
    guestMiddleware,
    usersController.register
);

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
        body("email")
            .custom(function (value) {
                const database = getUsers();
                const user = database.find((user) => {
                    return user.email == value;
                });
                if (!user) return true;

                return false;
            })
            .withMessage("usuario ya existente"),
    ],
    usersController.create
);

router.get("/check", function (req, res) {
    if (
        req.session.usuarioLogueado == undefined &&
        req.loggedUser == undefined
    ) {
        //console.log(req.session.usuarioLogueado);
        res.send("No estas logueado");
    } else {
        res.send("el usuario logueado es:" + req.loggedUser.email);
    }
});

module.exports = router;
