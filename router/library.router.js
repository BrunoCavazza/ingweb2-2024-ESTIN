const express = require('express')
const router = express.Router()
const libraryController = require('../controller/library.controller')
const verifyToken = require("../utils/jwt.js");

router
    .get("/myLibrary", verifyToken.verifyConsumer, libraryController.getUserLibrary)
    .get("/myGames", verifyToken.verifyProvider, libraryController.getProviderGames)

module.exports = router;

