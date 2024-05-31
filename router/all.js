const express = require('express');
const router = express.Router();

//const gameScreen = require("./gameScreen.router");
//const accountManager = require("./accountManager.router");
//const register = require("./register.router");


const game = require("./game.router");
const login = require("./login.router");
const library = require("./library.router");
router.use(login)
//router.use(register)
router.use("/games", game)
router.use(library)
module.exports = router;
