const fs = require("fs");
const toThousand = require("../utils/toThousand");
const path = require("path");
const { debug } = require("console");
const db = require("../database/models");
const { check, validationResult, body } = require("express-validator");
const { defaultMaxListeners } = require("stream");



const productsController = {
    productList: (req, res) => {
        db.Product.findAll().then(function (products) {
            return res.render("products/product_list", {
                products: products,
                toThousand: toThousand,
                user: req.loggedUser,
            });
        });
    },

    create: (req, res) => {
        db.Category.findAll().then(function (categories) {
            return res.render("products/create", {
                user: req.loggedUser,
                categories: categories,
            });
        });
    },
    createProd: function (req, res, next) {
        const errors = validationResult(req);
       console.log(req)
         if (errors.isEmpty()) {
             console.log(req.file);
             db.Product.create({
                 name: req.body.name,
                 description: req.body.description,
                 price: req.body.price,
                 img: req.files[0].filename,
                 category_id: req.body.category,
             });
             res.redirect("/products");
         } else {
             res.render("users/login", {
                 errors: errors.errors,
                 user: req.loggedUser,
             });
         }
    },

    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [{ association: "category" }],
        }).then(function (product) {
            res.render("products/product_detail", {
                
                toThousand: toThousand,
                product: product,
                user: req.loggedUser,
            });
        });
    },

    edit: (req, res) => {
        let pedidoProducto = db.Product.findByPk(req.params.id);
        let pedidoCategory = db.Category.findAll();
        Promise.all([pedidoProducto, pedidoCategory]).then(function ([
            product,
            categories,
        ]) {
            res.render("products/product_edit", {
                product: product,
                categories: categories,
                user: req.loggedUser,
            });
        });
    },

    editProd: (req, res) => {
        db.Product.update(
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                img: req.body.img,
                category_id: req.body.category,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.redirect(`../products/${req.params.id}/detail`);
    },
    deleteShow: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [{ association: "category" }],
        }).then(function (product) {
            res.render("products/product_delete", {
                //product: requiredProduct,
                toThousand: toThousand,
                product: product,
                user: req.loggedUser,
            });
        });
    },

    /*const products = getProducts();
        const product_delete = products.find((prod) => {
            return prod.id == req.params.id;
        });
        res.render("products/product_delete", {
            toThousand: toThousand,
            products: products,
            product: product_delete,
            user: req.loggedUser,
        });*/

    delete: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.redirect("/products");
    },

    /* const products = getProducts();
        const reqProductIndex = products.findIndex((prod) => {
            return prod.id == req.params.id;
        });

        products.splice(reqProductIndex, 1);

        //convierto el array a JSON
        const productsJSON = JSON.stringify(products, null, 2);
        //sobre escribo el JSON dB.json
        fs.writeFileSync("dB.json", productsJSON);
        //redirigo al listado

        res.redirect("/products");
    },*/
};

module.exports = productsController;
