const path = require("path");
const fs = require("fs");
const getProducts = require("../utils/getProducts");
const toThousand = require("../utils/toThousand");

const productsController = {
    productList: (req, res) => {
        const products = getProducts();
        res.render("products/product_list", { products: products });
    },
    productId: (req, res) => {
        res.render("products/productDetail");
    },
};

module.exports = productsController;
