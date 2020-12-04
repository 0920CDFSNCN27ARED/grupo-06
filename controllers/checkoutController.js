const path = require("path");

const controller = {
    checkout: (req, res) => {
        res.render("checkout");
    },
};

module.exports = controller;
