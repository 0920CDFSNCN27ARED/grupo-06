const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const recordameMiddleware = require("./middlewares/recordameMiddleware");
const authenticateMiddleware = require("./middlewares/authenticateMiddleware");
//app.use(express.static("public"));

//Routers call
const indexRouter = require("./routes/indexRouter");
const checkoutRouter = require("./routes/checkoutRouter");
const productRouter = require("./routes/productRouter");
const usersRouter = require("./routes/usersRouter");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));
//Capturar informacion de POST
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "secretoGrupo6" }));

//Middlewares
app.use(recordameMiddleware);
app.use(authenticateMiddleware);




//Routes
app.listen(3000, () => {
    console.log("Servidor funcionando");
});

app.use("/", indexRouter);

app.use("/users", usersRouter);

app.use("/products", productRouter);

app.use("/checkout", checkoutRouter);
