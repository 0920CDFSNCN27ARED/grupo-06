const path = require("path");

const controller = {
    /*index: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/index.html"));
    }*/
    index: (req, res) => {
        res.render(path.resolve(__dirname, "index.ejs"));
    },
};

module.exports = controller;
