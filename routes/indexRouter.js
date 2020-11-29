const express = require("express");
const router = express.Router();
const fs = require("fs");


router.get("/", (req, res) => {
    res.sendFile(__dirname + "../views/index.html");
});




module.exports = router;
