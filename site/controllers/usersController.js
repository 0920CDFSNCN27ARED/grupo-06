const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const db = require("../database/models");

const usersController = {
    login: async (req, res) => {
        let usuarios = await db.User.findAll();
        res.render("users/login", { user: req.loggedUser, usuarios: usuarios });
    },
    processLogin: async (req, res) => {
        let usuarios = await db.User.findAll();
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
                usuarios:usuarios,
            });
        }
    },
    register: async (req, res) => {
        let usuarios = await db.User.findAll();
        db.Group.findAll().then(function (groups) {
            return res.render("users/register", {
                user: req.loggedUser,
                groups: groups,
                usuarios: usuarios,
            });
        });
    },
    create: async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            db.User.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                group_id: req.body.group,
               // imagen: req.files[0].filename
            });
            
            res.redirect("../");
        } else {
            let usuarios = await db.User.findAll();
            db.Group.findAll().then(function (groups) {
                res.render("users/register", {
                    user: req.loggedUser,
                    errors: errors.errors,
                    groups: groups,
                    usuarios: usuarios,
                });
            });
        }
    },
    detail: async (req, res) => {
        let usuarios = await db.User.findAll();
        let user = await db.User.findByPk(req.params.id, {
            include: [{ association: "group" }],
        });
        if (user) {
            res.render("users/detail", {
                user: user,
                usuarios: usuarios,
            });
        }
    },
    edit: async (req, res) => {
        let usuarios = await db.User.findAll();
        let pedidoUser = db.User.findByPk(req.params.id);
        let pedidoGroup = db.Group.findAll();
        Promise.all([pedidoUser, pedidoGroup]).then(function ([user, group]) {
            res.render("users/edit", {
                user: user,
                group: group,
                usuarios:usuarios,
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
