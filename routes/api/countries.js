const express = require("express");
const router = express.Router();
const countriesController = require("../../controllers/countriesController");

//Lectura
router.get("/", countriesController.list);

module.exports = router;
