const path = require("path");

const controller = {
    login: (req, res) => {
        res.render("login");
    },
};

module.exports = controller;
