const express = require('express');
const fallbackHandler = require("../handlers/fallback/fallbackHandler");
const router = express.Router();

router.use(fallbackHandler.notFound)
router.use(fallbackHandler.serverError)

module.exports = { fallbackRouter: router }