const express = require('express')
const router = express.Router()
const gameController = require('../controller/game.controller')

router
    .post('/createGame', gameController.create)
    .get('/category', gameController.filterCategory)
    .get('/filter', gameController.filterText)
    .get('/', gameController.getAll)
    .post('/buyGame', gameController.generateTransaction)

module.exports = router;
    