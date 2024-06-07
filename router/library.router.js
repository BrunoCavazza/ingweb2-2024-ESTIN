const express = require('express')
const router = express.Router()
const libraryController = require('../controller/library.controller')
const verifyToken = require("../utils/verifyToken.middleware");

const customer = require ("../router/customer.router")
const provider = require ("../router/provider.router")

router
    .use("/myLibrary", verifyToken.verifyCustomer, customer)
    .use("/myGames", verifyToken.verifyProvider, provider)

module.exports = router;

