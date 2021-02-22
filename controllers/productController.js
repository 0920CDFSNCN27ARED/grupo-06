const fs = require("fs");
const getProducts = require("../utils/getProducts");
const toThousand = require("../utils/toThousand");
const path = require("path");
const { debug } = require("console");
const db = require("../database/models");

const productsController = {
    productList: (req, res) => {
        db.Product.findAll().then(function (products) {
            return res.render("products/product_list", {
                products: products,
                toThousand: toThousand,
                user: req.loggedUser,
            });
        });
        /*const products = getProducts();
        res.render("products/product_list", {
            products: products,
            toThousand: toThousand,
            user: req.loggedUser,    
        }); */
    },

    create: (req, res) => {
        db.Category.findAll().then(function (categories) {
            return res.render("products/create", {
                user: req.loggedUser,
                categories: categories,
            });
        });
        //res.render("products/create", { user: req.loggedUser });
    },
    createProd: function (req, res) {
        db.Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            //img: req.body.img,
            category_id: req.body.category,
        });
        res.redirect("/products");
    },
    //createProd: (req, res, next) => {
    //llamo al array de productos y lo guardo en database
    //const database = getProducts();
    //tomo la data del formulario de create.ejs
    //const productCreate = {
    //  id: database.length + 1,
    //name: req.body.name,
    //description: req.body.description,
    //price: Number(req.body.price),
    //discount: Number(req.body.discount),
    //image: req.files[0].filename, //[0] es porque es el primer archivo subido.
    //category: req.body.category,
    // };
    //lo agrego al final del array database
    //database.push(productCreate);
    //convierto el array a JSON
    //const databaseJSON = JSON.stringify(database, null, 2);
    //sobre escribo el JSON dB.json
    //fs.writeFileSync("dB.json", databaseJSON);
    //redirigo al listado
    // res.redirect("../products/");
    //},
    detail: (req, res) => {
        db.Product.findByPk(req.params.id).then(function (products) {
            res.render("products/product_detail", {
                //product: requiredProduct,
                toThousand: toThousand,
                products: products,
                user: req.loggedUser,
            });
        });
    },

    /* const products = getProducts();
        const requiredProduct = products.find((prod) => {
            return prod.id == req.params.id;
        )};             


        if (!requiredProduct) {
            res.status(404).send("no se encontro el producto");
        }
        res.render("products/product_detail", {
            product: requiredProduct,
            toThousand: toThousand,
            products: products,
            user: req.loggedUser,
        });
    },
    */
    edit: (req, res) => {
        const products = getProducts();
        const product_edit = products.find((prod) => {
            return prod.id == req.params.id;
        });
        res.render("products/product_edit", {
            product: product_edit,
            user: req.loggedUser,
        });
    },
    editProd: (req, res) => {
        //llamo al array de productos y lo guardo en database
        const products = getProducts();
        //tomo el producto cargado
        const requiredProduct = products.find((prod) => {
            return prod.id == req.params.id;
        });
        //modifico cada item

        requiredProduct.name = req.body.name;
        requiredProduct.description = req.body.description;
        requiredProduct.price = req.body.price;
        requiredProduct.discount = req.body.discount;
        requiredProduct.image = req.files[0].filename; //[0] es porque es el primer archivo subido.
        console.log(requiredProduct);
        //convierto el array a JSON
        const productsJSON = JSON.stringify(products, null, 2);
        //sobre escribo el JSON dB.json
        fs.writeFileSync("dB.json", productsJSON);
        //redirigo al producto
        res.redirect(`../products/${req.params.id}/detail`);
    },
    deleteShow: (req, res) => {
        const products = getProducts();
        const product_delete = products.find((prod) => {
            return prod.id == req.params.id;
        });
        res.render("products/product_delete", {
            toThousand: toThousand,
            products: products,
            product: product_delete,
            user: req.loggedUser,
        });
    },
    delete: (req, res) => {
        const products = getProducts();
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
    },
};

module.exports = productsController;
