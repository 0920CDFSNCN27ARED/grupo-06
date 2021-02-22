const fs = require("fs");
const getUsers = require("../utils/getUsers");
const path = require("path");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const db = require("../database/models");

const usersController = {
    login: (req, res) => {
        res.render("users/login", { user: req.loggedUser });
    },
    processLogin: (req, res) => {
        const errors = validationResult(req);
        let usuarioALoguearse = undefined;
        if (errors.isEmpty()) {
            const user = getUsers();

            for (let i = 0; i < user.length; i++) {
                if (user[i].email == req.body.email) {
                    if (
                        bcrypt.compareSync(req.body.password, user[i].password)
                    ) {
                        usuarioALoguearse = user[i];
                        break;
                    }
                }
            }
            //console.log(usuarioALoguearse);
            if (usuarioALoguearse == undefined) {
                //console.log("USUARIO NO ENCONTRADO**");
                return res.render("users/login", {
                    errors: [{ msg: "Credenciales o mail inválido" }],
                });
            }

            req.session.usuarioLogueado = usuarioALoguearse;
            req.session.loggedUserId = usuarioALoguearse.id;
            //console.log(req.session.loggedUserId);

            if (req.body.recordame != undefined) {
                res.cookie("recordame", usuarioALoguearse.email, {
                    maxAge: 6000000,
                });
            }
            //console.log(res.cookie.email);
            return res.redirect("/");
        } else {
            res.render("users/login", {
                errors: errors.errors,
            });
        }
    },
    register: (req, res) => {
        res.render("users/register", { user: req.loggedUser });
    },
    create: (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const database = getUsers();

            const newUser = {
                id: database.length + 1,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                image: req.files[0].filename, //[0] es porque es el primer archivo subido.
                category: req.body.category,
            };

            database.push(newUser);

            const usuarioJSON = JSON.stringify(database, null, 2);

            fs.writeFileSync("data/users.json", usuarioJSON);

            res.redirect("../");
        } else {
            res.render("users/register", { errors: errors.errors });
        }
    },
    detail: (req, res) => {
        db.User.findByPk(req.params.id, {
            include: [{ association: "group" }],
        }).then(function (user) {
            res.render("users/detail", {
                user : user,
                user: req.loggedUser,
            });
        });
    },
    edit: (req, res) => {
        let pedidoUser = db.User.findByPk(req.params.id);
        let pedidoGroup = db.Group.findAll();
        Promise.all([pedidoUser, pedidoGroup]).then(function ([
            user,
            group,
        ]) {
            res.render("users/edit", {
                user : user,
                group : group,
                user: req.loggedUser,
            });
        });
    },
    editUser: (req, res) => {
        db.User.update(
            {
                name: req.body.first_name,
                name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
               
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.redirect(`../users/${req.params.id}/detail`);
   
}
};
module.exports = usersController;
