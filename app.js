const express = require("express");
const app = express();

app.use(express.static("public"));

const indexRouter = require("./routes/indexRouter") 
const checkoutRouter = require("./routes/checkoutRouter");
const loginRouter = require("./routes/loginRouter");
const productDetail = require("./routes/productDetailRouter");
const registerRouter = require("./routes/registerRouter");

app.listen(3000, () => {
    console.log("Servidor funcionando");
});

app.use("/", indexRouter);



app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/views/register.html");
});

app.get("/productDetail", (req, res) => {
    res.sendFile(__dirname + "/views/productDetail.html");
});

app.get("/checkout", (req, res) => {
    res.sendFile(__dirname + "/views/checkout.html");
});
