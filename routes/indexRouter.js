const express = require("express");
const router = express.Router();
const indexcontroller = require("../controllers/indexController");


router.get("/", indexcontroller.index);



module.exports = router;
