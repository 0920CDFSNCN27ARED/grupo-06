const fs = require("fs");
const getProducts = require("../utils/getProducts");
const toThousand = require("../utils/toThousand");
const path = require("path");

const productsController = {
    productList: (req, res) => {
        const products = getProducts();
        res.render("products/product_list", {
            products: products,
            toThousand: toThousand,
        });
    },
    create: (req, res) => {
        res.render("products/create");
    },
    createProd: (req, res, next) => {
        //llamo al array de productos y lo guardo en database
        const database = getProducts();
        //tomo la data del formulario de create.ejs
        const productCreate = {
            id: database.length + 1,
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            image: req.files[0].filename, //[0] es porque es el primer archivo subido.
            category: req.body.category,
        };
        //lo agrego al final del array database
        database.push(productCreate);
        //convierto el array a JSON
        const databaseJSON = JSON.stringify(database);
        //sobre escribo el JSON dB.json
        fs.writeFileSync("dB.json", databaseJSON, null, 2);
        //redirigo al listado
        res.redirect("../products/");
    },
    detail: (req, res) => {
        const products = getProducts();
        const requiredProduct = products.find((prod) => {
            return prod.id == req.params.id;
        });

        if (!requiredProduct) {
            res.status(404).send("no se encontro el producto");
        }
        res.render("products/product_detail", {
            product: requiredProduct,
            toThousand: toThousand,
            products: products,
        });
    },
    edit: (req, res) => {
        const products = getProducts();
        const product_edit = products.find((prod) => {
            return prod.id == req.params.id;
        });
        res.render("products/product_edit", { product: product_edit });
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
