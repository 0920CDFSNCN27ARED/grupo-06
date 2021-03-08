const express = require("express");
const router = express.Router();
const indexcontroller = require("../controllers/indexController");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const recordameMiddleware = require("../middlewares/recordameMiddleware");

router.get(
    "/",
    recordameMiddleware,
    authenticateMiddleware,
    indexcontroller.index
);

module.exports = router;
