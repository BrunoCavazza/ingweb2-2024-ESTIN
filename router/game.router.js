const express = require('express')
const router = express.Router()
const gameController = require('../controller/game.controller')
const transaction = require('../controller/transaction.controller')
const verifyToken = require("../utils/jwt.js");


router
    .post('/createGame', verifyToken.verifyProvider , gameController.create)
    .get('/filter', gameController.filter)
    .get('/page', gameController.getGamesPaged)
    .post('/buyGame', verifyToken.verifyConsumer , transaction.buyGame)
    .get('/:id', gameController.gameScreen)
    
    
module.exports = router;
    