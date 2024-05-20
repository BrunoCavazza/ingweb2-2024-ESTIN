const express = require('express');
const router = express.Router();

//const library = require("./library.router");
//const transaction = require("./transaction.router");
//const gameScreen = require("./gameScreen.router");
const addGame = require("./addGame.router");
//const accountManager = require("./accountManager.router");
const login = require("./login.router");
const register = require("./register.router");

router.use(login)
router.use(register)

//router.use("/addGame", addGame)

module.exports = router;
