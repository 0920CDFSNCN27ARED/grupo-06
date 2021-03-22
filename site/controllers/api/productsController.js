const { Product, Categoty, Sequelize, sequelize } = require("../../database/models");
const Op = Sequelize.Op;
const { QueryTypes } = Sequelize;



module.exports = {
    CountByCategory: (req, res) => {
        //→ objeto literal con una propiedad por categoría con el total de productos
              Category.findAll({
                   include: [{ association: "products" }],
               }).then(function (category) {                                 
                     res.send(category);
               });

    },
    products: (req,res) => {
         const count = await Product.count();
         Product.findAll({include:[{association:"category"}]})
         .then(function (products) {
            for (let i = 0; i < products.length; i++) {
                products[i].setDataValue("detail","/api/product/" + products[i].id)
              
            }; 
            let response = {
                count: {count},
                data:{ products
            }};

             res.send(response);
         });



    },
    find: (req,res) => {
    Product.findByPk(req.params.id, {
            include: [{ association: "category" }],
        }).then(function (product) {
            res.send(product);
        });
    },

};

