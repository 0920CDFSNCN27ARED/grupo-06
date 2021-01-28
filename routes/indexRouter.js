const express = require("express");
const router = express.Router();
const indexcontroller = require("../controllers/indexController");
const loginMiddleware = require("../middlewares/loginMiddleware");

router.get("/", loginMiddleware, indexcontroller.index);

module.exports = router;
