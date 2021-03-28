const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");
const path = require("path");
const { check, validationResult, body } = require("express-validator");
const fs = require("fs");
const bcrypt = require("bcrypt");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const recordameMiddleware = require("../middlewares/recordameMiddleware");
const db = require("../database/models");

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
        //check("email").isEmpty().withMessage("No debe estar vacio"),
        check("password")
            .isLength({ min: 2 })
            .withMessage("la contraseña debe tener mas de 2 caracteres"),
        /*body("password")
            .custom(async function (value) {
                let EncryptValue = bcrypt.hashSync(value, 10);
                let user = await db.User.findOne({
                    where: {
                        password: EncryptValue,
                    },
                });
                console.log(user);
                console.log("value= "+user.password);
                if (
                    bcrypt.compareSync(value, user.password)
                ) {
                    return false;
                }
                return true;
            })
            .withMessage("la contraseña es incorrecta"),*/
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
        check("name")
            .isLength({ min: 2 })
            .withMessage("debe ser un nombre con al menos 2 caracteres"),
        check("lastname")
            .isLength({ min: 2 })
            .withMessage("debe ser un apellido con al menos 2 caracteres"),
        check("password")
            .isLength({ min: 8 })
            .withMessage("debe ser una constraseña con al menos 8 caracteres"),
        body("email", "Invalid email")            
            .isEmail()
            .trim()
            .escape()
            .custom((userEmail) => {
                return new Promise((resolve, reject) => {
                    db.User.findOne({ where: { email: userEmail } }).then(
                        (emailExist) => {
                            if (emailExist !== null) {
                                reject(new Error("El email ya existe"));
                            } else {
                                resolve(true);
                            }
                        }
                    );
                });
            }),
        /*check("email").isEmail(),
        body("email")
            .custom(async function (value) {
                let isEmail = await db.User.findOne({
                    where: {
                        email: value,
                    },
                });
                console.log("FindOne " + isEmail.email);
                console.log("value= " + value);
                if (isEmail.email == value) {
                    console.log("retorno false");
                     false;
                }else{
                     new Error("El email ya esta registrado");

                };
            })
            .withMessage("debe ser un email que no esté en uso"),*/
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

router.get("/detail/:id", usersController.detail);

router.get("/edit/:id", usersController.edit);

router.put("/edit/:id", upload.any(), usersController.editUser);

module.exports = router;
