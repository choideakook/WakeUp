const fallbackHandler = require("../handler/fallback/fallbackHandler");
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home/home')
})


router.use(fallbackHandler.notFound)
router.use(fallbackHandler.serverError)

module.exports = { routes: router }