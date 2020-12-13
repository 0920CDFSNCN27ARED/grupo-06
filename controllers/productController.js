const path = require("path");

const controller = {
    productList: (req, res) => {
        res.render("product_list");
    },
    productId: (req, res) => {
        res.render("productDetail");
    },
};

module.exports = controller;
