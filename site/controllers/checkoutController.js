const path = require("path");
const getProducts = require("../utils/getProducts");
const toThousand = require("../utils/toThousand");

const controller = {
    checkout: (req, res) => {
        const products = getProducts();
        res.render("checkout", {
            products: products,
            toThousand: toThousand,
            user: req.loggedUser,
        });
    },
};

module.exports = controller;
