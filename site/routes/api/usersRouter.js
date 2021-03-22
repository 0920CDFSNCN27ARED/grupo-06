const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/api/usersController");

router.get("/", usersController.countUsers);
router.get("/:id", usersController.find);

module.exports = router;
