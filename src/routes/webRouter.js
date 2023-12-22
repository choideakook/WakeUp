const express = require('express');
const router = express.Router();

const { auth } = require('../.credentails/development.json')

router.get('/', (req, res) => {


    res.render('home/home', auth)
})

module.exports = { webRouter: router }