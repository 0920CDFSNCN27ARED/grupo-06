const fs = require("fs");
const getUsers = require("../utils/getUsers");
const path = require("path");

const usersController = {
    login: (req, res) => {
        res.render("users/login");
    },
    register: (req, res) => {
        res.render("users/register");
    },
    create: (req, res, next) => {
        const database = getUsers();

        const newUser = {
            id: database.length + 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            image: req.files[0].filename, //[0] es porque es el primer archivo subido.
            category: req.body.category,
        };

        database.push(newUser);

        const usuarioJSON = JSON.stringify(database, null, 2);

        fs.writeFileSync("data/users.json", usuarioJSON);

        res.redirect("../");
    },
};

module.exports = usersController;
