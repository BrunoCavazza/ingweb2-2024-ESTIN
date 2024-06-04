const express = require('express')
const router = express.Router()
const gameController = require('../controller/game.controller')
const transaction = require('../router/transaction.router')
const verifyToken = require("../utils/verifyToken.middleware.js");
const provider = require ("../router/provider.router.js")

router
    .get('/filter', gameController.filter)
    .get('/page', gameController.getGamesPaged)
    .get('/:id', gameController.gameScreen)
    
router.use('/buyGame', verifyToken.verifyCustomer , transaction)
router.use(provider)

module.exports = router;
    