const express = require('express');
const router = express.Router();

const fallbackHandler = require("../handlers/fallback/fallbackHandler");
const authHandler = require('../handlers/auth/authHandler')
const missionRouter = require('./missionRouter')

const { auth } = require('../.credentails/development.json')

//-- main --//
router.get('/', (req, res) => {
    res.render('home/home', {
        redirectUrl: auth.redirectUrl,
        restApiKey: auth.restApiKey
    })
})


router.use('/mission', missionRouter)

//-- auth --//
router.get('/login/kakao', authHandler.login)


//-- fallback --//
router.use(fallbackHandler.notFound)
router.use(fallbackHandler.serverError)

module.exports = { routes: router }