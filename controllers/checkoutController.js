const path = require("path");

const controller = {
    checkout: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/checkout.html"));
    },
};


module.exports = controller;