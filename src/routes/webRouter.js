const express = require('express');
const router = express.Router();

const { auth } = require('../.credentails/development.json')

router.get('/', (req, res) => {
    res.render('home/home', {
        redirectUrl: auth.redirectUrl,
        restApiKey: auth.restApiKey
    })
})

module.exports = { webRouter: router }