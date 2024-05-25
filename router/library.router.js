const express = require('express')
const router = express.Router()
const libraryController = require('../controller/library.controller')

router
    .get(libraryController.getUserLibrary);
    

module.exports = router;

