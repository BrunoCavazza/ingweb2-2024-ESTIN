const express = require('express')
const router = express.Router()
const gameController = require('../controller/game.controller')
const transaction = require('../controller/transaction.controller')

router
    .post('/createGame', gameController.create)
    .get('/filter', gameController.filter)
    .get('/page', gameController.getGamesPaged)
    .post('/buyGame', transaction.buyGame)
    .get('/:id', gameController.gameScreen)
    
    
module.exports = router;
    