const db = require("../database/models");
const toThousand = require("../utils/toThousand");

const controller = {
    index: (req, res) => {      
         db.Product.findAll().then(function (products) {
             return res.render("index", {
                 products: products,
                 toThousand: toThousand,
                 user: req.loggedUser,
             });
         });
    },
};

module.exports = controller;
