const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));

const indexRouter = require("./routes/indexRouter");
const checkoutRouter = require("./routes/checkoutRouter");
const loginRouter = require("./routes/loginRouter");
const productDetailRouter = require("./routes/productDetailRouter");
const registerRouter = require("./routes/registerRouter");

//app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(__dirname + "/public"));

app.listen(3000, () => {
    console.log("Servidor funcionando");
});

app.use("/", indexRouter);

app.use("/login", loginRouter);

app.use("/register", registerRouter);

app.use("/productDetail", productDetailRouter);

app.use("/checkout", checkoutRouter);
