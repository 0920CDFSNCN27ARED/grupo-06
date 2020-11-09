const express = require("express");
const app = express();

app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Servidor funcionando");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/views/register.html");
});

app.get("/product", (req, res) => {
    res.sendFile(__dirname + "/views/product.html");
});

app.get("/checkout", (req, res) => {
    res.sendFile(__dirname + "/views/checkout.html");
});
