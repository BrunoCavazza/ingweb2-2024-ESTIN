var express = require('express');
var router = express.Router();
const authServices = require('../services/authServices');
const usersServices = require('../services/usersServices');

router.post('/login',  async function (req, res, next) {
    try {
        console.log('req:',req.body)
        const {username, password } = req.body
        const user = await authServices.login(username, password);
        console.log('user_c',user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/sign-up', function (req, res, next) {
    try {
        console.log('req:',req.body)
        const {email, password } = req.body
        const user = usersServices.createUser(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


module.exports = router;