const express = require("express");
const app = express();
const path = require("path");

//app.use(express.static("public"));

const indexRouter = require("./routes/indexRouter");
const checkoutRouter = require("./routes/checkoutRouter");
const loginRouter = require("./routes/loginRouter");
const product = require("./routes/productRouter");
const registerRouter = require("./routes/registerRouter");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static(__dirname + "/public"));

//Capturar informacion de POST
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor funcionando");
});

app.use("/", indexRouter);

app.use("/login", loginRouter);

app.use("/register", registerRouter);

app.use("/products", product);

app.use("/checkout", checkoutRouter);
