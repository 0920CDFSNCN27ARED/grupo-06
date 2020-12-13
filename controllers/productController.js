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
            image: req.files[0].filename,
            category: req.body.category,
        };
        //lo agrego al final del array database
        database.push(productCreate);
        //convierto el array a JSON
        const databaseJSON = JSON.stringify(database);
        //sobre escribo el JSON dB.json
        fs.writeFileSync("dB.json", databaseJSON);
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
};

module.exports = productsController;
