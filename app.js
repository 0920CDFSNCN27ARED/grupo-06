const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
//app.use(express.static("public"));

const indexRouter = require("./routes/indexRouter");
const checkoutRouter = require("./routes/checkoutRouter");
const productRouter = require("./routes/productRouter");
const usersRouter = require("./routes/usersRouter");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));
//Capturar informacion de POST

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "secretoGrupo6" }));

app.listen(3000, () => {
    console.log("Servidor funcionando");
});

app.use("/", indexRouter);

app.use("/users", usersRouter);

app.use("/products", productRouter);

app.use("/checkout", checkoutRouter);
