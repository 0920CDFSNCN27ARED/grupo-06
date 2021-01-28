const getProducts = require("../utils/getProducts");
const toThousand = require("../utils/toThousand");

const controller = {
    index: (req, res) => {
        const products = getProducts();
        res.render("index", {
            products: products,
            toThousand: toThousand,
            user: req.loggedUser,
        });
    },
};

module.exports = controller;
