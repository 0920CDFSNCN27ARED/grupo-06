const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const db = require("../database/models");

const usersController = {
    login: (req, res) => {
        res.render("users/login", { user: req.loggedUser });
    },
    processLogin: async (req, res) => {
        const errors = validationResult(req);
        let usuarioALoguearse;
        if (errors.isEmpty()) {
            let user = await db.User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            //console.log(user);

            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                req.session.loggedUserId = user.id;
                req.session.loggedUserEmail = user.email;
                if (req.body.recordame != undefined) {
                    res.cookie("recordame", req.session.loggedUserId, {
                        maxAge: 6000000,
                    });
                }
                return res.redirect("/");
            }
            return res.redirect("../users/login");
        } else {
            res.render("users/login", {
                errors: errors.errors,
                user: req.loggedUser,
            });
        }
    },

    /*

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
    },*/
    register: (req, res) => {
        db.Group.findAll().then(function (groups) {
            return res.render("users/register", {
                user: req.loggedUser,
                groups: groups,
            });
        });
    },
    create: (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            db.User.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                group_id: req.body.group,
            });

            res.redirect("../");
        } else {
            db.Group.findAll().then(function (groups) {
                res.render("users/register", {
                    user: req.loggedUser,
                    errors: errors.errors,
                    groups: groups,
                });
            });
        }
    },
    detail: async (req, res) => {
        let user = await db.User.findByPk(req.params.id, {
            include: [{ association: "group" }],
        });
        if (user) {
            res.render("users/detail", {
                user: user,
            });
        }
    },
    edit: (req, res) => {
        let pedidoUser = db.User.findByPk(req.params.id);
        let pedidoGroup = db.Group.findAll();
        Promise.all([pedidoUser, pedidoGroup]).then(function ([user, group]) {
            res.render("users/edit", {
                user: user,
                group: group,
                //user: req.loggedUser,
            });
        });
    },
    editUser: (req, res) => {
        db.User.update(
            {
                password: bcrypt.hashSync(req.body.password, 10),
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.redirect(`../detail/${req.params.id}`);
    },
};
module.exports = usersController;
