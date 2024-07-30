const express = require('express');
const router = express.Router();
const verifyToken = require("../utils/verifyToken.middleware");

//const gameScreen = require("./gameScreen.router");
//const accountManager = require("./accountManager.router");
const register = require("./register.router");


const game = require("./game.router");
const login = require("./login.router");
const customer = require("./customer.router");
const transaction = require("./transaction.router");
const wishlist = require("./wishlist.router");

router.use(login)
router.use(register)
router.use("/games", game)
router.use("/profile", verifyToken.verifyCustomer, customer)
router.use(transaction)
router.use(wishlist)


module.exports = router;
