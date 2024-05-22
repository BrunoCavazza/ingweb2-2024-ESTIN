const express = require('express')
const router = express.Router()
const addGameController = require('../controller/addGame.controller')

router
    .post('/createGame', addGameController.create)

module.exports = router;
    