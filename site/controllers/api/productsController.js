const {
    Product,
    Category,
    Sequelize,
    sequelize,
} = require("../../database/models");
const Op = Sequelize.Op;
const { QueryTypes } = Sequelize;

module.exports = {
    products: async (req, res) => {
        // Count
        const count = await Product.count();
        //
        // CountByCategory
        //→ objeto literal con una propiedad por categoría con el total de productos
        const category = await Category.findAll({
            include: [{ association: "products" }],
        });
        const countByCategory = [];
        for (let i = 0; i < category.length; i++) {
            let obj = new Object();
            obj.name = category[i].category;
            obj.products = category[i].products.length;
            countByCategory.push(obj);
        }
        //
        Product.findAll({ include: [{ association: "category" }] }).then(
            function (products) {
                for (let i = 0; i < products.length; i++) {
                    products[i].setDataValue(
                        "detail",
                        "/api/product/" + products[i].id
                    );
                }
                let response = {
                    count: { count },
                    countByCategory,
                    data: products,
                };

                res.send(response);
            }
        );
    },
    find: (req, res) => {
        Product.findByPk(req.params.id, {
            include: [{ association: "category" }],
        }).then(function (product) {
            res.send(product);
        });
    },

    count: async (req, res) => {
        const count = await Product.count();
        res.send({ count });
    },

    totalPrice: async (req, res) => {
        const products = await Product.findAll();
        const totalPrice = products.reduce((acc, prod) => {
            return acc + Number(prod.price);
        }, 0);
        res.send({
            totalPrice,
        });
    },
    lastProduct: async (req, res) => {
        const products = await Product.findAll();
        const lastProduct = products[products.length - 1];
        res.send({
            lastProduct,
        });
    },
};
