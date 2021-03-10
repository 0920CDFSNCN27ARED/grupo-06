const path = require("path");
const db = require("../database/models");
const toThousand = require("../utils/toThousand");

const controller = {
    checkout: (req, res) => {
       /* const products = getProducts();
        res.render("checkout", {
            products: products,
            toThousand: toThousand,
            user: req.loggedUser,
        });*/
        db.Product.findAll().then(function (products) {
            return res.render("checkout", {
                products: products,
                toThousand: toThousand,
                user: req.loggedUser,
            });
        });
    },
};

module.exports = controller;
