const path = require("path");
const db = require("../database/models");
const toThousand = require("../utils/toThousand");

const controller = {
    checkout: async (req, res) => {
        let usuarios = await db.User.findAll();
        db.Product.findAll().then(function (products) {
            return res.render("checkout", {
                products: products,
                toThousand: toThousand,
                user: req.loggedUser,
                usuarios: usuarios,
            });
        });
    },
};

module.exports = controller;
