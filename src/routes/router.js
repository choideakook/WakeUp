const fallbackHandler = require("../handler/fallback/fallbackHandler");
const express = require('express');
const router = express.Router();

const authHandler = require('../handler/auth/authHandler')

const { auth } = require('../.credentails/development.json')

router.get('/', (req, res) => {
    res.render('home/home', {
        redirectUrl: auth.redirectUrl,
        restApiKey: auth.restApiKey
    })
})

//-- auth --//
router.get('/login/kakao', authHandler.login)


//-- fallback --//
router.use(fallbackHandler.notFound)
router.use(fallbackHandler.serverError)

module.exports = { routes: router }