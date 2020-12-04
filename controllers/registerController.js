const path = require("path");

const controller = {
    register: (req, res) => {
        res.render("register");
    },
};

module.exports = controller;
