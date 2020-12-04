const path = require("path");

const controller = {
    productDetail: (req, res) => {
        res.render("productDetail");
    },
};

module.exports = controller;
