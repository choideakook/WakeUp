const express = require('express');
const router = express.Router();

const { auth } = require('../.credentails/development.json')
const jwtService = require('../lib/jwt/jwtService')

router.get('/', (req, res) => {
    res.render('home/home', isLogin(req.headers['Authorization']))
})

function isLogin(atk) {
    if(!atk)
        return {
            auth: auth,
            atk: false
        }
    else
        return {
            user: jwtService.getUser(atk),
            atk: true
        }
}

module.exports = { webRouter: router }