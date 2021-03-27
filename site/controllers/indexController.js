const db = require("../database/models");
const toThousand = require("../utils/toThousand");

const controller = {
    index: (req, res) => {
        let pedidoUsuario = db.User.findAll();
        let pedidoProducto = db.Product.findAll();

        Promise.all([pedidoProducto, pedidoUsuario]).then(function ([
            products,
            usuarios,
        ]) {
            res.render("index", {
                toThousand: toThousand,
                products: products,
                usuarios: usuarios,
                user: req.loggedUser,
            });
        });
    },
};

module.exports = controller;
