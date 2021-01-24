const fs = require("fs");
const getUsers = require("../utils/getUsers");
const path = require("path");
const bcrypt = require("bcrypt");

const usersController = {
    login: (req, res) => {
        res.render("users/login");
    },
    processLogin: (req, res) => {
        const database = getUsers();
        const user = database.find((user) => {
            return (
                user.email == req.body.email &&
                bcrypt.compareSync(req.body.password, user.password)
            );
        });
        if (!user) return res.redirect("/users/login");

        console.log(user);

        return res.redirect("/");
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
            password: bcrypt.hashSync(req.body.password, 10),
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
