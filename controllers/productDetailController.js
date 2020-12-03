const path = require("path");

const controller = {
    productDetail: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/productDetail.html"));
    },
};

module.exports = controller;